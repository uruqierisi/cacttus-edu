"use server"

import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AuthError } from "next-auth"

const loginAttempts = new Map<string, { count: number; firstAttempt: number }>()

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false

  entry.count++
  return true
}

export async function loginAction(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return "Email and password are required."
  }

  const ip = "server"
  if (!checkRateLimit(ip)) {
    return "Too many login attempts. Please try again in 15 minutes."
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim() },
    select: { role: true },
  })
  const redirectTo = user?.role === "ADMIN" ? "/admin" : "/dashboard"

  try {
    await signIn("credentials", {
      email: email.trim(),
      password,
      redirectTo,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password."
    }
    throw error
  }

  return null
}
