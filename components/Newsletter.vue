<script setup lang="ts">
const email = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!email.value) {
    error.value = 'Please enter your email address'
    return
  }

  try {
    isSubmitting.value = true
    error.value = ''
    
    // Here you would typically send the email to your newsletter service
    // For now, we'll just simulate a successful subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    isSuccess.value = true
    email.value = ''
  } catch (e) {
    error.value = 'Failed to subscribe. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-gray-50 rounded-lg p-6">
    <h3 class="text-lg font-medium text-gray-900">Subscribe to our newsletter</h3>
    <p class="mt-2 text-sm text-gray-500">Get the latest posts delivered right to your inbox.</p>
    
    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="flex gap-2">
        <input
          v-model="email"
          type="email"
          class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your email"
        >
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
        </button>
      </div>
      
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      <p v-if="isSuccess" class="mt-2 text-sm text-green-600">Successfully subscribed!</p>
    </form>
  </div>
</template> 