<template>
  <article class="blog-card">
    <div class="image-container">
      <img :src="post.image" :alt="post.title" class="featured-image">
      <div class="overlay"></div>
    </div>
    <div class="content">
      <div class="meta">
        <span class="category">{{ post.category }}</span>
        <span class="date">{{ formatDate(post.date) }}</span>
      </div>
      <h2 class="title">{{ post.title }}</h2>
      <p class="excerpt">{{ post.excerpt }}</p>
      <NuxtLink :to="post.slug" class="read-more">
        Read more
        <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.featured-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .featured-image {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);
}

.content {
  padding: 2rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--apple-gray);
}

.category {
  color: var(--apple-blue);
  font-weight: 500;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--apple-dark);
}

.excerpt {
  color: var(--apple-gray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--apple-blue);
  font-weight: 500;
  text-decoration: none;
  transition: gap 0.3s ease;
}

.read-more:hover {
  gap: 0.75rem;
}

.arrow {
  transition: transform 0.3s ease;
}

.read-more:hover .arrow {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.25rem;
  }
}
</style> 