<template>
  <section class="projects-section section-padding" id="projects">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-kicker">Verified Portfolios</span>
        <h2 class="section-title">Our Recent Works Across Lagos & Nigeria</h2>
        <p class="section-desc">
          Browse our flagship roofing installations across residential estates, commercial complexes, and industrial distribution centers in Lagos and nationwide.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="project-filter-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          type="button" 
          class="filter-btn" 
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Deck of Cards Sticky Stacking Container -->
      <div class="cards-deck-stack">
        <article 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="stacking-project-card"
          :style="{ 
            '--card-index': index,
            zIndex: index + 1
          }"
        >
          <!-- Left: Project Narrative & Technical Specs -->
          <div class="project-info-pane">
            <div class="project-card-header">
              <span class="project-type-badge">{{ project.badge }}</span>
              <span class="project-card-index">0{{ index + 1 }}</span>
            </div>

            <h3 class="project-card-title">{{ project.title }}</h3>

            <div class="project-location-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ project.location }}</span>
            </div>

            <p class="project-card-desc">
              {{ project.desc }}
            </p>

            <!-- Key Specifications Grid -->
            <div class="project-specs-grid">
              <div class="spec-cell">
                <span class="spec-label">Roof Profile</span>
                <span class="spec-val">{{ project.profile }}</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Tested Gauge</span>
                <span class="spec-val">{{ project.gauge }}</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Color Finish</span>
                <span class="spec-val">{{ project.color }}</span>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Roof Area</span>
                <span class="spec-val">{{ project.area }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <a 
              :href="`https://wa.me/2349066224148?text=Hello%20MD%20Shalom,%20I%20am%20interested%20in%20a%20roofing%20project%20similar%20to%20your%20${encodeURIComponent(project.title)}%20at%20${encodeURIComponent(project.location)}`" 
              target="_blank" 
              rel="noopener"
              class="project-inquire-cta"
            >
              <span>Inquire About Similar Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>

          <!-- Right: Believable High-Definition Project Photography -->
          <div class="project-photo-pane">
            <img 
              :src="project.image" 
              :alt="project.title + ' in ' + project.location"
              loading="lazy"
              width="688"
              height="440"
            />
            <div class="photo-overlay-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Verified Adasco Installation</span>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'residential', label: 'Residential & Estates' },
  { id: 'commercial', label: 'Commercial Plazas' },
  { id: 'industrial', label: 'Industrial Warehouses' },
  { id: 'stone-coated', label: 'Stone Coated Tiles' }
]

const projects = [
  {
    id: 1,
    title: 'Luxury 5-Bedroom Duplex Roofing',
    category: 'residential',
    badge: 'Residential Flagship',
    image: '/assets/project-duplex-lekki.jpg',
    location: 'Lekki Phase 1 / Ibeju-Lekki, Lagos',
    desc: 'Precision machine-corrugated royal blue steptile aluminium profiles installed with anti-leak valley gutters and eaves flashings, engineered for coastal oceanfront durability.',
    profile: 'Steptiles Aluminium',
    gauge: '0.55mm Tested Gauge',
    color: 'Deep Royal Blue Gloss',
    area: '720 m² Roof Area'
  },
  {
    id: 2,
    title: 'Contemporary Suburban Country Bungalow',
    category: 'residential',
    badge: 'Suburban Residential',
    image: '/assets/project-bungalow-suburban.jpg',
    location: 'Ikorodu / Ogun Border Suburb, Lagos',
    desc: 'Textured dark charcoal stone-coated shingle tiles installed on treated timber structure, featuring soundproofing acoustic comfort and deep perimeter rainwater gutters.',
    profile: 'Stone-Coated Shingle',
    gauge: '0.50mm Anti-Rust',
    color: 'Volcanic Charcoal Black',
    area: '480 m² Roof Area'
  },
  {
    id: 3,
    title: 'Logistics Distribution & Cargo Hub',
    category: 'industrial',
    badge: 'Heavy Industrial',
    image: '/assets/project-warehouse-ikeja.jpg',
    location: 'Ikeja Industrial Estate, Lagos',
    desc: 'Heavy-duty 0.70mm continuous single-sheet longspan aluminium corrugated profiling engineered to eliminate intermediate joints and withstand high wind loads.',
    profile: 'Industrial Longspan',
    gauge: '0.70mm Heavy Duty',
    color: 'Silver-Grey Mill Finish',
    area: '2,400 m² Facility'
  },
  {
    id: 4,
    title: 'Multi-Storey Commercial Shopping Complex',
    category: 'commercial',
    badge: 'Commercial Plaza',
    image: '/assets/project-plaza-commercial.jpg',
    location: 'Ikeja / Surulere Commercial District, Lagos',
    desc: 'Vibrant deep wine red Metcopo step-tile aluminium profiles integrated with parapet cap flashings and exterior aluminium composite architectural wall cladding.',
    profile: 'Metcopo Step-Tile',
    gauge: '0.55mm Gauge',
    color: 'Deep Wine Red',
    area: '1,150 m² Complex'
  },
  {
    id: 5,
    title: 'Twin Luxury Semi-Detached Duplexes',
    category: 'stone-coated',
    badge: 'Private Gated Estate',
    image: '/assets/project-estate-magodo.jpg',
    location: 'Magodo GRA Phase 2, Lagos',
    desc: 'Classic granulated interlocking stone-chip black tiles engineered with double-lock fastening to withstand torrential storms and intense tropical sunshine.',
    profile: 'Classic Stone-Coated',
    gauge: '0.50mm Interlocking',
    color: 'Natural Stone Black',
    area: '940 m² Twin Duplexes'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }
  return projects.filter(p => p.category === selectedCategory.value)
})
</script>
