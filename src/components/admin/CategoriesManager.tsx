"use client"

import { Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DeleteDialog } from "./DeleteDialog"
import { deleteCategoryAction } from "@/app/actions/categories"
import { CategoryForm } from "@/components/forms/CategoryForm"
import type { Category } from "@prisma/client"

interface CategoriesManagerProps {
  categories: (Category & { _count: { posts: number } })[]
}

export function CategoriesManager({ categories }: CategoriesManagerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-zinc-400 mb-3">Add new category</h3>
        <CategoryForm />
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 mb-3">
          All categories ({categories.length})
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{cat.name}</p>
                  <p className="text-xs text-zinc-500">/{cat.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                  {cat._count.posts} posts
                </Badge>
                <DeleteDialog
                  title={`Delete "${cat.name}"?`}
                  description="Posts in this category will be uncategorized. This action cannot be undone."
                  onConfirm={async () => {
                    await deleteCategoryAction(cat.id)
                  }}
                />
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="py-8 text-center text-zinc-500">No categories yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
