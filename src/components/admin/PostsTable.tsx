"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Pencil, Eye, Globe, FileX, Star, StarOff } from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DeleteDialog } from "./DeleteDialog"
import {
  deletePostAction,
  togglePublishAction,
  toggleFeaturedAction,
} from "@/app/actions/posts"
import { formatDate } from "@/lib/utils"
import type { Prisma } from "@prisma/client"

type PostRow = Prisma.PostGetPayload<{
  include: {
    author: { select: { fullName: true } }
    category: { select: { name: true } }
  }
}>

const columnHelper = createColumnHelper<PostRow>()

interface PostsTableProps {
  posts: PostRow[]
}

export function PostsTable({ posts }: PostsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const filtered = posts.filter((p) => {
    if (statusFilter === "ALL") return true
    return p.status === statusFilter
  })

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => {
        const post = info.row.original
        return (
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
        )
      },
    }),
    columnHelper.accessor((r) => r.author.fullName, {
      id: "author",
      header: "Author",
      cell: (info) => <span className="text-zinc-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor((r) => r.category?.name ?? "—", {
      id: "category",
      header: "Category",
      cell: (info) =>
        info.getValue() !== "—" ? (
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            {info.getValue()}
          </Badge>
        ) : (
          <span className="text-zinc-600">—</span>
        ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          variant="outline"
          className={
            info.getValue() === "PUBLISHED"
              ? "bg-emerald-900/50 text-emerald-400 border-emerald-800"
              : "bg-zinc-800 text-zinc-400 border-zinc-700"
          }
        >
          {info.getValue() === "PUBLISHED" ? "Published" : "Draft"}
        </Badge>
      ),
    }),
    columnHelper.accessor("featured", {
      header: "Featured",
      cell: (info) =>
        info.getValue() ? (
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ) : (
          <span className="text-zinc-600">—</span>
        ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => (
        <span className="text-zinc-400 whitespace-nowrap">
          {formatDate(info.getValue())}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const post = info.row.original
        return (
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
              <Link href={`/admin/posts/${post.id}`}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
              <Link href={`/dashboard/posts/${post.id}/edit`}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={
                post.status === "PUBLISHED"
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-zinc-400 hover:text-white"
              }
              onClick={() => { void togglePublishAction(post.id) }}
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
              className={
                post.featured
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-zinc-400 hover:text-white"
              }
              onClick={() => { void toggleFeaturedAction(post.id) }}
            >
              {post.featured ? (
                <Star className="w-4 h-4 fill-yellow-400" />
              ) : (
                <StarOff className="w-4 h-4" />
              )}
            </Button>
            <DeleteDialog
              title="Delete post?"
              description={`"${post.title}" will be moved to trash. Restorable within 30 days.`}
              onConfirm={async () => {
                await deletePostAction(post.id)
              }}
            />
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: filtered,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search posts…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="ALL" className="text-zinc-300 focus:bg-zinc-800">All statuses</SelectItem>
            <SelectItem value="DRAFT" className="text-zinc-300 focus:bg-zinc-800">Draft</SelectItem>
            <SelectItem value="PUBLISHED" className="text-zinc-300 focus:bg-zinc-800">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-zinc-800">
                {hg.headers.map((header) => (
                  <th key={header.id} className="text-left py-3 px-4 text-zinc-400 font-medium whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-zinc-500">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {table.getFilteredRowModel().rows.length} post(s)
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
          >
            Previous
          </Button>
          <span className="text-xs text-zinc-500 self-center">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
