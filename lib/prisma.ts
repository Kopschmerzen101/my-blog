import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Post types
export type Post = {
  id: string
  title: string | null
  content: string | null
  published: boolean
  created_at: Date
  updated_at: Date
  author_id: string
  author?: {
    id: string
    username: string | null
    full_name: string | null
    avatar_url: string | null
    website: string | null
  }
}

export type CreatePostInput = {
  title: string
  content: string
  author_id: string
  published?: boolean
}

export type UpdatePostInput = Partial<CreatePostInput>

// Post operations
export async function createPost(data: CreatePostInput): Promise<Post> {
  const now = new Date()
  return prisma.posts.create({
    data: {
      title: data.title,
      content: data.content,
      author_id: data.author_id,
      published: data.published ?? false,
      created_at: now,
      updated_at: now
    } as Prisma.postsCreateInput,
    include: {
      author: true
    }
  })
}

export async function getPublishedPosts(): Promise<Post[]> {
  return prisma.posts.findMany({
    where: {
      published: true
    } as Prisma.postsWhereInput,
    include: {
      author: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })
}

export async function getPostById(id: string): Promise<Post | null> {
  return prisma.posts.findUnique({
    where: { id },
    include: {
      author: true
    }
  })
}

export async function updatePost(id: string, data: UpdatePostInput): Promise<Post> {
  const now = new Date()
  return prisma.posts.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      updated_at: now
    } as Prisma.postsUpdateInput,
    include: {
      author: true
    }
  })
}

export async function deletePost(id: string) {
  return prisma.posts.delete({
    where: { id }
  })
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  return prisma.posts.findMany({
    where: {
      author_id: authorId
    } as Prisma.postsWhereInput,
    include: {
      author: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })
} 