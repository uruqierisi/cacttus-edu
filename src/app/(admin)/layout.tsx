"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession, SessionProvider } from "next-auth/react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin/Sidebar"
import { AdminTopBar } from "@/components/admin/TopBar"
import { Toaster } from "@/components/ui/toaster"

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/posts": "Posts",
  "/admin/moderators": "Moderators",
  "/admin/categories": "Categories",
  "/admin/settings": "Settings",
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.includes("/moderators/new")) return "New Moderator"
  if (pathname.includes("/moderators/") && pathname.includes("/edit")) return "Edit Moderator"
  if (pathname.includes("/posts/")) return "View Post"
  return "Admin"
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const title = getPageTitle(pathname)
  const userName = session?.user?.fullName ?? "Admin"
  const userAvatar = session?.user?.avatar

  return (
    <div className="dark min-h-screen bg-zinc-900 flex">
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col">
        <AdminSidebar />
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-60 border-zinc-800">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar
          title={title}
          userName={userName}
          userAvatar={userAvatar}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  )
}
