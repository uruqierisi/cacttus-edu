"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { createModeratorSchema, editModeratorSchema } from "@/lib/validations"
import { safeAction, type ActionResult } from "@/lib/utils"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
  return session
}

export async function createModeratorAction(data: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}): Promise<ActionResult<{ id: string }>> {
  return safeAction(async () => {
    await requireAdmin()

    const parsed = createModeratorSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    })
    if (existing) throw new Error("A user with this email already exists")

    const hashed = await bcrypt.hash(parsed.data.password, 12)

    const user = await prisma.user.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        password: hashed,
        role: "MODERATOR",
      },
    })

    revalidatePath("/admin/moderators")
    return { id: user.id }
  })
}

export async function editModeratorAction(
  id: string,
  data: { fullName: string; email: string; password?: string }
): Promise<ActionResult<{ id: string }>> {
  return safeAction(async () => {
    await requireAdmin()

    const parsed = editModeratorSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const existing = await prisma.user.findUnique({ where: { id } })
    if (!existing) throw new Error("Moderator not found")

    const emailConflict = await prisma.user.findFirst({
      where: { email: parsed.data.email, NOT: { id } },
    })
    if (emailConflict) throw new Error("Email already in use by another account")

    const updateData: {
      fullName: string
      email: string
      password?: string
    } = {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
    }

    if (parsed.data.password && parsed.data.password.length >= 8) {
      updateData.password = await bcrypt.hash(parsed.data.password, 12)
    }

    await prisma.user.update({ where: { id }, data: updateData })

    revalidatePath("/admin/moderators")
    return { id }
  })
}

export async function deleteModeratorAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    await requireAdmin()

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new Error("Moderator not found")
    if (user.role === "ADMIN") throw new Error("Cannot delete admin accounts")

    await prisma.user.delete({ where: { id } })

    revalidatePath("/admin/moderators")
  })
}
