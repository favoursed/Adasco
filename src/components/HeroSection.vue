<template>
  <section class="hero-section" id="home">
    <div class="hero-bg-overlay"></div>
    <div class="hero-geometric-accent"></div>

    <div class="container">
      <div class="hero-grid">
        
        <!-- Left Hero Content: Optimized for Search Engines (SEO) & Conversions -->
        <div class="hero-content">
          <h1 class="hero-title">
            High-Grade Aluminium <br>
            <span class="text-gold">Roofing & Building Solutions</span>
          </h1>

          <p class="hero-desc">
            Adasco Synergy Limited is Lagos and Nigeria's foremost manufacturer and supplier of premium aluminium roofing sheets, corrugated longspan profiles, steptiles, stone-coated roofing tiles, suspended ceilings, and PVC systems. Engineered with certified 0.45mm – 0.70mm gauges for lasting durability, elegance, and extreme weather resilience.
          </p>

          <div class="hero-cta-group">
            <router-link to="/services" class="btn btn-primary btn-lg" title="Explore our aluminium roofing fabrication and installation services">
              <span>Our Roofing Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </router-link>
            <router-link to="/about" class="btn btn-secondary btn-lg" title="Learn more about Adasco Synergy Limited factory and leadership">
              <span>About Our Company</span>
            </router-link>
          </div>

          <div class="hero-specs-list">
            <div class="spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>0.45mm – 0.70mm Lab-Tested Gauges</span>
            </div>
            <div class="spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>100% Anti-Leak Roll Profiling</span>
            </div>
            <div class="spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Prompt Delivery Across Lagos & 36 States</span>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Floating 3D Model Viewer -->
        <div class="hero-viewer-wrapper">
          <Floating3DViewer />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import Floating3DViewer from './Floating3DViewer.vue'
</script>
