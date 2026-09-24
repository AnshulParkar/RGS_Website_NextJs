import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, "../.env")

// Load .env manually to avoid extra dependencies
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIndex = trimmed.indexOf("=")
      if (eqIndex !== -1) {
        const key = trimmed.slice(0, eqIndex).trim()
        const val = trimmed.slice(eqIndex + 1).trim()
        if (!process.env[key]) {
          process.env[key] = val
        }
      }
    }
  })
}

const host = process.env.SMTP_HOST || "smtp.gmail.com"
const port = Number(process.env.SMTP_PORT) || 465
const user = process.env.SMTP_USER || "info.roopglass@gmail.com"
const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "")
const to = process.env.CONTACT_EMAIL || user

console.log("\n==========================================")
console.log(" RoopGlass Email Configuration Diagnostic")
console.log("==========================================")
console.log(`SMTP Host : ${host}`)
console.log(`SMTP Port : ${port}`)
console.log(`SMTP User : ${user}`)
console.log(`Target To : ${to}`)

if (!pass || pass === "your_16_character_app_password") {
  console.error("\n❌ ERROR: SMTP_PASS is not set or still set to the placeholder.")
  console.error("Please generate a 16-character App Password from Google:")
  console.error("👉 https://myaccount.google.com/apppasswords")
  console.error("Then update SMTP_PASS in your .env file and run this script again.\n")
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
})

async function runTest() {
  try {
    console.log("\n⏳ Verifying SMTP connection & credentials with Google...")
    await transporter.verify()
    console.log("✅ SMTP Authentication successful!")

    console.log(`\n⏳ Sending test email to ${to}...`)
    const info = await transporter.sendMail({
      from: `"RoopGlass Website" <${user}>`,
      to,
      subject: "Test Email - RoopGlass SMTP Verification",
      text: "Congratulations! Your Gmail SMTP configuration is working correctly for info.roopglass@gmail.com.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">✅ Gmail SMTP is Working!</h2>
          <p>This is a test email confirming that <strong>${user}</strong> is correctly authenticated with Google SMTP.</p>
          <p>Your website forms (Contact Form and Quote Request) can now send emails without issue.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Sent at ${new Date().toISOString()} via RoopGlass Diagnostic Utility</p>
        </div>
      `,
    })

    console.log("✅ Test email sent successfully!")
    console.log(`Message ID: ${info.messageId}`)
    console.log(`Please check your inbox at: ${to}\n`)
  } catch (err) {
    console.error("\n❌ Failed to send email:")
    console.error(err.message || err)
    if (err.message && err.message.includes("535")) {
      console.error("\n👉 Tip: 535 Bad Credentials means Google rejected the password.")
      console.error("Make sure 2-Step Verification is active on info.roopglass@gmail.com")
      console.error("and use an App Password created from https://myaccount.google.com/apppasswords.")
    }
    process.exit(1)
  }
}

runTest()
