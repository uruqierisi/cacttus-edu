"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { categorySchema } from "@/lib/validations"
import { safeAction, type ActionResult } from "@/lib/utils"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
}

export async function createCategoryAction(data: {
  name: string
  slug: string
}): Promise<ActionResult<{ id: string }>> {
  return safeAction(async () => {
    await requireAdmin()

    const parsed = categorySchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }],
      },
    })
    if (existing) throw new Error("A category with this name or slug already exists")

    const category = await prisma.category.create({
      data: { name: parsed.data.name, slug: parsed.data.slug },
    })

    revalidatePath("/admin/categories")
    return { id: category.id }
  })
}

export async function deleteCategoryAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    await requireAdmin()

    const category = await prisma.category.findUnique({ where: { id } })
    if (!category) throw new Error("Category not found")

    await prisma.category.delete({ where: { id } })

    revalidatePath("/admin/categories")
    revalidatePath("/admin/posts")
  })
}
