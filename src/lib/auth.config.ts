import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const role = (auth?.user as { role?: string })?.role
      const { pathname } = nextUrl

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false
        if (role !== "ADMIN") {
          return Response.redirect(new URL("/dashboard", nextUrl))
        }
        return true
      }

      if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return false
        if (role !== "MODERATOR") {
          return Response.redirect(new URL("/admin", nextUrl))
        }
        return true
      }

      if (pathname === "/login" && isLoggedIn) {
        return Response.redirect(
          new URL(role === "ADMIN" ? "/admin" : "/dashboard", nextUrl)
        )
      }

      return true
    },
  },
  providers: [],
}
