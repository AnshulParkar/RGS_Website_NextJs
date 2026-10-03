import { NextRequest, NextResponse } from "next/server"
import { adminSessionMaxAge, createAdminSession, sessionCookieName, verifyAdminPassword } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    if (typeof password !== "string" || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid login details" }, { status: 401 })
    }
    const response = NextResponse.json({ ok: true })
    response.cookies.set(sessionCookieName(), createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: adminSessionMaxAge })
    return response
  } catch { return NextResponse.json({ error: "Unable to sign in" }, { status: 400 }) }
}
