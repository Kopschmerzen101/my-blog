<template>
  <div class="about-page">
    <div class="about-content">
      <h1>About Me</h1>
      <div class="about-section">
        <div class="profile-image">
          <img src="/images/profile.jpg" alt="Nnyamah Chukwuebuka Emmanuel" />
        </div>
        <div class="bio">
          <h2>Nnyamah Chukwuebuka Emmanuel</h2>
          <p class="role">Software Developer</p>
          <div class="description">
            I am a passionate software developer with a keen interest in Linux and open-source technologies. 
            My journey in tech has been driven by a desire to create efficient, elegant solutions to complex problems.
          </div>
        </div>
        <div class="skills">
          <h3>Skills & Expertise</h3>
          <div class="skill-tags">
            <span class="skill-tag">Linux</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Git</span>
            <span class="skill-tag">Docker</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.about-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--apple-dark) 0%, var(--apple-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
}

.profile-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bio h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--apple-dark);
}

.role {
  color: var(--apple-blue);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--apple-gray);
}

.skills {
  grid-column: 1 / -1;
  margin-top: 2rem;
}

.skills h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--apple-dark);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: var(--apple-light);
  color: var(--apple-blue);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 1rem;
  }

  .about-content {
    padding: 2rem;
  }

  .about-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .bio h2 {
    font-size: 1.75rem;
  }
}
</style> 