import { z } from "zod"

export const articleListSchema = z.object({
  articles: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      body: z.string(),
      tagList: z.array(z.string()),
      createdAt: z.string(),
      updatedAt: z.string(),
      favorited: z.boolean(),
      favoritesCount: z.number(),
      author: z.object({
        username: z.string(),
        bio: z.null(),
        image: z.string(),
        following: z.boolean()
      })
    })
  ),
  articlesCount: z.number()
})

export const tagsSchema = z.object({
  tags:z.array(z.string())
}) 

export const articleSingleSchema = z.object({
  article: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    body: z.string(),
    tagList: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    favorited: z.boolean(),
    favoritesCount: z.number(),
    author: z.object({
      username: z.string(),
      bio: z.string().nullable(),
      image: z.string(),
      following: z.boolean()
    })
  })
})


export const commentsSchema = z.object({
  comments: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      body: z.string(),
      author: z.object({
        username: z.string(),
        bio: z.null(),
        image: z.string(),
        following: z.boolean()
      })
    })
  )
}).optional()

