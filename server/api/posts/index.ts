import { createPost, getPublishedPosts } from '~/lib/prisma'
import type { CreatePostInput } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    try {
      const posts = await getPublishedPosts()
      return posts
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch posts'
      })
    }
  }

  if (event.method === 'POST') {
    try {
      const body = await readBody(event)
      const post = await createPost(body as CreatePostInput)
      return post
    } catch (error) {
      console.error('Failed to create post:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to create post'
      })
    }
  }
}) 