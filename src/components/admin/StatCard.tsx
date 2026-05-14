import { type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  trend?: { value: number; positive: boolean }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("border-zinc-800 bg-zinc-900", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400 font-medium">{title}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-xs mt-1 font-medium",
                  trend.positive ? "text-emerald-400" : "text-red-400"
                )}
              >
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% this month
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
            <Icon className="w-6 h-6 text-violet-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
