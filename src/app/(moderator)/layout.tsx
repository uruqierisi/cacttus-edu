"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession, SessionProvider } from "next-auth/react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ModeratorSidebar } from "@/components/moderator/ModeratorSidebar"
import { ModeratorTopBar } from "@/components/moderator/ModeratorTopBar"
import { Toaster } from "@/components/ui/toaster"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/posts": "My Posts",
  "/dashboard/posts/new": "New Post",
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.includes("/posts/") && pathname.includes("/edit")) return "Edit Post"
  return "Dashboard"
}

function ModeratorLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const title = getPageTitle(pathname)
  const userName = session?.user?.fullName ?? "Moderator"
  const userAvatar = session?.user?.avatar

  return (
    <div className="dark min-h-screen bg-zinc-900 flex">
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col">
        <ModeratorSidebar />
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-60 border-zinc-800">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <ModeratorSidebar onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <ModeratorTopBar
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

export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ModeratorLayoutInner>{children}</ModeratorLayoutInner>
    </SessionProvider>
  )
}
