import crypto from "crypto"

const COOKIE_NAME = "rgs_admin_session"
const MAX_AGE_SECONDS = 60 * 60 * 8

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value) throw new Error("ADMIN_SESSION_SECRET is not configured")
  return value
}

export function sessionCookieName() { return COOKIE_NAME }

export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ role: "admin", exp: Date.now() + MAX_AGE_SECONDS * 1000 })).toString("base64url")
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export function isValidAdminSession(value?: string) {
  if (!value) return false
  const [payload, receivedSignature] = value.split(".")
  if (!payload || !receivedSignature) return false
  const expectedSignature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url")
  if (receivedSignature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature))) return false
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { role?: string; exp?: number }
    return data.role === "admin" && typeof data.exp === "number" && data.exp > Date.now()
  } catch { return false }
}

export function verifyAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD
  if (!configured) return false
  const input = Buffer.from(password)
  const expected = Buffer.from(configured)
  return input.length === expected.length && crypto.timingSafeEqual(input, expected)
}

export const adminSessionMaxAge = MAX_AGE_SECONDS
