export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/admin/RoleBadge"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-zinc-400 text-sm mt-1">Account and system settings</p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-white text-base">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Full Name</span>
            <span className="text-white font-medium">{session?.user?.fullName}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Email</span>
            <span className="text-white font-medium">{session?.user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-zinc-400 text-sm">Role</span>
            <RoleBadge role={session?.user?.role ?? "ADMIN"} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-white text-base">System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Framework</span>
            <span className="text-white font-medium">Next.js 14</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Database</span>
            <span className="text-white font-medium">PostgreSQL via Prisma 7</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-zinc-400 text-sm">Version</span>
            <Badge variant="outline" className="border-zinc-700 text-zinc-300">
              1.0.0
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
