<script setup lang="ts">
const props = defineProps<{
  title: string
  url: string
}>()

const shareUrl = computed(() => {
  if (process.client) {
    return window.location.origin + props.url
  }
  return props.url
})

const shareLinks = computed(() => ({
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(shareUrl.value)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`,
  linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(props.title)}`,
  email: `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(shareUrl.value)}`
}))

function copyToClipboard() {
  if (process.client) {
    navigator.clipboard.writeText(shareUrl.value)
  }
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <span class="text-sm text-gray-500">Share:</span>
    
    <a
      :href="shareLinks.twitter"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-400 hover:text-blue-400"
      title="Share on Twitter"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
      </svg>
    </a>
    
    <a
      :href="shareLinks.facebook"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-400 hover:text-blue-600"
      title="Share on Facebook"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>
    </a>
    
    <a
      :href="shareLinks.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-400 hover:text-blue-700"
      title="Share on LinkedIn"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>
    
    <a
      :href="shareLinks.email"
      class="text-gray-400 hover:text-gray-600"
      title="Share via Email"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    </a>
    
    <button
      @click="copyToClipboard"
      class="text-gray-400 hover:text-gray-600"
      title="Copy link"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
      </svg>
    </button>
  </div>
</template> 