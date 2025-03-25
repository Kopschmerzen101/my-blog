<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Post } from '~/lib/prisma'

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchPosts() {
  try {
    const { data } = await useFetch('/api/posts')
    posts.value = data.value as Post[]
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Blog Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
    <div v-else class="grid gap-4">
      <article v-for="post in posts" :key="post.id" class="p-4 border rounded-lg">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="mt-2 text-gray-600">{{ post.content }}</p>
        <div class="mt-2 text-sm text-gray-500">
          By {{ post.author?.username || 'Unknown' }} on
          {{ new Date(post.created_at).toLocaleDateString() }}
        </div>
      </article>
    </div>
  </div>
</template> 