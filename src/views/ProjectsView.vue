<template>
  <div class="projects-page-view">
    <PageHeaderBanner 
      title="Landmark Projects & Gallery" 
      subtitle="View our completed residential estates, commercial plazas, and industrial warehouses built across Nigeria."
      current="Projects"
    />
    <ProjectGallery />
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import PageHeaderBanner from '../components/PageHeaderBanner.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>