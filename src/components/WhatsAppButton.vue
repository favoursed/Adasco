<template>
  <div>
    <!-- Floating WhatsApp Action -->
    <a 
      href="https://wa.me/2349066224148?text=Hello%20MD%20Shalom,%20I%20am%20reaching%20out%20from%20the%20Adasco%20Synergy%20website%20for%20a%20roofing%20inquiry." 
      target="_blank" 
      rel="noopener noreferrer" 
      class="floating-whatsapp-btn" 
      aria-label="Chat directly with Managing Director Shalom on WhatsApp"
    >
      <span class="whatsapp-tooltip">Chat with MD Shalom on WhatsApp</span>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.792s.448-1.272.607-1.446c.159-.175.346-.219.462-.219s.231.006.332.012c.106.006.248-.04.388.297.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.449.741.964 1.2 1.344 1.196 2.083 1.229 2.257 1.142.174-.087.549-.636.694-.853.144-.217.289-.174.491-.101.202.072 1.286.607 1.503.715.217.108.361.162.414.252.054.089.054.516-.09.921z"/>
      </svg>
    </a>

    <!-- Back to top button -->
    <button 
      class="back-to-top" 
      :class="{ visible: showBackToTop }" 
      @click="scrollToTop" 
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
