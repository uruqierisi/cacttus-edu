import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { FileText, BookOpen, Edit } from "lucide-react"
import { StatCard } from "@/components/admin/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

async function getModeratorStats(userId: string) {
  const [totalPosts, publishedPosts, recentPosts] = await Promise.all([
    prisma.post.count({ where: { authorId: userId, deletedAt: null } }),
    prisma.post.count({
      where: { authorId: userId, status: "PUBLISHED", deletedAt: null },
    }),
    prisma.post.findMany({
      where: { authorId: userId, deletedAt: null },
      include: { category: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ])

  return { totalPosts, publishedPosts, draftPosts: totalPosts - publishedPosts, recentPosts }
}

export default async function ModeratorDashboard() {
  const session = await auth()
  const userId = session!.user.id

  const { totalPosts, publishedPosts, draftPosts, recentPosts } =
    await getModeratorStats(userId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome, {session?.user?.fullName}
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Here&apos;s an overview of your content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="My Total Posts" value={totalPosts} icon={FileText} />
        <StatCard title="Published" value={publishedPosts} icon={BookOpen} />
        <StatCard title="Drafts" value={draftPosts} icon={Edit} />
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base">Recent Posts</CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-zinc-400 hover:text-white">
            <Link href="/dashboard/posts">View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-800">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white truncate">{post.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Updated {formatDate(post.updatedAt)}
                    {post.category && ` · ${post.category.name}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-zinc-400 hover:text-white h-8"
                  >
                    <Link href={`/dashboard/posts/${post.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <div className="px-6 py-12 text-center text-zinc-500">
                No posts yet.{" "}
                <Link href="/dashboard/posts/new" className="text-violet-400 hover:underline">
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
