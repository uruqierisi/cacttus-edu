export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { CategoriesManager } from "@/components/admin/CategoriesManager"
import { Card, CardContent } from "@/components/ui/card"

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Categories</h2>
        <p className="text-zinc-400 text-sm mt-1">Manage post categories</p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 max-w-2xl">
        <CardContent className="p-6">
          <CategoriesManager categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
