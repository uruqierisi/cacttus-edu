import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeratorPostsClient } from "./PostsClient"

export const dynamic = "force-dynamic"

async function getMyPosts(userId: string) {
  return prisma.post.findMany({
    where: { authorId: userId, deletedAt: null },
    include: { category: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  })
}

export default async function MyPostsPage() {
  const session = await auth()
  const posts = await getMyPosts(session!.user.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Posts</h2>
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
        <CardContent className="p-0">
          <ModeratorPostsClient posts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
