import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendContactConfirmation, sendContactNotification } from "@/lib/email"
import { contentStore } from "@/lib/supabase"

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100), company: z.string().trim().max(120).optional(),
  email: z.string().trim().email().optional().or(z.literal("")), phone: z.string().trim().min(10).max(20),
  projectLocation: z.string().trim().max(150).optional(), serviceInterest: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(4000), preferredContact: z.enum(["phone", "email", "either"]),
  agreeToTerms: z.literal(true), website: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const inquiry = inquirySchema.parse(await request.json())
    if (inquiry.website) return NextResponse.json({ message: "Inquiry received" })
    const [firstName, ...rest] = inquiry.name.split(/\s+/)
    const emailData = { firstName, lastName: rest.join(" ") || "Customer", email: inquiry.email || "no-email@submitted.invalid", phone: inquiry.phone, subject: inquiry.serviceInterest, message: `${inquiry.projectLocation ? `Project location: ${inquiry.projectLocation}\n\n` : ""}${inquiry.message}`, preferredContact: inquiry.preferredContact }
    if (contentStore.configured) await contentStore.adminCreate("inquiries", { name: inquiry.name, company: inquiry.company || null, email: inquiry.email || null, phone: inquiry.phone, project_location: inquiry.projectLocation || null, service_interest: inquiry.serviceInterest, message: inquiry.message, preferred_contact: inquiry.preferredContact, status: "new" })
    const notification = await sendContactNotification(emailData)
    if (!notification.success && !contentStore.configured) return NextResponse.json({ error: "The inquiry service is temporarily unavailable. Please call us directly." }, { status: 503 })
    if (inquiry.email) void sendContactConfirmation(inquiry.email, firstName)
    return NextResponse.json({ message: "Inquiry received" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check the inquiry details and try again." }, { status: 400 })
    console.error("Inquiry form error", error)
    return NextResponse.json({ error: "Unable to send your inquiry. Please try again." }, { status: 500 })
  }
}
