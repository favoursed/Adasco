<template>
  <div class="home-view">
    <!-- Hero Section with Interactive 3D Model Viewer -->
    <HeroSection />

    <!-- Floating Quick Info Strip -->
    <FloatingInfoStrip />

    <!-- Services & Products Grid -->
    <ServicesSection />

    <!-- About & Technical Superiority -->
    <AboutSection />

    <!-- Real Inventory Products Catalog -->
    <ProductCatalog />

    <!-- Recent Works / Portfolio Gallery -->
    <ProjectGallery />

    <!-- Interactive Color Visualizer -->
    <ColorVisualizer />

    <!-- Quote Request Form & Office Contact -->
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import FloatingInfoStrip from '../components/FloatingInfoStrip.vue'
import ServicesSection from '../components/ServicesSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProductCatalog from '../components/ProductCatalog.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import ColorVisualizer from '../components/ColorVisualizer.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>
