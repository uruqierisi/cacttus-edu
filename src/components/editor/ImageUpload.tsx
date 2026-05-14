"use client"

import Image from "next/image"
import { X, ImageIcon } from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const { toast } = useToast()

  if (value) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-zinc-700 group">
        <Image
          src={value}
          alt="Thumbnail"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center gap-3 bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
        <ImageIcon className="w-6 h-6 text-zinc-500" />
      </div>
      <div className="text-center">
        <p className="text-sm text-zinc-400">Upload thumbnail image</p>
        <p className="text-xs text-zinc-600 mt-1">Max 8MB · PNG, JPG, WebP</p>
      </div>
      <UploadButton
        endpoint="thumbnailUploader"
        onClientUploadComplete={(res) => {
          if (res[0]) onChange(res[0].ufsUrl)
        }}
        onUploadError={(err) => {
          toast({ title: "Upload failed", description: err.message, variant: "destructive" })
        }}
        appearance={{
          button:
            "bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors ut-ready:bg-violet-600 ut-uploading:bg-violet-600/50",
          allowedContent: "hidden",
        }}
      />
    </div>
  )
}
