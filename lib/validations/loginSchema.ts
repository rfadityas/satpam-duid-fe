import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(5, "Password minimal 5 karakter"),
})