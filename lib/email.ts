import nodemailer from "nodemailer"

// SMTP transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Helper to send email
async function sendEmail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  await transporter.sendMail({
    from: `"RoopGlass" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
    text,
  })
}

interface EmailResult {
  success: boolean
  error?: string
}

interface ContactData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  preferredContact: string
}

interface QuoteData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  glassType: string
  serviceNeeded: string[]
  projectLocation: string
  dimensions: {
    length: string
    width: string
    height?: string
    unit: string
  }
  urgency: string
  budget: string
  projectDescription: string
  preferredDate?: string
}

const FROM_EMAIL = process.env.FROM_EMAIL || "info@roopglass.com"
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@roopglass.com"
const SALES_EMAIL = process.env.SALES_EMAIL || "info@roopglass.com"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://roopglass.com"

export async function sendContactNotification(data: ContactData): Promise<EmailResult> {
  try {
    await sendEmail({
      to: CONTACT_EMAIL,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: generateContactNotificationHTML(data),
      text: generateContactNotificationText(data),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending contact notification:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendContactConfirmation(email: string, firstName: string): Promise<EmailResult> {
  try {
    await sendEmail({
      to: email,
      subject: "Thank you for contacting RoopGlass",
      html: generateContactConfirmationHTML(firstName),
      text: generateContactConfirmationText(firstName),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending contact confirmation:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendQuoteNotification(data: QuoteData, files: any[], quoteId: string): Promise<EmailResult> {
  try {
    await sendEmail({
      to: SALES_EMAIL,
      subject: `${data.urgency === "emergency" ? "🚨 URGENT" : data.urgency === "urgent" ? "⚡ PRIORITY" : ""} New Quote Request: ${quoteId}`,
      html: generateQuoteNotificationHTML(data, files, quoteId),
      text: generateQuoteNotificationText(data, files, quoteId),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending quote notification:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendQuoteConfirmation(email: string, firstName: string, quoteId: string): Promise<EmailResult> {
  try {
    await sendEmail({
      to: email,
      subject: "Quote Request Received - RoopGlass",
      html: generateQuoteConfirmationHTML(firstName, quoteId),
      text: generateQuoteConfirmationText(firstName, quoteId),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending quote confirmation:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// HTML Email Templates
function generateContactNotificationHTML(data: ContactData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .label { font-weight: bold; color: #1e293b; margin-bottom: 5px; }
        .value { color: #475569; }
        .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0; }
        .priority { background: #fef3c7; border-left-color: #f59e0b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
          <p>RoopGlass - Customer Inquiry</p>
        </div>
        <div class="content">
          <div class="info-grid">
            <div class="info-item">
              <div class="label">👤 Customer Name</div>
              <div class="value">${data.firstName} ${data.lastName}</div>
            </div>
            <div class="info-item">
              <div class="label">📧 Email Address</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="info-item">
              <div class="label">📱 Phone Number</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="info-item">
              <div class="label">💬 Preferred Contact</div>
              <div class="value">${data.preferredContact}</div>
            </div>
          </div>
          
          <div class="info-item">
            <div class="label">📋 Subject</div>
            <div class="value">${data.subject}</div>
          </div>
          
          <div class="message-box">
            <div class="label">💭 Message</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          
          <p style="text-align: center; margin-top: 30px; color: #64748b;">
            <strong>⏰ Received:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateContactConfirmationHTML(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting RoopGlass</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 40px; border-radius: 0 0 8px 8px; }
        .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .contact-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Message Received!</h1>
          <p>Thank you for contacting RoopGlass</p>
        </div>
        <div class="content">
          <p>Dear ${firstName},</p>
          
          <p>Thank you for reaching out to RoopGlass! We have successfully received your message and our team will review it shortly.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>📧 Our team will review your inquiry within 24 hours</li>
            <li>📞 We'll contact you using your preferred method</li>
            <li>🎯 We'll provide personalized solutions for your needs</li>
          </ul>
          
          <div class="contact-info">
            <h3>Need immediate assistance?</h3>
            <p><strong>📱 Call us:</strong> +91 9320008279</p>
            <p><strong>📧 Email:</strong> roopglass@gmail.com</p>
            <p><strong>🕒 Hours:</strong> 24hr</p>
          </div>
          
          <p>Best regards,<br>
          <strong>The RoopGlass Team</strong></p>
          
          <p style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}" class="cta-button">Visit Our Website</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateQuoteNotificationHTML(data: QuoteData, files: any[], quoteId: string): string {
  const urgencyColor = data.urgency === "emergency" ? "#dc2626" : data.urgency === "urgent" ? "#f59e0b" : "#3b82f6"
  const urgencyBg = data.urgency === "emergency" ? "#fef2f2" : data.urgency === "urgent" ? "#fef3c7" : "#eff6ff"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Quote Request - ${quoteId}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, ${urgencyColor}, #6366f1); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .urgency-badge { background: ${urgencyBg}; color: ${urgencyColor}; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid ${urgencyColor}; }
        .label { font-weight: bold; color: #1e293b; margin-bottom: 5px; }
        .value { color: #475569; }
        .full-width { grid-column: 1 / -1; }
        .services-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .service-tag { background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💼 New Quote Request</h1>
          <p>Quote ID: ${quoteId}</p>
        </div>
        <div class="content">
          <div class="urgency-badge">
            ${data.urgency === "emergency" ? "🚨 EMERGENCY" : data.urgency === "urgent" ? "⚡ URGENT" : "📋 STANDARD"} REQUEST
          </div>
          
          <h3>👤 Customer Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Name</div>
              <div class="value">${data.firstName} ${data.lastName}</div>
            </div>
            <div class="info-item">
              <div class="label">Email</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="info-item">
              <div class="label">Phone</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="info-item">
              <div class="label">Location</div>
              <div class="value">${data.projectLocation}</div>
            </div>
          </div>
          
          <h3>🏗️ Project Details</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">Project Type</div>
              <div class="value">${data.projectType}</div>
            </div>
            <div class="info-item">
              <div class="label">Glass Type</div>
              <div class="value">${data.glassType}</div>
            </div>
            <div class="info-item">
              <div class="label">Budget Range</div>
              <div class="value">${data.budget}</div>
            </div>
            <div class="info-item">
              <div class="label">Preferred Date</div>
              <div class="value">${data.preferredDate || "Not specified"}</div>
            </div>
            <div class="info-item full-width">
              <div class="label">Services Needed</div>
              <div class="services-list">
                ${data.serviceNeeded.map((service) => `<span class="service-tag">${service}</span>`).join("")}
              </div>
            </div>
          </div>
          
          <h3>📏 Dimensions</h3>
          <div class="info-item">
            <div class="value">
              <strong>Length:</strong> ${data.dimensions.length} ${data.dimensions.unit} | 
              <strong>Width:</strong> ${data.dimensions.width} ${data.dimensions.unit}
              ${data.dimensions.height ? ` | <strong>Height:</strong> ${data.dimensions.height} ${data.dimensions.unit}` : ""}
            </div>
          </div>
          
          <h3>📝 Project Description</h3>
          <div class="info-item">
            <div class="value">${data.projectDescription.replace(/\n/g, "<br>")}</div>
          </div>
          
          ${
            files.length > 0
              ? `
          <h3>📎 Attached Files</h3>
          <div class="info-item">
            <div class="value">
              ${files.map((file) => `<div>📄 ${file.name} (${file.type})</div>`).join("")}
            </div>
          </div>
          `
              : ""
          }
          
          <p style="text-align: center; margin-top: 30px; color: #64748b;">
            <strong>⏰ Received:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateQuoteConfirmationHTML(firstName: string, quoteId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quote Request Confirmation - ${quoteId}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 40px; border-radius: 0 0 8px 8px; }
        .quote-id { background: white; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; border: 2px solid #3b82f6; }
        .timeline { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .timeline-item { display: flex; align-items: center; margin: 10px 0; }
        .timeline-icon { background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 12px; }
        .contact-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Quote Request Received!</h1>
          <p>We're preparing your custom quote</p>
        </div>
        <div class="content">
          <p>Dear ${firstName},</p>
          
          <p>Thank you for your quote request! We have successfully received your project details and our team is already working on preparing a comprehensive quote for you.</p>
          
          <div class="quote-id">
            <strong>📋 Your Quote Reference ID:</strong><br>
            <span style="font-size: 18px; color: #3b82f6; font-weight: bold;">${quoteId}</span>
          </div>
          
          <div class="timeline">
            <h3>📅 What happens next?</h3>
            <div class="timeline-item">
              <div class="timeline-icon">1</div>
              <div><strong>Review (0-2 hours):</strong> Our experts review your requirements</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">2</div>
              <div><strong>Analysis (2-24 hours):</strong> We analyze dimensions, materials, and complexity</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">3</div>
              <div><strong>Quote Preparation (24-48 hours):</strong> Detailed quote with pricing and timeline</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon">4</div>
              <div><strong>Delivery:</strong> You receive your comprehensive quote via email</div>
            </div>
          </div>
          
          <div class="contact-info">
            <h3>Questions or urgent requirements?</h3>
            <p><strong>📱 Call us:</strong> +91 9320008279</p>
            <p><strong>📧 Email:</strong> info@roopglass.com</p>
            <p><strong>💬 Reference:</strong> Quote ID ${quoteId}</p>
          </div>
          
          <p>We appreciate your interest in RoopGlass and look forward to working with you on your glass project!</p>
          
          <p>Best regards,<br>
          <strong>The RoopGlass Sales Team</strong></p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Text versions for email clients that don't support HTML
function generateContactNotificationText(data: ContactData): string {
  return `
New Contact Form Submission - RoopGlass

Customer: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Preferred Contact: ${data.preferredContact}

Subject: ${data.subject}

Message:
${data.message}

Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
  `
}

function generateContactConfirmationText(firstName: string): string {
  return `
Thank you for contacting RoopGlass!

Dear ${firstName},

We have received your message and will get back to you within 24 hours.

For immediate assistance:
Phone: +91 9320008279
Email: roopglass@gmail.com

Best regards,
The RoopGlass Team
  `
}

function generateQuoteNotificationText(data: QuoteData, files: any[], quoteId: string): string {
  return `
${data.urgency === "emergency" ? "URGENT " : ""}New Quote Request: ${quoteId}

Customer: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.projectLocation}

Project Details:
- Type: ${data.projectType}
- Glass Type: ${data.glassType}
- Services: ${data.serviceNeeded.join(", ")}
- Dimensions: ${data.dimensions.length} x ${data.dimensions.width}${data.dimensions.height ? ` x ${data.dimensions.height}` : ""} ${data.dimensions.unit}
- Urgency: ${data.urgency}
- Budget: ${data.budget}
- Preferred Date: ${data.preferredDate || "Not specified"}

Description:
${data.projectDescription}

Attached Files: ${files.length}
${files.map((f) => `- ${f.name} (${f.type})`).join("\n")}

Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
  `
}

function generateQuoteConfirmationText(firstName: string, quoteId: string): string {
  return `
Quote Request Received - RoopGlass

Dear ${firstName},

Your quote request has been received successfully!

Quote Reference ID: ${quoteId}

Timeline:
1. Review (0-2 hours): Our experts review your requirements
2. Analysis (2-24 hours): We analyze dimensions, materials, and complexity  
3. Quote Preparation (24-48 hours): Detailed quote with pricing and timeline
4. Delivery: You receive your comprehensive quote via email

Questions? Contact us:
Phone: +91 9320008279
Email: info@roopglass.com
Reference: Quote ID ${quoteId}

Best regards,
The RoopGlass Sales Team
  `
}
