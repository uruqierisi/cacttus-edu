import { prisma } from "@/lib/prisma"
import { DashboardCards } from "@/components/admin/DashboardCards"
import { RecentPostsTable } from "@/components/admin/RecentPostsTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

async function getDashboardData() {
  const [totalPosts, publishedPosts, totalModerators, totalCategories, recentPosts] =
    await Promise.all([
      prisma.post.count({ where: { deletedAt: null } }),
      prisma.post.count({ where: { status: "PUBLISHED", deletedAt: null } }),
      prisma.user.count({ where: { role: "MODERATOR" } }),
      prisma.category.count(),
      prisma.post.findMany({
        where: { deletedAt: null },
        include: {
          author: { select: { fullName: true } },
          category: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ])

  return { totalPosts, publishedPosts, totalModerators, totalCategories, recentPosts }
}

export default async function AdminDashboard() {
  const { totalPosts, publishedPosts, totalModerators, totalCategories, recentPosts } =
    await getDashboardData()

  return (
    <div className="space-y-6">
      <DashboardCards
        totalPosts={totalPosts}
        publishedPosts={publishedPosts}
        totalModerators={totalModerators}
        totalCategories={totalCategories}
      />

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <RecentPostsTable posts={recentPosts} />
        </CardContent>
      </Card>
    </div>
  )
}
