import { z } from "zod"

export const signupSchema = z.union([z.object({
  user: z.object({
    email: z.string(),
    username: z.string(),
    bio: z.null(),
    image: z.string(),
    token: z.string()
  })
}), z.object({
    errors: z.union([z.object({ email: z.array(z.string()) }), z.object({ username: z.array(z.string()) })])
  })])
