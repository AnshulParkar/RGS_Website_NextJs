import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendTestimonialNotification } from "@/lib/email"
import { contentStore } from "@/lib/supabase"

const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(80), role: z.string().trim().max(80).optional(),
  location: z.string().trim().max(80).optional(), project: z.string().trim().max(120).optional(),
  quote: z.string().trim().min(20).max(800), rating: z.number().int().min(1).max(5),
  email: z.string().trim().email().optional().or(z.literal("")),
  consent: z.literal(true), website: z.string().max(0).optional(),
})

// Visitor reviews stay hidden until an admin publishes them. Set TESTIMONIALS_AUTO_PUBLISH=true to show them immediately.
const requireApproval = process.env.TESTIMONIALS_AUTO_PUBLISH !== "true"

// Best-effort per-instance limit; resets when the server restarts.
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 60 * 60 * 1000
const submissions = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (submissions.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) return true
  submissions.set(ip, [...recent, now])
  return false
}

export async function POST(request: NextRequest) {
  try {
    const data = testimonialSchema.parse(await request.json())
    if (data.website) return NextResponse.json({ published: !requireApproval })
    if (!contentStore.configured) return NextResponse.json({ error: "Reviews cannot be submitted right now. Please try again later." }, { status: 503 })
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.ip || "unknown"
    if (rateLimited(ip)) return NextResponse.json({ error: "You have already submitted a few reviews. Please try again later." }, { status: 429 })

    const record = {
      name: data.name, role: data.role || "", location: data.location || "", project: data.project || "",
      quote: data.quote, rating: data.rating, email: data.email || null, published: !requireApproval,
    }
    await contentStore.submitTestimonial(record)
    void sendTestimonialNotification({ ...record, email: data.email || "" })
    return NextResponse.json({ published: record.published }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check your review details and try again." }, { status: 400 })
    console.error("Testimonial submission error", error)
    return NextResponse.json({ error: "Unable to submit your review. Please try again." }, { status: 500 })
  }
}
