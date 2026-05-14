export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Pencil } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"

interface ViewPostPageProps {
  params: Promise<{ id: string }>
}

export default async function ViewPostPage({ params }: ViewPostPageProps) {
  const { id } = await params

  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
    include: {
      author: { select: { fullName: true, email: true } },
      category: { select: { name: true } },
    },
  })

  if (!post) notFound()

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
            <Link href="/admin/posts">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white line-clamp-1">{post.title}</h2>
            <p className="text-zinc-400 text-sm mt-1">
              By {post.author.fullName} · {formatDateTime(post.createdAt)}
            </p>
          </div>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white">
          <Link href={`/dashboard/posts/${post.id}/edit`}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={
            post.status === "PUBLISHED"
              ? "bg-emerald-900/50 text-emerald-400 border-emerald-800"
              : "bg-zinc-800 text-zinc-400 border-zinc-700"
          }
        >
          {post.status === "PUBLISHED" ? "Published" : "Draft"}
        </Badge>
        {post.featured && (
          <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-800" variant="outline">
            Featured
          </Badge>
        )}
        {post.category && (
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            {post.category.name}
          </Badge>
        )}
        <span className="text-zinc-500 text-sm">{post.views} views</span>
      </div>

      {post.thumbnail && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-zinc-800">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      {post.excerpt && (
        <p className="text-zinc-300 text-lg leading-relaxed border-l-2 border-violet-500 pl-4 italic">
          {post.excerpt}
        </p>
      )}

      <div
        className="prose prose-invert prose-zinc max-w-none text-zinc-200"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
