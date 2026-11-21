<template>
  <footer class="site-footer">
    <div class="hero-geometric-accent"></div>
    <div class="container">
      <div class="footer-grid">
        
        <!-- Col 1: Brand & Bio -->
        <div class="footer-brand-col">
          <router-link to="/" class="footer-logo-link">
            <img src="/assets/logo-horizontal.svg" alt="Adasco Synergy Limited" width="220" height="52">
          </router-link>
          <p class="footer-brand-desc">
            Adasco Synergy Limited is a registered Nigerian enterprise specializing in high-quality aluminium roofing sheets, stone-coated tiles, suspended ceilings, and architectural contracting.
          </p>
          <div style="font-size: 0.85rem; color: var(--gold-400); font-weight: 700;">
            Managing Director: Shalom Ikeyah A.
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links-list">
            <li class="footer-link-item"><router-link to="/">Home</router-link></li>
            <li class="footer-link-item"><router-link to="/services">Our Services</router-link></li>
            <li class="footer-link-item"><router-link to="/products">Our Products</router-link></li>
            <li class="footer-link-item"><router-link to="/projects">Recent Works</router-link></li>
            <li class="footer-link-item"><router-link to="/about">About Us</router-link></li>
            <li class="footer-link-item"><router-link to="/contact">Request A Quote</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Product Offerings -->
        <div>
          <h4 class="footer-heading">Our Products</h4>
          <ul class="footer-links-list">
            <li class="footer-link-item"><router-link to="/products">Long Span Aluminium</router-link></li>
            <li class="footer-link-item"><router-link to="/products">Step-tiles & Metcopo</router-link></li>
            <li class="footer-link-item"><router-link to="/products">Stone Coated Tiles</router-link></li>
            <li class="footer-link-item"><router-link to="/products">Aluminium Coils & Trims</router-link></li>
            <li class="footer-link-item"><router-link to="/products">Suspended Ceilings</router-link></li>
            <li class="footer-link-item"><router-link to="/products">PVC Wall & Eaves Cladding</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Contact Info -->
        <div>
          <h4 class="footer-heading">Factory & Office</h4>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>52, Oshundairo Str, Off Oyewole Street, Agege, Lagos State, Nigeria</span>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>09066224148 / 08088338658</span>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

      </div>

      <div class="footer-bottom-bar">
        <div class="container">
          <div>
            &copy; {{ currentYear }} <strong>Adasco Synergy Limited</strong>. All Rights Reserved.
          </div>
          <div style="color: var(--slate-400); font-size: 0.82rem;">
            RC Registered Nigerian Company | Managing Director: Shalom Ikeyah A.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
