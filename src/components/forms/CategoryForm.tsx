"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categorySchema, type CategoryInput } from "@/lib/validations"
import { createCategoryAction } from "@/app/actions/categories"
import { slugify } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function CategoryForm() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
  })

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setValue("name", value)
    setValue("slug", slugify(value))
  }

  function onSubmit(data: CategoryInput) {
    startTransition(async () => {
      const result = await createCategoryAction(data)
      if (result.success) {
        toast({ title: "Category created" })
        reset()
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          placeholder="Category name"
          {...register("name")}
          onChange={handleNameChange}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="flex-1">
        <Input
          placeholder="slug"
          {...register("slug")}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
        {errors.slug && (
          <p className="text-xs text-red-400 mt-1">{errors.slug.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-violet-600 hover:bg-violet-700 text-white"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        {isPending ? "Adding…" : "Add"}
      </Button>
    </form>
  )
}
