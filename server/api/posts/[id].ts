import { getPostById, updatePost, deletePost } from '~/lib/prisma'
import type { UpdatePostInput } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Missing post ID'
    })
  }

  if (event.method === 'GET') {
    try {
      const post = await getPostById(id)
      if (!post) {
        throw createError({
          statusCode: 404,
          message: 'Post not found'
        })
      }
      return post
    } catch (error) {
      console.error('Failed to fetch post:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch post'
      })
    }
  }

  if (event.method === 'PUT') {
    try {
      const body = await readBody(event)
      const post = await updatePost(id, body as UpdatePostInput)
      return post
    } catch (error) {
      console.error('Failed to update post:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to update post'
      })
    }
  }

  if (event.method === 'DELETE') {
    try {
      await deletePost(id)
      return null
    } catch (error) {
      console.error('Failed to delete post:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to delete post'
      })
    }
  }
}) 