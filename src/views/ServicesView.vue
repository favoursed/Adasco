<template>
  <div class="services-page-view">
    <PageHeaderBanner 
      title="Our Engineering & Roofing Services" 
      subtitle="From high-precision roll profiling to stone-coated installations and suspended ceilings, we deliver engineered durability."
      current="Services"
    />
    <ServicesSection />
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import PageHeaderBanner from '../components/PageHeaderBanner.vue'
import ServicesSection from '../components/ServicesSection.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>