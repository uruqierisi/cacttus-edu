import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { ModeratorsTable } from "@/components/admin/ModeratorsTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = "force-dynamic"

async function getModerators() {
  return prisma.user.findMany({
    where: { role: "MODERATOR" },
    include: { _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  })
}

export default async function ModeratorsPage() {
  const moderators = await getModerators()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Moderators</h2>
          <p className="text-zinc-400 text-sm mt-1">{moderators.length} moderator(s)</p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white">
          <Link href="/admin/moderators/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Moderator
          </Link>
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="p-6">
          <ModeratorsTable moderators={moderators} />
        </CardContent>
      </Card>
    </div>
  )
}
