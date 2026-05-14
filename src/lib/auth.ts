import "server-only"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
import { prisma } from "./prisma"
import { loginSchema } from "./validations"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user) return null

        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role as "ADMIN" | "MODERATOR",
          avatar: user.avatar ?? undefined,
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) {
        const u = user as {
          id: string
          role: "ADMIN" | "MODERATOR"
          fullName: string
          avatar?: string
        }
        token.id = u.id
        token.role = u.role
        token.fullName = u.fullName
        token.avatar = u.avatar
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as "ADMIN" | "MODERATOR"
        session.user.fullName = token.fullName as string
        session.user.avatar = token.avatar as string | undefined
      }
      return session
    },
  },
})
