<script setup lang="ts">
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const route = useRoute()

const { data: post } = await useAsyncData('post', async () => {
  return await prisma.posts.findUnique({
    where: {
      id: route.params.id as string
    },
    include: {
      author: true,
      category: true
    }
  })
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to all posts
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article v-if="post" class="prose prose-lg max-w-none">
        <div class="flex items-center text-sm text-gray-500 mb-8">
          <time>{{ formattedDate }}</time>
          <span class="mx-2">•</span>
          <span class="font-medium">{{ post.author.full_name || post.author.username }}</span>
          <span v-if="post.category" class="mx-2">•</span>
          <span v-if="post.category" class="text-blue-600">{{ post.category.name }}</span>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ post.title }}</h1>

        <div class="aspect-[16/9] bg-gray-100 mb-8 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>

        <div class="prose prose-lg max-w-none">
          {{ post.content }}
        </div>

        <div class="mt-12 pt-8 border-t border-gray-200">
          <SocialShare
            :title="post.title"
            :url="'/posts/' + post.id"
          />
        </div>
      </article>
      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">Loading post...</p>
      </div>
    </main>
  </div>
</template> 