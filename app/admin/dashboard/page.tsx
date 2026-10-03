"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  LayoutDashboard, Layers, Briefcase, FolderOpen, FileText, MessageSquare,
  Plus, Save, Loader2, LogOut, Upload, X, Trash2, Eye, EyeOff, Video, GripVertical, Quote, Star
} from "lucide-react"

type Resource = "categories" | "services" | "projects" | "posts" | "testimonials" | "inquiries"
type Row = Record<string, unknown>

const tabs: { key: Resource; label: string; icon: React.ElementType }[] = [
  { key: "categories", label: "Categories", icon: Layers },
  { key: "services", label: "Services", icon: FolderOpen },
  { key: "projects", label: "Projects", icon: Briefcase },
  { key: "posts", label: "Blog Posts", icon: FileText },
  { key: "testimonials", label: "Testimonials", icon: Quote },
  { key: "inquiries", label: "Inquiries", icon: MessageSquare },
]

async function api(path: string, options?: RequestInit) {
  const res = await fetch(path, options)
  if (res.status === 401) { window.location.href = "/admin"; return null }
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  return res.json()
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Resource>("categories")
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editingRow, setEditingRow] = useState<Row | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || activeTab === "inquiries") return;

    const oldIndex = rows.findIndex(r => String(r.id) === active.id);
    const newIndex = rows.findIndex(r => String(r.id) === over.id);
    const newRows = arrayMove(rows, oldIndex, newIndex);
    
    setRows(newRows);
    
    const updates = newRows.map((r, index) => ({ id: String(r.id), sort_order: index + 1 }));
    
    try {
      await api(`/api/admin/${activeTab}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    } catch {
      alert("Failed to save order.");
    }
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await api(`/api/admin/${activeTab}`)
      if (data) setRows(data)
    } catch (error) {
      setRows([])
      setLoadError(error instanceof Error ? error.message : "Unable to load records")
    }
    setLoading(false)
  }, [activeTab])

  useEffect(() => { loadData() }, [loadData])

  async function handleSave() {
    if (!editingRow) return
    setSaving(true)
    try {
      const isNew = !editingRow.id
      if (isNew) {
        await api(`/api/admin/${activeTab}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingRow),
        })
      } else {
        await api(`/api/admin/${activeTab}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingRow),
        })
      }
      setEditingRow(null)
      await loadData()
    } catch { alert("Failed to save. Check Supabase connection.") }
    setSaving(false)
  }

  async function handleDelete(id: unknown) {
    if (!id || typeof id !== "string") return
    if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}? This cannot be undone.`)) return
    try {
      await api(`/api/admin/${activeTab}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      await loadData()
    } catch {
      alert("Failed to delete record.")
    }
  }

  async function togglePublished(row: Row) {
    const published = !row.published
    setRows((current) => current.map((r) => (r.id === row.id ? { ...r, published } : r)))
    try {
      await api(`/api/admin/${activeTab}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id, published }),
      })
    } catch {
      setRows((current) => current.map((r) => (r.id === row.id ? { ...r, published: !published } : r)))
      alert("Failed to update visibility.")
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const file = e.target.files?.[0]
    if (!file || !editingRow) return
    setUploading(true)
    try {
      const form = new FormData()
      form.append("file", file)
      const data = await api("/api/admin/upload", { method: "POST", body: form })
      if (data?.url) {
        if (field === "gallery") {
          const gallery = Array.isArray(editingRow.gallery) ? [...(editingRow.gallery as string[])] : []
          gallery.push(data.url)
          setEditingRow({ ...editingRow, gallery })
        } else if (field === "videos") {
          const videos = Array.isArray(editingRow.videos) ? [...(editingRow.videos as string[])] : []
          videos.push(data.url)
          setEditingRow({ ...editingRow, videos })
        } else {
          setEditingRow({ ...editingRow, [field]: data.url })
        }
      }
    } catch { alert("Upload failed. Check that the Supabase 'media' storage bucket exists.") }
    setUploading(false)
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin"
  }

  function newRow(): Row {
    const nextOrder = rows.length + 1
    switch (activeTab) {
      case "categories":
        return { name: "", slug: "", description: "", image_url: "", sort_order: nextOrder, published: false }
      case "services":
        return { name: "", slug: "", category_slug: "", excerpt: "", description: "", image_url: "", features: [], sort_order: nextOrder, published: false }
      case "projects":
        return { name: "", slug: "", category_slug: "", excerpt: "", description: "", location: "", completed_at: "", service_slugs: [], image_url: "", gallery: [], video_url: "", videos: [], featured: false, sort_order: nextOrder, published: false }
      case "posts":
        return { title: "", slug: "", excerpt: "", content: "", cover_image: "", published_at: "", sort_order: nextOrder, published: false }
      case "testimonials":
        return { name: "", role: "", location: "", project: "", quote: "", rating: 5, source: "admin", sort_order: nextOrder, published: true }
      case "inquiries":
        return { name: "", phone: "", email: "", message: "", status: "new" }
      default:
        return {}
    }
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    responded: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-purple-100 text-purple-700",
    closed: "bg-green-100 text-green-700",
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-sm">Roop Glass Solutions Admin</h1>
              <p className="text-xs text-slate-500">Content Management</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-slate-600">
            <LogOut className="w-4 h-4 mr-1" /> Sign out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setEditingRow(null) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h2>
          {activeTab !== "inquiries" && (
            <Button size="sm" onClick={() => setEditingRow(newRow())} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-1" /> Add new
            </Button>
          )}
        </div>

        {activeTab === "testimonials" && !loading && !loadError && (() => {
          const pending = rows.filter((r) => r.source === "visitor" && !r.published).length
          return (
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              Drag rows to change the order on the homepage. Visitors can submit reviews at <a href="/review" target="_blank" className="text-blue-600 hover:underline">/review</a>.
              {pending > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">{pending} hidden visitor review{pending > 1 ? "s" : ""}</span>}
            </p>
          )
        })()}

        {/* Edit form modal */}
        {editingRow && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-2xl w-full max-w-2xl mb-10">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="font-bold text-lg">{editingRow.id ? "Edit" : "Create"} {activeTab.slice(0, -1)}</h3>
                <button onClick={() => setEditingRow(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {renderFormFields()}
              </div>
              <div className="flex justify-end gap-3 p-5 border-t">
                <Button variant="outline" onClick={() => setEditingRow(null)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                  {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Data table */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-slate-500 mt-3">Loading {activeTab}...</p>
          </div>
        ) : loadError ? (
          <div className="py-12 px-6 text-center bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900">
            <p className="font-semibold text-red-700 dark:text-red-300">Could not load {activeTab}</p>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{loadError}</p>
            <button onClick={loadData} className="mt-4 text-sm font-medium text-blue-600 hover:underline">Try again</button>
          </div>
        ) : rows.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border">
            <p className="text-slate-500">No {activeTab} found. {activeTab !== "inquiries" && "Click \"Add new\" to create one."}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b">
                  <tr>
                    <th className="px-2 py-3 w-8"></th>
                    {getColumns().map((col) => (
                      <th key={col} className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={rows.map(r => String(r.id))} strategy={verticalListSortingStrategy}>
                      {rows.map((row) => (
                        <SortableRow key={String(row.id)} row={row} activeTab={activeTab} getColumns={getColumns} renderCell={renderCell} setEditingRow={setEditingRow} handleDelete={handleDelete} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  function getColumns(): string[] {
    switch (activeTab) {
      case "categories": return ["name", "slug", "sort_order", "published"]
      case "services": return ["name", "category_slug", "published"]
      case "projects": return ["name", "location", "category_slug", "featured", "published"]
      case "posts": return ["title", "slug", "published_at", "published"]
      case "testimonials": return ["name", "quote", "rating", "source", "created_at", "published"]
      case "inquiries": return ["name", "phone", "service_interest", "status", "created_at"]
      default: return []
    }
  }

  function renderCell(row: Row, col: string): React.ReactNode {
    const val = row[col]
    if (activeTab === "testimonials" && col === "published") {
      return (
        <button
          onClick={() => togglePublished(row)}
          title={val ? "Shown on website. Click to hide." : "Hidden. Click to publish."}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${val ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}
        >
          {val ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {val ? "Live" : "Hidden"}
        </button>
      )
    }
    if (col === "rating") {
      const rating = Number(val) || 0
      return (
        <span className="inline-flex" aria-label={`${rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`w-3.5 h-3.5 ${i <= rating ? "text-amber-400 fill-current" : "text-slate-300"}`} />)}
        </span>
      )
    }
    if (col === "source") {
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === "visitor" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{val === "visitor" ? "Visitor" : "Admin"}</span>
    }
    if (col === "published" || col === "featured") {
      return val ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-slate-300" />
    }
    if (col === "status" && typeof val === "string") {
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[val] || "bg-slate-100"}`}>{val.replace("_", " ")}</span>
    }
    if (col === "created_at" || col === "published_at") {
      return typeof val === "string" ? new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"
    }
    return String(val ?? "—")
  }

  function updateField(field: string, value: unknown) {
    if (!editingRow) return
    setEditingRow({ ...editingRow, [field]: value })
  }

  function renderFormFields(): React.ReactNode {
    if (!editingRow) return null
    switch (activeTab) {
      case "categories":
        return (
          <>
            <Field label="Name"><Input value={String(editingRow.name || "")} onChange={(e) => updateField("name", e.target.value)} /></Field>
            <Field label="Slug"><Input value={String(editingRow.slug || "")} onChange={(e) => updateField("slug", e.target.value)} placeholder="auto-from-name" /></Field>
            <Field label="Description"><Textarea value={String(editingRow.description || "")} onChange={(e) => updateField("description", e.target.value)} /></Field>
            <Field label="Sort Order"><Input type="number" value={String(editingRow.sort_order || 0)} onChange={(e) => updateField("sort_order", parseInt(e.target.value) || 0)} /></Field>
            <ImageUpload field="image_url" label="Image" />
            <Toggle label="Published" field="published" />
          </>
        )
      case "services":
        return (
          <>
            <Field label="Name"><Input value={String(editingRow.name || "")} onChange={(e) => updateField("name", e.target.value)} /></Field>
            <Field label="Slug"><Input value={String(editingRow.slug || "")} onChange={(e) => updateField("slug", e.target.value)} /></Field>
            <Field label="Category Slug"><Input value={String(editingRow.category_slug || "")} onChange={(e) => updateField("category_slug", e.target.value)} placeholder="glass-facade-systems" /></Field>
            <Field label="Excerpt"><Textarea value={String(editingRow.excerpt || "")} onChange={(e) => updateField("excerpt", e.target.value)} className="min-h-[60px]" /></Field>
            <Field label="Description"><Textarea value={String(editingRow.description || "")} onChange={(e) => updateField("description", e.target.value)} className="min-h-[100px]" /></Field>
            <Field label="Features (comma-separated)"><Input value={Array.isArray(editingRow.features) ? (editingRow.features as string[]).join(", ") : ""} onChange={(e) => updateField("features", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} /></Field>
            <ImageUpload field="image_url" label="Image" />
            <Toggle label="Published" field="published" />
          </>
        )
      case "projects":
        return (
          <>
            <Field label="Name"><Input value={String(editingRow.name || "")} onChange={(e) => updateField("name", e.target.value)} /></Field>
            <Field label="Slug"><Input value={String(editingRow.slug || "")} onChange={(e) => updateField("slug", e.target.value)} /></Field>
            <Field label="Category Slug"><Input value={String(editingRow.category_slug || "")} onChange={(e) => updateField("category_slug", e.target.value)} /></Field>
            <Field label="Location"><Input value={String(editingRow.location || "")} onChange={(e) => updateField("location", e.target.value)} /></Field>
            <Field label="Completed Date"><Input type="date" value={String(editingRow.completed_at || "")} onChange={(e) => updateField("completed_at", e.target.value || null)} /></Field>
            <Field label="Excerpt"><Textarea value={String(editingRow.excerpt || "")} onChange={(e) => updateField("excerpt", e.target.value)} className="min-h-[60px]" /></Field>
            <Field label="Description"><Textarea value={String(editingRow.description || "")} onChange={(e) => updateField("description", e.target.value)} className="min-h-[100px]" /></Field>
            <Field label="Service Slugs (comma-separated)"><Input value={Array.isArray(editingRow.service_slugs) ? (editingRow.service_slugs as string[]).join(", ") : ""} onChange={(e) => updateField("service_slugs", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} /></Field>
            <ImageUpload field="image_url" label="Cover Image" />
            <GalleryUpload />
            <VideoUpload field="video_url" label="Primary Video URL" />
            <VideosUpload />
            <Toggle label="Featured" field="featured" />
            <Toggle label="Published" field="published" />
          </>
        )
      case "posts":
        return (
          <>
            <Field label="Title"><Input value={String(editingRow.title || "")} onChange={(e) => updateField("title", e.target.value)} /></Field>
            <Field label="Slug"><Input value={String(editingRow.slug || "")} onChange={(e) => updateField("slug", e.target.value)} /></Field>
            <Field label="Excerpt"><Textarea value={String(editingRow.excerpt || "")} onChange={(e) => updateField("excerpt", e.target.value)} className="min-h-[60px]" /></Field>
            <Field label="Content"><Textarea value={String(editingRow.content || "")} onChange={(e) => updateField("content", e.target.value)} className="min-h-[200px]" /></Field>
            <Field label="Publish Date"><Input type="datetime-local" value={String(editingRow.published_at || "")} onChange={(e) => updateField("published_at", e.target.value || null)} /></Field>
            <ImageUpload field="cover_image" label="Cover Image" />
            <Toggle label="Published" field="published" />
          </>
        )
      case "testimonials":
        return (
          <>
            {editingRow.source === "visitor" && (
              <p className="text-sm rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3 py-2">
                Submitted by a visitor from /review{editingRow.email ? <> · contact: <a className="underline" href={`mailto:${String(editingRow.email)}`}>{String(editingRow.email)}</a></> : null}
              </p>
            )}
            <Field label="Name"><Input value={String(editingRow.name || "")} onChange={(e) => updateField("name", e.target.value)} placeholder="R.K. Agrawal" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Role / Company"><Input value={String(editingRow.role || "")} onChange={(e) => updateField("role", e.target.value)} placeholder="Admin Head" /></Field>
              <Field label="Location"><Input value={String(editingRow.location || "")} onChange={(e) => updateField("location", e.target.value)} placeholder="Gorai, Mumbai" /></Field>
            </div>
            <Field label="Project / Work Done"><Input value={String(editingRow.project || "")} onChange={(e) => updateField("project", e.target.value)} placeholder="Tourist Attraction & Meditation Center" /></Field>
            <Field label="Testimonial"><Textarea value={String(editingRow.quote || "")} onChange={(e) => updateField("quote", e.target.value)} className="min-h-[120px]" /></Field>
            <Field label="Rating">
              <select
                value={String(editingRow.rating || 5)}
                onChange={(e) => updateField("rating", parseInt(e.target.value) || 5)}
                className="w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
              </select>
            </Field>
            <Toggle label="Published (shown on website)" field="published" />
          </>
        )
      case "inquiries":
        return (
          <>
            <Field label="Name"><Input value={String(editingRow.name || "")} onChange={(e) => updateField("name", e.target.value)} /></Field>
            <Field label="Phone"><Input value={String(editingRow.phone || "")} onChange={(e) => updateField("phone", e.target.value)} /></Field>
            <Field label="Email"><Input value={String(editingRow.email || "")} onChange={(e) => updateField("email", e.target.value)} /></Field>
            <Field label="Service Interest"><Input value={String(editingRow.service_interest || "")} onChange={(e) => updateField("service_interest", e.target.value)} /></Field>
            <Field label="Project Location"><Input value={String(editingRow.project_location || "")} onChange={(e) => updateField("project_location", e.target.value)} /></Field>
            <Field label="Message"><Textarea value={String(editingRow.message || "")} onChange={(e) => updateField("message", e.target.value)} className="min-h-[100px]" /></Field>
            <Field label="Status">
              <select
                value={String(editingRow.status || "new")}
                onChange={(e) => updateField("status", e.target.value)}
                className="w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
              >
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </Field>
          </>
        )
    }
  }

  function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
        {children}
      </div>
    )
  }

  function Toggle({ label, field }: { label: string; field: string }) {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(editingRow?.[field])}
          onChange={(e) => updateField(field, e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      </label>
    )
  }

  function ImageUpload({ field, label }: { field: string; label: string }) {
    const currentUrl = String(editingRow?.[field] || "")
    return (
      <Field label={label}>
        {currentUrl && (
          <div className="relative w-32 h-24 rounded-lg overflow-hidden mb-2 border">
            <img src={currentUrl} alt="" className="w-full h-full object-cover" />
            <button onClick={() => updateField(field, "")} className="absolute top-1 right-1 p-0.5 bg-red-500 rounded-full text-white"><X className="w-3 h-3" /></button>
          </div>
        )}
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Upload className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">{uploading ? "Uploading..." : "Upload image"}</span>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, field)} className="hidden" disabled={uploading} />
        </label>
      </Field>
    )
  }

  function VideoUpload({ field, label }: { field: string; label: string }) {
    const currentUrl = String(editingRow?.[field] || "")
    return (
      <Field label={label}>
        <div className="flex gap-2 mb-2">
          <Input
            value={currentUrl}
            onChange={(e) => updateField(field, e.target.value)}
            placeholder="Paste video URL or upload below"
          />
          {currentUrl && (
            <button onClick={() => updateField(field, "")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><X className="w-4 h-4" /></button>
          )}
        </div>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Video className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">{uploading ? "Uploading..." : "Upload video (MP4, WebM — up to 100 MB)"}</span>
          <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => handleUpload(e, field)} className="hidden" disabled={uploading} />
        </label>
      </Field>
    )
  }

  function GalleryUpload() {
    const gallery = Array.isArray(editingRow?.gallery) ? (editingRow!.gallery as string[]) : []
    return (
      <Field label="Gallery Images">
        <div className="flex flex-wrap gap-2 mb-2">
          {gallery.map((url, i) => (
            <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden border">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button onClick={() => {
                const updated = gallery.filter((_, idx) => idx !== i)
                updateField("gallery", updated)
              }} className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 rounded-full text-white"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Upload className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">{uploading ? "Uploading..." : "Add gallery image"}</span>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "gallery")} className="hidden" disabled={uploading} />
        </label>
      </Field>
    )
  }

  function VideosUpload() {
    const videos = Array.isArray(editingRow?.videos) ? (editingRow!.videos as string[]) : []
    return (
      <Field label="Additional Videos">
        {videos.length > 0 && (
          <div className="space-y-2 mb-2">
            {videos.map((url, i) => (
              <div key={i} className="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2">
                <Video className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="truncate flex-1 text-slate-600 dark:text-slate-300">{url}</span>
                <button onClick={() => {
                  const updated = videos.filter((_, idx) => idx !== i)
                  updateField("videos", updated)
                }} className="p-1 text-red-500 hover:bg-red-50 rounded"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        )}
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Video className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">{uploading ? "Uploading..." : "Add video"}</span>
          <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => handleUpload(e, "videos")} className="hidden" disabled={uploading} />
        </label>
      </Field>
    )
  }
}

function SortableRow({ row, activeTab, getColumns, renderCell, setEditingRow, handleDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: String(row.id) });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1, position: 'relative' as const };
  return (
    <tr ref={setNodeRef} style={style} className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors bg-white dark:bg-slate-900 ${isDragging ? "shadow-lg z-50 relative" : ""}`}>
      <td className="px-2 py-3 text-slate-400">
        {activeTab !== "inquiries" && (
          <button {...attributes} {...listeners} className="p-1 cursor-grab hover:text-slate-600 touch-none">
            <GripVertical className="w-4 h-4" />
          </button>
        )}
      </td>
      {getColumns().map((col: string) => (
        <td key={col} className="px-4 py-3 text-slate-700 dark:text-slate-300 max-w-[200px] truncate">
          {renderCell(row, col)}
        </td>
      ))}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button size="sm" variant="outline" onClick={() => setEditingRow({ ...row })} className="text-xs">
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(row.id)} className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
