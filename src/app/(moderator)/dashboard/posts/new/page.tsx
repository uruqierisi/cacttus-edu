export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { CreatePostForm } from "@/components/forms/CreatePostForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } })
}

export default async function NewPostPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
          <Link href="/dashboard/posts">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">New Post</h2>
          <p className="text-zinc-400 text-sm mt-1">Create a new article</p>
        </div>
      </div>

      <CreatePostForm categories={categories} isAdmin={false} />
    </div>
  )
}
