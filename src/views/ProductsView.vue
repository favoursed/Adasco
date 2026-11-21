<template>
  <div class="products-page-view">
    <PageHeaderBanner 
      title="Aluminium & Roofing Products" 
      subtitle="Explore certified 0.45mm – 0.70mm gauges, stone-coated tiles, aluminium coils, and architectural ceiling fittings."
      current="Products"
    />
    <ProductCatalog />
    <ColorVisualizer />
    <QuoteSection @notify="$emit('notify', $event)" />
  </div>
</template>

<script setup>
import PageHeaderBanner from '../components/PageHeaderBanner.vue'
import ProductCatalog from '../components/ProductCatalog.vue'
import ColorVisualizer from '../components/ColorVisualizer.vue'
import QuoteSection from '../components/QuoteSection.vue'

defineEmits(['notify'])
</script>