<script setup lang="ts">
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  published: false
})

const isSubmitting = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!form.title || !form.content) {
    error.value = 'Please fill in all required fields'
    return
  }

  try {
    isSubmitting.value = true
    error.value = ''

    // For now, we'll use a hardcoded author ID. In a real app, this would come from auth
    const authorId = 'e2e46659-c430-4622-8531-53e6d73437bc' // ID from our test profile

    const post = await prisma.posts.create({
      data: {
        title: form.title,
        content: form.content,
        published: form.published,
        author_id: authorId
      }
    })

    router.push(`/posts/${post.id}`)
  } catch (e) {
    error.value = 'Failed to create post. Please try again.'
    console.error('Error creating post:', e)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter post title"
        >
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content *</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="8"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your post content here..."
        ></textarea>
      </div>

      <div class="flex items-center">
        <input
          id="published"
          v-model="form.published"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        >
        <label for="published" class="ml-2 block text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

      <div class="flex items-center justify-between pt-4">
        <NuxtLink 
          to="/"
          class="text-gray-600 hover:text-gray-800 font-medium"
        >
          Cancel
        </NuxtLink>
        
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Creating...' : 'Create Post' }}
        </button>
      </div>
    </form>
  </div>
</template> 