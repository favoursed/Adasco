<template>
  <div class="contact-page-view">
    <PageHeaderBanner 
      title="Contact Us & Get A Quote" 
      subtitle="Speak directly with our Managing Director or request a detailed factory bill of quantities (BOQ)."
      current="Contact"
    />
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import PageHeaderBanner from '../components/PageHeaderBanner.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>