<template>
  <div class="about-page-view">
    <PageHeaderBanner 
      title="About Adasco Synergy Limited" 
      subtitle="Nigeria's premier specialist in machine-profiled aluminium roofing, stone-coated systems, and modern architectural finishes."
      current="About Us"
    />
    <AboutSection />
    <FloatingInfoStrip />
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import PageHeaderBanner from '../components/PageHeaderBanner.vue'
import AboutSection from '../components/AboutSection.vue'
import FloatingInfoStrip from '../components/FloatingInfoStrip.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>