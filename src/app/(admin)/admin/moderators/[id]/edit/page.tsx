export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { EditModeratorForm } from "@/components/forms/EditModeratorForm"

interface EditModeratorPageProps {
  params: Promise<{ id: string }>
}

export default async function EditModeratorPage({ params }: EditModeratorPageProps) {
  const { id } = await params

  const moderator = await prisma.user.findUnique({
    where: { id, role: "MODERATOR" },
    select: { id: true, fullName: true, email: true },
  })

  if (!moderator) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
          <Link href="/admin/moderators">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Moderator</h2>
          <p className="text-zinc-400 text-sm mt-1">{moderator.fullName}</p>
        </div>
      </div>

      <EditModeratorForm moderator={moderator} />
    </div>
  )
}
