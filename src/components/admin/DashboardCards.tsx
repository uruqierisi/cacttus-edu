import { FileText, BookOpen, Users, Tag } from "lucide-react"
import { StatCard } from "./StatCard"

interface DashboardCardsProps {
  totalPosts: number
  publishedPosts: number
  totalModerators: number
  totalCategories: number
}

export function DashboardCards({
  totalPosts,
  publishedPosts,
  totalModerators,
  totalCategories,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Posts"
        value={totalPosts}
        icon={FileText}
        trend={{ value: 12, positive: true }}
      />
      <StatCard
        title="Published"
        value={publishedPosts}
        icon={BookOpen}
        trend={{ value: 8, positive: true }}
      />
      <StatCard
        title="Moderators"
        value={totalModerators}
        icon={Users}
      />
      <StatCard
        title="Categories"
        value={totalCategories}
        icon={Tag}
      />
    </div>
  )
}
