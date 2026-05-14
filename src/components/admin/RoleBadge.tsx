import { Badge } from "@/components/ui/badge"

interface RoleBadgeProps {
  role: "ADMIN" | "MODERATOR"
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge
      variant={role === "ADMIN" ? "default" : "secondary"}
      className={
        role === "ADMIN"
          ? "bg-violet-600 hover:bg-violet-700 text-white"
          : "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
      }
    >
      {role === "ADMIN" ? "Admin" : "Moderator"}
    </Badge>
  )
}
