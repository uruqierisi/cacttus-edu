"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { createPostSchema } from "@/lib/validations"
import { safeAction, slugify, type ActionResult } from "@/lib/utils"
import { generateUniqueSlug } from "@/lib/server-utils"
import { auth } from "@/lib/auth"

async function requireAuth() {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")
  return session
}

export async function createPostAction(data: {
  title: string
  slug: string
  excerpt?: string
  content: string
  thumbnail?: string
  status: "DRAFT" | "PUBLISHED"
  featured: boolean
  categoryId?: string
}): Promise<ActionResult<{ id: string; slug: string }>> {
  return safeAction(async () => {
    const session = await requireAuth()

    const parsed = createPostSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const baseSlug = parsed.data.slug || slugify(parsed.data.title)
    const uniqueSlug = await generateUniqueSlug(baseSlug)

    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        slug: uniqueSlug,
        excerpt: parsed.data.excerpt || null,
        content: parsed.data.content,
        thumbnail: parsed.data.thumbnail || null,
        status:
          session.user.role === "MODERATOR" ? "DRAFT" : parsed.data.status,
        featured:
          session.user.role === "ADMIN" ? parsed.data.featured : false,
        categoryId: parsed.data.categoryId || null,
        authorId: session.user.id,
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/dashboard/posts")
    return { id: post.id, slug: post.slug }
  })
}

export async function editPostAction(
  id: string,
  data: {
    title: string
    slug: string
    excerpt?: string
    content: string
    thumbnail?: string
    status: "DRAFT" | "PUBLISHED"
    featured: boolean
    categoryId?: string
  }
): Promise<ActionResult<{ id: string }>> {
  return safeAction(async () => {
    const session = await requireAuth()

    const post = await prisma.post.findFirst({
      where: { id, deletedAt: null },
    })
    if (!post) throw new Error("Post not found")

    if (session.user.role === "MODERATOR" && post.authorId !== session.user.id) {
      throw new Error("You can only edit your own posts")
    }

    const parsed = createPostSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const baseSlug = parsed.data.slug || slugify(parsed.data.title)
    const uniqueSlug = await generateUniqueSlug(baseSlug, id)

    await prisma.post.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: uniqueSlug,
        excerpt: parsed.data.excerpt || null,
        content: parsed.data.content,
        thumbnail: parsed.data.thumbnail || null,
        status:
          session.user.role === "MODERATOR" ? post.status : parsed.data.status,
        featured:
          session.user.role === "ADMIN" ? parsed.data.featured : post.featured,
        categoryId: parsed.data.categoryId || null,
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/dashboard/posts")
    revalidatePath(`/admin/posts/${id}`)
    return { id }
  })
}

export async function deletePostAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    const session = await requireAuth()

    const post = await prisma.post.findFirst({
      where: { id, deletedAt: null },
    })
    if (!post) throw new Error("Post not found")

    if (session.user.role === "MODERATOR" && post.authorId !== session.user.id) {
      throw new Error("You can only delete your own posts")
    }

    await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/dashboard/posts")
  })
}

export async function restorePostAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    const session = await requireAuth()
    if (session.user.role !== "ADMIN") throw new Error("Unauthorized")

    await prisma.post.update({
      where: { id },
      data: { deletedAt: null },
    })

    revalidatePath("/admin/posts")
  })
}

export async function togglePublishAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    const session = await requireAuth()
    if (session.user.role !== "ADMIN") throw new Error("Unauthorized")

    const post = await prisma.post.findFirst({
      where: { id, deletedAt: null },
    })
    if (!post) throw new Error("Post not found")

    await prisma.post.update({
      where: { id },
      data: {
        status: post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath(`/admin/posts/${id}`)
  })
}

export async function toggleFeaturedAction(id: string): Promise<ActionResult<void>> {
  return safeAction(async () => {
    const session = await requireAuth()
    if (session.user.role !== "ADMIN") throw new Error("Unauthorized")

    const post = await prisma.post.findFirst({
      where: { id, deletedAt: null },
    })
    if (!post) throw new Error("Post not found")

    await prisma.post.update({
      where: { id },
      data: { featured: !post.featured },
    })

    revalidatePath("/admin/posts")
  })
}
