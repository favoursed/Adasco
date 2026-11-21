<template>
  <section class="page-header-banner">
    <div class="page-header-overlay"></div>
    <div class="container">
      <div class="page-header-content">
        <div class="page-breadcrumb">
          <router-link to="/">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ current }}</span>
        </div>
        <h1 class="page-header-title">{{ title }}</h1>
        <p v-if="subtitle" class="page-header-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  current: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.page-header-banner {
  position: relative;
  background-color: var(--navy-900);
  background-image: 
    linear-gradient(135deg, rgba(6, 17, 36, 0.94) 0%, rgba(10, 25, 47, 0.88) 100%),
    url('/assets/modern-building-facade.jpg');
  background-size: cover;
  background-position: center;
  padding: 4.5rem 0 3.5rem;
  overflow: hidden;
  border-bottom: 2px solid rgba(212, 175, 55, 0.25);
}

.page-header-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.page-header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.page-breadcrumb a {
  color: var(--gold-400);
  transition: color var(--transition-fast);
}

.page-breadcrumb a:hover {
  color: var(--white);
}

.breadcrumb-separator {
  color: var(--slate-400);
}

.breadcrumb-current {
  color: var(--slate-300);
}

.page-header-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  font-weight: 900;
  color: var(--white);
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
}

.page-header-subtitle {
  font-size: clamp(0.98rem, 1.2vw, 1.12rem);
  color: var(--slate-300);
  line-height: 1.6;
}
</style>