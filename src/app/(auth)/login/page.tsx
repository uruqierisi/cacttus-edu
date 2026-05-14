"use client"

import { useFormState, useFormStatus } from "react-dom"
import Image from "next/image"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium h-11"
    >
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  )
}

export default function LoginPage() {
  const [error, formAction] = useFormState(loginAction, null)

  return (
    <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
      <CardHeader className="text-center pb-2 pt-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-14 h-14">
            <Image
              src="/cacttus.png"
              alt="Cacttus Education"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-zinc-400 text-sm mt-1">Sign in to your Cacttus account</p>
      </CardHeader>

      <CardContent className="pt-6 pb-8 px-8">
        <form action={formAction} className="space-y-4">
          {error && (
            <div className="bg-red-950/40 border border-red-900/60 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@cacttus.education"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 h-11"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-zinc-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 h-11"
            />
          </div>

          <SubmitButton />
        </form>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Access is restricted to authorized personnel only.
          <br />
          Contact an admin if you need access.
        </p>
      </CardContent>
    </Card>
  )
}
