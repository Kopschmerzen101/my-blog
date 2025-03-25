<script setup lang="ts">
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const searchQuery = ref('')
const selectedCategory = ref('')

const { data: posts } = await useAsyncData('posts', async () => {
  return await prisma.posts.findMany({
    where: {
      published: true
    },
    include: {
      author: true,
      category: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })
})

const { data: categories } = await useAsyncData('categories', async () => {
  return await prisma.categories.findMany({
    orderBy: {
      name: 'asc'
    }
  })
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  
  return posts.value.filter(post => {
    const matchesSearch = searchQuery.value === '' || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategory.value === '' || 
      post.category?.id === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <h1>Welcome to Nyamskie's Blog</h1>
      <p class="subtitle">Exploring technology, lifestyle, and creative insights from my personal journey</p>
      <NuxtLink to="/blog" class="cta-button">
        Read Articles
        <svg class="arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 15L13 10L8 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.hero {
  max-width: 800px;
}

.hero h1 {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--apple-dark) 0%, var(--apple-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.75rem;
  color: var(--apple-gray);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--apple-blue);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #004499;
  transform: translateY(-2px);
}

.arrow {
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }
}
</style> 