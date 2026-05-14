import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { PostsTable } from "@/components/admin/PostsTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = "force-dynamic"

async function getPosts() {
  return prisma.post.findMany({
    where: { deletedAt: null },
    include: {
      author: { select: { fullName: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Posts</h2>
          <p className="text-zinc-400 text-sm mt-1">{posts.length} post(s)</p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white">
          <Link href="/dashboard/posts/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="p-6">
          <PostsTable posts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
