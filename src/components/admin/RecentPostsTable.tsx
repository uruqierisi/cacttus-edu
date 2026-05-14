"use client"

import Link from "next/link"
import Image from "next/image"
import { Eye, Star, StarOff, Globe, FileX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DeleteDialog } from "./DeleteDialog"
import { deletePostAction, togglePublishAction, toggleFeaturedAction } from "@/app/actions/posts"
import { formatDate } from "@/lib/utils"
import type { Prisma } from "@prisma/client"

type PostRow = Prisma.PostGetPayload<{
  include: { author: { select: { fullName: true } }; category: { select: { name: true } } }
}>

interface RecentPostsTableProps {
  posts: PostRow[]
}

export function RecentPostsTable({ posts }: RecentPostsTableProps) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-4 text-zinc-400 font-medium">Post</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden md:table-cell">Author</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden lg:table-cell">Category</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
            <th className="text-left py-3 px-4 text-zinc-400 font-medium hidden sm:table-cell">Date</th>
            <th className="text-right py-3 px-4 text-zinc-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {post.thumbnail ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex-shrink-0" />
                  )}
                  <span className="font-medium text-white line-clamp-1 max-w-[200px]">
                    {post.title}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">
                {post.author.fullName}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
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
                  className={
                    post.status === "PUBLISHED"
                      ? "bg-emerald-900/50 text-emerald-400 border-emerald-800"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700"
                  }
                  variant="outline"
                >
                  {post.status === "PUBLISHED" ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-zinc-400 hidden sm:table-cell">
                {formatDate(post.createdAt)}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
                    <Link href={`/admin/posts/${post.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={post.status === "PUBLISHED" ? "text-emerald-400 hover:text-emerald-300" : "text-zinc-400 hover:text-white"}
                    onClick={() =>
                      void togglePublishAction(post.id)
                    }
                  >
                    {post.status === "PUBLISHED" ? (
                      <FileX className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={post.featured ? "text-yellow-400 hover:text-yellow-300" : "text-zinc-400 hover:text-white"}
                    onClick={() =>
                      void toggleFeaturedAction(post.id)
                    }
                  >
                    {post.featured ? (
                      <Star className="w-4 h-4 fill-yellow-400" />
                    ) : (
                      <StarOff className="w-4 h-4" />
                    )}
                  </Button>
                  <DeleteDialog
                    title="Delete post?"
                    description={`"${post.title}" will be moved to trash. You can restore it within 30 days.`}
                    onConfirm={async () => {
                      await deletePostAction(post.id)
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-zinc-500">
                No posts yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
