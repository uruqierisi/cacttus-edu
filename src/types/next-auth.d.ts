import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      fullName: string
      role: "ADMIN" | "MODERATOR"
      avatar?: string
    }
  }

  interface User {
    id: string
    role: "ADMIN" | "MODERATOR"
    fullName: string
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "ADMIN" | "MODERATOR"
    fullName: string
    avatar?: string
  }
}
