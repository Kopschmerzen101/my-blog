import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create a test profile
    const profile = await prisma.profiles.create({
      data: {
        username: 'testuser',
        full_name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
        website: 'https://example.com'
      }
    })
    console.log('Created profile:', profile)

    // Create a test post
    const post = await prisma.posts.create({
      data: {
        title: 'Test Post',
        content: 'This is a test post',
        published: true,
        author_id: profile.id
      }
    })
    console.log('Created post:', post)

    // Get all posts with authors
    const posts = await prisma.posts.findMany({
      include: {
        author: true
      }
    })
    console.log('All posts:', posts)
  } catch (error) {
    console.error('Database operation error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 