"use client"

import { useState } from "react"
import Link from "next/link"
import { Pencil } from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeleteDialog } from "./DeleteDialog"
import { deleteModeratorAction } from "@/app/actions/moderators"
import { formatDate } from "@/lib/utils"
import type { Prisma } from "@prisma/client"

type ModeratorRow = Prisma.UserGetPayload<{
  include: { _count: { select: { posts: true } } }
}>

const columnHelper = createColumnHelper<ModeratorRow>()

interface ModeratorsTableProps {
  moderators: ModeratorRow[]
}

export function ModeratorsTable({ moderators }: ModeratorsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")

  const columns = [
    columnHelper.accessor("fullName", {
      header: "Moderator",
      cell: (info) => {
        const row = info.row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={row.avatar ?? undefined} />
              <AvatarFallback className="bg-violet-800 text-white text-xs">
                {row.fullName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{row.fullName}</p>
              <p className="text-xs text-zinc-500">{row.email}</p>
            </div>
          </div>
        )
      },
    }),
    columnHelper.accessor((row) => row._count.posts, {
      id: "posts",
      header: "Posts",
      cell: (info) => (
        <span className="text-zinc-300 font-medium">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Joined",
      cell: (info) => (
        <span className="text-zinc-400">{formatDate(info.getValue())}</span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const mod = info.row.original
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-zinc-400 hover:text-white"
            >
              <Link href={`/admin/moderators/${mod.id}/edit`}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>
            <DeleteDialog
              title="Remove moderator?"
              description={`${mod.fullName}'s account and all their posts will be permanently deleted.`}
              onConfirm={async () => {
                await deleteModeratorAction(mod.id)
              }}
            />
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: moderators,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search moderators…"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-zinc-800">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-3 px-4 text-zinc-400 font-medium"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center text-zinc-500">
                  No moderators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {table.getFilteredRowModel().rows.length} moderator(s)
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
