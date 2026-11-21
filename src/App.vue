<template>
  <div class="adasco-app">
    <!-- Top Announcement Bar -->
    <TopBar />

    <!-- Sticky Main Header -->
    <SiteHeader />

    <!-- Vue Router View with Smooth Transitions -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" @notify="triggerToast" />
        </transition>
      </router-view>
    </main>

    <!-- Site Footer -->
    <SiteFooter />

    <!-- Floating WhatsApp Widget & Back To Top -->
    <WhatsAppButton />

    <!-- Global Toast Notice -->
    <ToastNotice :visible="toastVisible" :message="toastMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import ToastNotice from './components/ToastNotice.vue'

const toastVisible = ref(false)
const toastMessage = ref('')
let toastTimer = null

const triggerToast = (msg) => {
  toastMessage.value = msg
  toastVisible.value = true

  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 4000)
}
</script>

<style>
/* Page transition effects */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
