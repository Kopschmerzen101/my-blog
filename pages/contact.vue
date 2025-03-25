<template>
  <div class="contact-page">
    <div class="contact-content">
      <h1>Get in Touch</h1>
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Let's Connect</h2>
          <p class="description">
            Have a question or want to collaborate? I'd love to hear from you. Fill out the form or reach out through any of the channels below.
          </p>
          <div class="social-links">
            <a v-for="link in socialLinks" 
               :key="link.name" 
               :href="link.url" 
               target="_blank" 
               rel="noopener noreferrer"
               class="social-link">
              <component :is="link.icon" class="icon" />
              {{ link.name }}
            </a>
          </div>
        </div>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Your name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="your@email.com"
            />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              required
              placeholder="What's this about?"
            />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required
              rows="5"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button type="submit" class="submit-button" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Message' }}
          </button>
          <p v-if="success" class="success-message">
            Thank you for your message! I'll get back to you soon.
          </p>
          <p v-if="error" class="error-message">
            {{ error }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const success = ref(false)
const error = ref('')

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/nyamskie',
    icon: defineComponent({
      template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>`
    })
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/nyamskie',
    icon: defineComponent({
      template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>`
    })
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/nyamskie',
    icon: defineComponent({
      template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>`
    })
  }
]

const handleSubmit = async () => {
  loading.value = true
  success.value = false
  error.value = ''

  try {
    const { error: submitError } = await useSupabaseClient()
      .from('contact_messages')
      .insert([{
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
        created_at: new Date().toISOString()
      }])

    if (submitError) throw submitError

    success.value = true
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (e) {
    error.value = 'Failed to send message. Please try again later.'
    console.error('Error submitting form:', e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-page {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-content {
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--apple-dark);
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--apple-gray);
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--apple-blue);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #004499;
}

.icon {
  width: 24px;
  height: 24px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: var(--apple-dark);
}

input, textarea {
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--apple-blue);
}

.submit-button {
  background: var(--apple-blue);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background: #004499;
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  color: #28a745;
  text-align: center;
}

.error-message {
  color: #dc3545;
  text-align: center;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 2rem 1rem;
  }

  .contact-content {
    padding: 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .contact-info h2 {
    font-size: 1.75rem;
  }
}
</style> 