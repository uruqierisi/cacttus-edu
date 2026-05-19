"use client"

import { useTransition, useCallback, useEffect } from "react"
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
import { editPostAction } from "@/app/actions/posts"
import { slugify } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import type { Category } from "@prisma/client"

interface EditPostFormProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    thumbnail: string | null
    status: "DRAFT" | "PUBLISHED"
    featured: boolean
    categoryId: string | null
  }
  categories: Category[]
  isAdmin?: boolean
}

export function EditPostForm({ post, categories, isAdmin = false }: EditPostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const autosaveKey = `post_draft_${post.id}`

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
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content,
      thumbnail: post.thumbnail ?? "",
      status: post.status,
      featured: post.featured,
      categoryId: post.categoryId ?? "",
    },
  })

  const title = watch("title")
  const content = watch("content")

  const autosave = useCallback(() => {
    localStorage.setItem(autosaveKey, JSON.stringify({ title, content }))
  }, [title, content, autosaveKey])

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
        const result = await editPostAction(post.id, { ...data, status })
        if (result.success) {
          localStorage.removeItem(autosaveKey)
          toast({ title: "Post updated" })
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
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-300">Title</Label>
            <Input
              {...register("title")}
              onChange={handleTitleChange}
              className="bg-zinc-800 border-zinc-700 text-white text-lg font-semibold"
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
              rows={3}
              className="bg-zinc-800 border-zinc-700 text-white resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
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
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
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
                  value={field.value ?? ""}
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
                {post.status === "PUBLISHED" ? "Update & Keep Published" : "Publish"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
