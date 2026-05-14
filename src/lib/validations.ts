import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const createModeratorSchema = z.object({
  fullName: z.string().min(2, "Full name too short").max(100),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const editModeratorSchema = z.object({
  fullName: z.string().min(2, "Full name too short").max(100),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .optional()
    .or(z.literal("")),
})

export const createPostSchema = z.object({
  title: z.string().min(3, "Title too short").max(200),
  slug: z.string().min(3, "Slug too short").max(200),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  content: z.string().min(10, "Content too short"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.boolean(),
  categoryId: z.string().optional().or(z.literal("")),
})

export const categorySchema = z.object({
  name: z.string().min(2, "Name too short").max(50),
  slug: z.string().min(2, "Slug too short").max(50),
})

export type LoginInput = z.infer<typeof loginSchema>
export type CreateModeratorInput = z.infer<typeof createModeratorSchema>
export type EditModeratorInput = z.infer<typeof editModeratorSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type CategoryInput = z.infer<typeof categorySchema>
