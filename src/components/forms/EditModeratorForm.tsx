"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { editModeratorSchema, type EditModeratorInput } from "@/lib/validations"
import { editModeratorAction } from "@/app/actions/moderators"
import { useToast } from "@/hooks/use-toast"

interface EditModeratorFormProps {
  moderator: { id: string; fullName: string; email: string }
}

export function EditModeratorForm({ moderator }: EditModeratorFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EditModeratorInput>({
    resolver: zodResolver(editModeratorSchema),
    defaultValues: {
      fullName: moderator.fullName,
      email: moderator.email,
      password: "",
    },
  })

  function onSubmit(data: EditModeratorInput) {
    startTransition(async () => {
      const result = await editModeratorAction(moderator.id, data)
      if (result.success) {
        toast({ title: "Moderator updated" })
        router.push("/admin/moderators")
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
        setError("root", { message: result.error })
      }
    })
  }

  return (
    <Card className="max-w-xl bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Edit Moderator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-300">Full Name</Label>
            <Input
              {...register("fullName")}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.fullName && (
              <p className="text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Email</Label>
            <Input
              {...register("email")}
              type="email"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300">
              New Password{" "}
              <span className="text-zinc-500 font-normal">(leave blank to keep current)</span>
            </Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Min. 8 characters"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-3 py-2">
              {errors.root.message}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
