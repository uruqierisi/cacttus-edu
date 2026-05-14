"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DeleteDialog } from "@/components/admin/DeleteDialog"
import { deletePostAction } from "@/app/actions/posts"
import { formatDate } from "@/lib/utils"

interface PostRow {
  id: string
  title: string
  slug: string
  status: "DRAFT" | "PUBLISHED"
  updatedAt: Date
  category: { name: string } | null
}

interface ModeratorPostsClientProps {
  posts: PostRow[]
}

export function ModeratorPostsClient({ posts }: ModeratorPostsClientProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-6 text-zinc-400 font-medium">Title</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden sm:table-cell">Category</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden md:table-cell">Updated</th>
            <th className="text-right py-3 px-6 text-zinc-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
            >
              <td className="py-3 px-6">
                <span className="font-medium text-white line-clamp-1">{post.title}</span>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell">
                {post.category ? (
                  <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                    {post.category.name}
                  </Badge>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="py-3 px-4">
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
              </td>
              <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">
                {formatDate(post.updatedAt)}
              </td>
              <td className="py-3 px-6">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-zinc-400 hover:text-white"
                  >
                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <DeleteDialog
                    title="Delete post?"
                    description={`"${post.title}" will be moved to trash.`}
                    onConfirm={() => deletePostAction(post.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12 text-center text-zinc-500">
                No posts yet.{" "}
                <Link href="/dashboard/posts/new" className="text-violet-400 hover:underline">
                  Write your first post
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
