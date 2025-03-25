<script setup lang="ts">
interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  created_at: Date
  author: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
}

const props = defineProps<{
  post: Post
}>()

const formattedDate = computed(() => {
  return new Date(props.post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <article class="group">
    <div class="relative overflow-hidden">
      <div class="aspect-[16/9] bg-gray-100">
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="mt-6">
      <div class="flex items-center text-sm text-gray-500 mb-2">
        <time>{{ formattedDate }}</time>
        <span class="mx-2">•</span>
        <span class="font-medium">{{ post.author.full_name || post.author.username }}</span>
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        <NuxtLink :to="'/posts/' + post.id">{{ post.title }}</NuxtLink>
      </h2>
      
      <p class="mt-3 text-gray-600 line-clamp-2">{{ post.content }}</p>
      
      <div class="mt-4">
        <NuxtLink 
          :to="'/posts/' + post.id"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Read more
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
 