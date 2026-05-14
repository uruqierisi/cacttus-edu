import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateModeratorForm } from "@/components/forms/CreateModeratorForm"

export default function NewModeratorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
          <Link href="/admin/moderators">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">New Moderator</h2>
          <p className="text-zinc-400 text-sm mt-1">Create a new moderator account</p>
        </div>
      </div>

      <CreateModeratorForm />
    </div>
  )
}
