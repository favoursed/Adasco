<template>
  <section class="color-swatch-section section-padding">
    <div class="container">
      <div class="swatch-display-box">
        
        <div 
          class="swatch-preview-roof" 
          :style="{ backgroundColor: activeColor.hex }"
        >
          <div class="roof-texture" style="background-image: url('/assets/product-longspan.jpg');"></div>
          <div style="position: absolute; bottom: 1.5rem; left: 1.5rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 0.6rem 1.2rem; border-radius: 8px; color: #FFF; border: 1px solid rgba(212,175,55,0.4);">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold-400); font-weight: 700;">Selected Color</div>
            <div style="font-weight: 800; font-size: 1.1rem;">{{ activeColor.name }}</div>
          </div>
        </div>

        <div class="swatch-picker-area">
          <span class="section-kicker">Interactive Color Palette</span>
          <h4>Preview Your Roof Tone in Real Time</h4>
          <p>Choose from our baked polyester oven-cured color catalogue with 25-year anti-fading warranty.</p>

          <div class="swatch-buttons-grid">
            <button 
              v-for="color in colors" 
              :key="color.name"
              type="button" 
              class="swatch-btn" 
              :class="{ active: activeColor.name === color.name }"
              @click="activeColor = color"
            >
              <span class="swatch-circle" :style="{ backgroundColor: color.hex }"></span>
              <span class="swatch-btn-label">{{ color.label }}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const colors = [
  { name: 'Burgundy / Wine Red', label: 'Wine Red', hex: '#63121B' },
  { name: 'Chocolate Brown', label: 'Chocolate', hex: '#3D2314' },
  { name: 'Charcoal Black', label: 'Charcoal', hex: '#1A1F26' },
  { name: 'Bush / Forest Green', label: 'Forest Green', hex: '#1B432C' },
  { name: 'Slate Grey', label: 'Slate Grey', hex: '#4B5563' },
  { name: 'Royal Ocean Blue', label: 'Ocean Blue', hex: '#0F3866' }
]

const activeColor = ref(colors[0])
</script>
