import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendContactNotification, sendContactConfirmation } from "@/lib/email"

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(10),
  preferredContact: z.enum(["email", "phone", "both"]),
  agreeToTerms: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send notification email to business
    const notificationResult = await sendContactNotification(validatedData)

    if (!notificationResult.success) {
      console.error("Failed to send notification email:", notificationResult.error)

      const message = notificationResult.error?.includes("Missing email configuration")
        ? "Contact form is temporarily unavailable because email is not configured on the server. Please call us directly at +91 9320008279."
        : "Failed to send notification. Please try again or contact us directly."

      const status = notificationResult.error?.includes("Missing email configuration") ? 503 : 500

      return NextResponse.json(
        { error: message },
        { status },
      )
    }

    // Send confirmation email to customer
    const confirmationResult = await sendContactConfirmation(validatedData.email, validatedData.firstName)

    if (!confirmationResult.success) {
      console.warn("Failed to send confirmation email:", confirmationResult.error)
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        notificationSent: notificationResult.success,
        confirmationSent: confirmationResult.success,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 })
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
    }

    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "GET method not allowed. Please use POST to submit the contact form." },
    { status: 405 }
  );
}
