<template>
  <div class="toast-notice" :class="{ show: visible }">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})
</script>
