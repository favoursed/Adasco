<template>
  <header class="site-header" :class="{ scrolled: isScrolled }" id="siteHeader">
    <div class="container">
      <!-- Brand Logo -->
      <router-link to="/" class="brand-logo-link" aria-label="Adasco Synergy Limited Home">
        <img src="/assets/logo-horizontal.svg" alt="Adasco Synergy Limited Logo" width="220" height="52">
      </router-link>

      <!-- Desktop & Mobile Navigation Menu -->
      <nav class="main-nav" :class="{ 'mobile-open': mobileMenuOpen }" aria-label="Main Navigation">
        <ul class="nav-list">
          <li>
            <router-link to="/" class="nav-link" :class="{ active: route.path === '/' }" @click="closeMobile">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/services" class="nav-link" :class="{ active: route.path === '/services' }" @click="closeMobile">
              Services
            </router-link>
          </li>
          <li>
            <router-link to="/products" class="nav-link" :class="{ active: route.path === '/products' }" @click="closeMobile">
              Products
            </router-link>
          </li>
          <li>
            <router-link to="/projects" class="nav-link" :class="{ active: route.path === '/projects' }" @click="closeMobile">
              Projects
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-link" :class="{ active: route.path === '/about' }" @click="closeMobile">
              About Us
            </router-link>
          </li>
          <li>
            <router-link to="/contact" class="nav-link" :class="{ active: route.path === '/contact' }" @click="closeMobile">
              Contact
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Action Items: Direct Hotline & Quote Button -->
      <div class="header-actions">
        <a href="tel:09066224148" class="header-hotline" title="Call Managing Director Shalom Ikeyah A.">
          <div class="hotline-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="hotline-text">
            <span class="hotline-label">Direct Line (MD)</span>
            <span class="hotline-number">0906 622 4148</span>
          </div>
        </a>

        <router-link to="/contact" class="btn btn-primary header-quote-btn" @click="closeMobile">
          <span>Get Quote</span>
          <svg class="quote-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </router-link>

        <button class="mobile-toggle" @click="toggleMobileMenu" :aria-expanded="mobileMenuOpen" aria-label="Toggle navigation menu">
          <svg v-if="!mobileMenuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Dim Backdrop -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="mobile-menu-backdrop" @click="closeMobile"></div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobile = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
