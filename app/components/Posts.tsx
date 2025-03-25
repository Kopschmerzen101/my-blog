'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/lib/prisma'

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              By {post.author?.username || 'Unknown'} on{' '}
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
} 