"use client"

import { useTransition, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Globe } from "lucide-react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SlugInput } from "@/components/editor/SlugInput"

const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor").then((m) => ({ default: m.RichTextEditor })),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-zinc-800 rounded-lg animate-pulse" />,
  }
)
import { ImageUpload } from "@/components/editor/ImageUpload"
import { createPostSchema, type CreatePostInput } from "@/lib/validations"
import { createPostAction } from "@/app/actions/posts"
import { slugify } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import type { Category } from "@prisma/client"

const AUTOSAVE_KEY = "post_draft_new"

interface CreatePostFormProps {
  categories: Category[]
  isAdmin?: boolean
}

export function CreatePostForm({ categories, isAdmin = false }: CreatePostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      status: "DRAFT",
      featured: false,
      categoryId: "",
    },
  })

  const title = watch("title")
  const content = watch("content")
  const thumbnail = watch("thumbnail")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY)
      if (saved) {
        const data = JSON.parse(saved) as Partial<CreatePostInput>
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof CreatePostInput, value as never)
        })
        toast({ title: "Draft restored from autosave" })
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const autosave = useCallback(() => {
    const data = { title, content, thumbnail }
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data))
  }, [title, content, thumbnail])

  useEffect(() => {
    const timer = setInterval(autosave, 30_000)
    return () => clearInterval(timer)
  }, [autosave])

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setValue("title", value)
    setValue("slug", slugify(value))
  }

  function submit(status: "DRAFT" | "PUBLISHED") {
    setValue("status", status)
    handleSubmit((data) => {
      startTransition(async () => {
        const result = await createPostAction({ ...data, status })
        if (result.success) {
          localStorage.removeItem(AUTOSAVE_KEY)
          toast({ title: status === "PUBLISHED" ? "Post published!" : "Draft saved" })
          router.push(isAdmin ? "/admin/posts" : "/dashboard/posts")
        } else {
          toast({ title: "Error", description: result.error, variant: "destructive" })
        }
      })
    })()
  }

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-300">Title</Label>
            <Input
              {...register("title")}
              onChange={handleTitleChange}
              placeholder="Post title…"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 text-lg font-semibold"
            />
            {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
          </div>

          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <SlugInput
                value={field.value}
                onChange={field.onChange}
                error={errors.slug?.message}
              />
            )}
          />

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Excerpt</Label>
            <Textarea
              {...register("excerpt")}
              placeholder="Short description of the post (optional)…"
              rows={3}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
            />
            {errors.excerpt && <p className="text-xs text-red-400">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your post content here…"
                />
              )}
            />
            {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="" className="text-zinc-400 focus:bg-zinc-800">
                        No category
                      </SelectItem>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="text-zinc-300 focus:bg-zinc-800"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {isAdmin && (
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Featured post</Label>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
            <Label className="text-zinc-300">Thumbnail</Label>
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() => submit("DRAFT")}
              disabled={isPending}
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            {isAdmin && (
              <Button
                type="button"
                onClick={() => submit("PUBLISHED")}
                disabled={isPending}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
