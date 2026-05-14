import "server-only"
import { prisma } from "@/lib/prisma"
import slugifyLib from "slugify"

function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, locale: "sq", trim: true })
}

export async function generateUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const slug = slugify(base)
  let suffix = 0

  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`
    const existing = await prisma.post.findFirst({
      where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    })
    if (!existing) return candidate
    suffix++
  }
}
