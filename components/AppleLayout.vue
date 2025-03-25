<template>
  <div class="apple-layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">Nyamskie's Blog</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/blog" class="nav-link">Blog</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Nyamskie's Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.apple-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #1d1d1f;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #0066cc;
}

.main-content {
  flex: 1;
  margin-top: 4rem;
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.footer {
  padding: 2rem;
  text-align: center;
  background-color: #f5f5f7;
  color: #86868b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style> 