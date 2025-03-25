import { NextResponse } from 'next/server'
import { createPost, getPublishedPosts } from '@/lib/prisma'
import type { CreatePostInput } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await getPublishedPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const post = await createPost(body as CreatePostInput)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 