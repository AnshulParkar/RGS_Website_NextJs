import { NextRequest, NextResponse } from "next/server"
import { isValidAdminSession, sessionCookieName } from "@/lib/admin-auth"
import { uploadToSupabase } from "@/lib/supabase"

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])
const allowedVideoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"])
const maxImageSize = 8 * 1024 * 1024   // 8 MB
const maxVideoSize = 100 * 1024 * 1024  // 100 MB

export async function POST(request: NextRequest) {
  if (!isValidAdminSession(request.cookies.get(sessionCookieName())?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 })
    }
    const isImage = allowedImageTypes.has(file.type)
    const isVideo = allowedVideoTypes.has(file.type)
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Upload a JPG, PNG, WebP, AVIF image (up to 8 MB) or MP4, WebM video (up to 100 MB)." }, { status: 400 })
    }
    if (isImage && file.size > maxImageSize) {
      return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 })
    }
    if (isVideo && file.size > maxVideoSize) {
      return NextResponse.json({ error: "Video must be under 100 MB." }, { status: 400 })
    }
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-")
    const folder = isVideo ? "videos" : "admin"
    const url = await uploadToSupabase(file, `${folder}/${Date.now()}-${cleanName}`)
    return NextResponse.json({ url, type: isVideo ? "video" : "image" })
  } catch { return NextResponse.json({ error: "File upload failed. Check the Supabase media bucket." }, { status: 500 }) }
}
