<template>
  <section class="quote-section section-padding" id="contact">
    <span id="quote" style="display:block; position:relative; top:-90px; visibility:hidden;"></span>
    <div class="hero-geometric-accent"></div>
    <div class="container">
      <div class="quote-grid">
        
        <!-- Left: Contact Details & Office Address from Business Card -->
        <div class="quote-info-col">
          <span class="section-kicker" style="color: var(--gold-400);">Direct Factory Inquiries</span>
          <h2>Request A Free Quote Or Site Measurement</h2>
          <p>
            Whether you need a full bundle estimate, on-site laser measurements, or architectural consultation, our team and Managing Director are ready to assist you immediately.
          </p>

          <div class="contact-card-list">
            
            <!-- Address Item -->
            <div class="contact-item-card">
              <div class="contact-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="contact-item-details">
                <h4>Office & Factory Address</h4>
                <p>52, Oshundairo Str, Off Oyewole Street, Agege, Lagos State, Nigeria</p>
              </div>
            </div>

            <!-- Telephone Item -->
            <div class="contact-item-card">
              <div class="contact-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div class="contact-item-details">
                <h4>Phone Hotlines (Call / WhatsApp)</h4>
                <p>
                  <a href="tel:09066224148"><strong>09066224148</strong></a> (MD Shalom Ikeyah A.)<br>
                  <a href="tel:08088338658"><strong>08088338658</strong></a> (Factory Desk)
                </p>
              </div>
            </div>

            <!-- Working Hours -->
            <div class="contact-item-card">
              <div class="contact-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="contact-item-details">
                <h4>Working Hours</h4>
                <p>Monday – Saturday: 8:00 AM – 6:00 PM<br>Sunday: Closed (Emergency site bookings available)</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Promina Interactive Quote Form -->
        <div class="quote-form-card">
          <div class="quote-form-header">
            <h3>Send A Quote Request</h3>
            <p>Fill out the details below for a quick response within 30 minutes.</p>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="clientName">Full Name *</label>
                <input 
                  type="text" 
                  id="clientName" 
                  v-model="form.name"
                  class="form-control" 
                  placeholder="e.g. Arc. Babatunde Johnson" 
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label" for="clientPhone">Phone Number / WhatsApp *</label>
                <input 
                  type="tel" 
                  id="clientPhone" 
                  v-model="form.phone"
                  class="form-control" 
                  placeholder="e.g. 0803 123 4567" 
                  required
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="projectLocation">Project Location / City *</label>
                <input 
                  type="text" 
                  id="projectLocation" 
                  v-model="form.location"
                  class="form-control" 
                  placeholder="e.g. Lekki, Lagos or Ibadan" 
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label" for="serviceSelect">Required Product / Service *</label>
                <select id="serviceSelect" v-model="form.service" class="form-control" required>
                  <option value="Long Span Aluminium Roofing">Long Span Aluminium Roofing</option>
                  <option value="Steptiles & Metcopo Sheets">Steptiles & Metcopo Sheets</option>
                  <option value="Stone Coated Roofing Tiles">Stone Coated Roofing Tiles</option>
                  <option value="Suspended Ceilings & POP">Suspended Ceilings & POP</option>
                  <option value="PVC Ceilings & Cladding">PVC Ceilings & Cladding</option>
                  <option value="Full Turnkey Installation">Full Turnkey Installation</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="projectDetails">Roof Details / Special Instructions</label>
              <textarea 
                id="projectDetails" 
                v-model="form.details"
                class="form-control" 
                placeholder="Specify roof gauge (e.g. 0.50mm), estimated size, preferred color, or request a technician to visit for measurements."
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
              <span>Submit Quote & Send via WhatsApp</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['notify'])

const form = reactive({
  name: '',
  phone: '',
  location: '',
  service: 'Long Span Aluminium Roofing',
  details: ''
})

const handleSubmit = () => {
  if (!form.name || !form.phone || !form.location) {
    emit('notify', 'Please fill out all required fields.')
    return
  }

  const text = `Hello MD Shalom (Adasco Synergy Limited),%0A%0ANew Quote Request from Website:%0A• Client Name: ${encodeURIComponent(form.name)}%0A• Phone / WhatsApp: ${encodeURIComponent(form.phone)}%0A• Location: ${encodeURIComponent(form.location)}%0A• Service Required: ${encodeURIComponent(form.service)}%0A• Details: ${encodeURIComponent(form.details || 'Standard site inspection requested.')}%0A%0APlease get in touch with me.`
  
  const url = `https://wa.me/2349066224148?text=${text}`
  emit('notify', 'Quote received! Opening direct chat with MD Shalom...')

  setTimeout(() => {
    window.open(url, '_blank')
    form.name = ''
    form.phone = ''
    form.location = ''
    form.details = ''
  }, 700)
}
</script>
