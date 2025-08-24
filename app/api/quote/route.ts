import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendQuoteNotification, sendQuoteConfirmation } from "@/lib/email"

const quoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  projectType: z.enum(["residential", "commercial", "repair", "custom"]),
  glassType: z.enum(["tempered", "laminated", "insulated", "decorative", "smart", "other"]),
  serviceNeeded: z.array(z.string()).min(1),
  projectLocation: z.string().min(5),
  dimensions: z.object({
    length: z.string().min(1),
    width: z.string().min(1),
    height: z.string().optional(),
    unit: z.enum(["feet", "meters", "inches"]),
  }),
  urgency: z.enum(["standard", "urgent", "emergency"]),
  budget: z.enum(["under-50k", "50k-100k", "100k-200k", "200k-500k", "above-500k"]),
  projectDescription: z.string().min(20),
  preferredDate: z.string().optional(),
  hasSketch: z.boolean(),
  agreeToTerms: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const quoteDataString = formData.get("quoteData") as string
    const files = formData.getAll("files") as File[]

    const quoteData = JSON.parse(quoteDataString)
    const validatedData = quoteSchema.parse(quoteData)

    // Process uploaded files
    const uploadedFiles = await processFiles(files)

    // Generate unique quote ID
    const quoteId = generateQuoteId()

    // Here you would typically save to database
    // await saveQuoteRequest(validatedData, uploadedFiles, quoteId)

    // Send notification email to sales team
    const notificationResult = await sendQuoteNotification(validatedData, uploadedFiles, quoteId)

    if (!notificationResult.success) {
      console.error("Failed to send quote notification:", notificationResult.error)
      return NextResponse.json(
        { error: "Failed to send quote request. Please try again or contact us directly." },
        { status: 500 },
      )
    }

    // Send confirmation email to customer
    const confirmationResult = await sendQuoteConfirmation(validatedData.email, validatedData.firstName, quoteId)

    if (!confirmationResult.success) {
      console.warn("Failed to send confirmation email:", confirmationResult.error)
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      {
        message: "Quote request submitted successfully",
        quoteId,
        notificationSent: notificationResult.success,
        confirmationSent: confirmationResult.success,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 })
    }

    console.error("Quote form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateQuoteId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `QT-${timestamp}-${random}`
}

async function processFiles(files: File[]) {
  // In a real application, you would:
  // 1. Validate file types and sizes
  // 2. Upload to cloud storage (AWS S3, Cloudinary, etc.)
  // 3. Generate secure URLs
  // 4. Create thumbnails for images

  const processedFiles = []

  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      throw new Error(`File ${file.name} is too large`)
    }

    // Simulate file processing - in production, upload to cloud storage
    processedFiles.push({
      name: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${Date.now()}-${file.name}`, // This would be the actual cloud storage URL
    })
  }

  return processedFiles
}
