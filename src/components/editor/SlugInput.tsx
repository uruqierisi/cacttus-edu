"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn, slugify } from "@/lib/utils"

interface SlugInputProps {
  value: string
  onChange: (value: string) => void
  baseUrl?: string
  error?: string
  className?: string
}

export function SlugInput({
  value,
  onChange,
  baseUrl = "cacttus.education/blog/",
  error,
  className,
}: SlugInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(slugify(e.target.value))
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-zinc-300">Slug</Label>
      <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800 overflow-hidden">
        <span className="px-3 text-zinc-500 text-sm select-none whitespace-nowrap">
          {baseUrl}
        </span>
        <Input
          value={value}
          onChange={handleChange}
          className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
          placeholder="my-post-slug"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
