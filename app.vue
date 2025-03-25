<template>
  <AppleLayout>
    <NuxtPage />
  </AppleLayout>
</template>

<style>
:root {
  --apple-blue: #0066cc;
  --apple-gray: #86868b;
  --apple-dark: #1d1d1f;
  --apple-light: #f5f5f7;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.5;
  color: var(--apple-dark);
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h1 {
  font-size: 3rem;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 2.5rem;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 2rem;
}

p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.6;
}

a {
  color: var(--apple-blue);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #004499;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}
</style>
