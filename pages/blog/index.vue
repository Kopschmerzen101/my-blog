<template>
  <div class="blog-page">
    <div class="hero">
      <h1>Blog</h1>
      <p class="subtitle">Insights, stories, and updates from the WeDance community</p>
    </div>

    <div class="blog-grid">
      <BlogCard
        v-for="post in posts"
        :key="post.slug"
        :post="post"
        class="blog-card"
      />
    </div>
  </div>
</template>

<script setup>
// This would typically come from your CMS or API
const posts = [
  {
    title: "The Art of Dance: Finding Your Rhythm",
    excerpt: "Discover how to connect with your inner rhythm and express yourself through movement.",
    image: "/images/dance-rhythm.jpg",
    category: "Dance Tips",
    date: "2024-03-24",
    slug: "/blog/art-of-dance"
  },
  {
    title: "Building Community Through Dance",
    excerpt: "How dance brings people together and creates lasting connections.",
    image: "/images/community-dance.jpg",
    category: "Community",
    date: "2024-03-23",
    slug: "/blog/community-dance"
  },
  // Add more posts as needed
]
</script>

<style scoped>
.blog-page {
  padding: 4rem 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--apple-dark) 0%, var(--apple-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--apple-gray);
  max-width: 600px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .blog-page {
    padding: 2rem 1rem;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style> 