import { z } from "zod"

export const authorBioSchema = z.object({
  profile: z.object({
    username: z.string(),
    bio: z.null(),
    image: z.string(),
    following: z.boolean()
  })
})
