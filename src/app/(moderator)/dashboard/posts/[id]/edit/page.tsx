export const dynamic = "force-dynamic"

import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { EditPostForm } from "@/components/forms/EditPostForm"

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const session = await auth()

  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
  })

  if (!post) notFound()

  if (session!.user.role === "MODERATOR" && post.authorId !== session!.user.id) {
    redirect("/dashboard/posts")
  }

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
          <Link href="/dashboard/posts">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Post</h2>
          <p className="text-zinc-400 text-sm mt-1 line-clamp-1">{post.title}</p>
        </div>
      </div>

      <EditPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          thumbnail: post.thumbnail,
          status: post.status,
          featured: post.featured,
          categoryId: post.categoryId,
        }}
        categories={categories}
        isAdmin={session!.user.role === "ADMIN"}
      />
    </div>
  )
}
