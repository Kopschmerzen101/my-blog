import { prisma } from '~/lib/prisma'

export default defineEventHandler(async () => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch categories'
    })
  }
})
