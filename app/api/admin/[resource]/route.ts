import { NextRequest, NextResponse } from "next/server"
import { isValidAdminSession, sessionCookieName } from "@/lib/admin-auth"
import { contentStore } from "@/lib/supabase"

const resources = ["categories", "services", "projects", "posts", "inquiries", "testimonials"] as const
type Resource = (typeof resources)[number]

function getResource(value: string): Resource | null {
  return resources.includes(value as Resource) ? (value as Resource) : null
}
function allowed(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(sessionCookieName())?.value)
}

export async function GET(request: NextRequest, { params }: { params: { resource: string } }) {
  const resource = getResource(params.resource)
  if (!allowed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (!contentStore.configured) return NextResponse.json({ error: "Connect Supabase before using the admin." }, { status: 503 })
  try { return NextResponse.json(await contentStore.adminList(resource)) }
  catch (error) {
    const status = Number(String((error as Error)?.message).match(/\d{3}$/)?.[0]) || 0
    const reason = status === 521 || status === 522 || status === 523 || status === 503 || status === 0
      ? "The Supabase database is not reachable (it may be paused). Restore the project in the Supabase dashboard, then reload."
      : status === 404 ? "The table was not found in Supabase. Run the schema setup (npm run db:setup)."
      : `Supabase returned an error (${status}).`
    return NextResponse.json({ error: reason }, { status: 502 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { resource: string } }) {
  const resource = getResource(params.resource)
  if (!allowed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (!contentStore.configured) return NextResponse.json({ error: "Connect Supabase before using the admin." }, { status: 503 })
  try { return NextResponse.json(await contentStore.adminCreate(resource, await request.json()), { status: 201 }) }
  catch { return NextResponse.json({ error: "Unable to save record" }, { status: 500 }) }
}

export async function PATCH(request: NextRequest, { params }: { params: { resource: string } }) {
  const resource = getResource(params.resource)
  if (!allowed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (!contentStore.configured) return NextResponse.json({ error: "Connect Supabase before using the admin." }, { status: 503 })
  try {
    const body = await request.json()
    if (Array.isArray(body)) {
      const results = await Promise.all(
        body.map((item) => {
          const { id, ...data } = item
          if (typeof id === "string") {
            return contentStore.adminUpdate(resource, id, data)
          }
          return Promise.resolve(null)
        })
      )
      return NextResponse.json({ success: true, count: results.length })
    }
    const { id, ...data } = body
    if (typeof id !== "string") return NextResponse.json({ error: "Record id is required" }, { status: 400 })
    return NextResponse.json(await contentStore.adminUpdate(resource, id, data))
  } catch { return NextResponse.json({ error: "Unable to update record" }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: { resource: string } }) {
  const resource = getResource(params.resource)
  if (!allowed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (!contentStore.configured) return NextResponse.json({ error: "Connect Supabase before using the admin." }, { status: 503 })
  try {
    const { id } = await request.json()
    if (typeof id !== "string") return NextResponse.json({ error: "Record id is required" }, { status: 400 })
    await contentStore.adminDelete(resource, id)
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: "Unable to delete record" }, { status: 500 }) }
}

