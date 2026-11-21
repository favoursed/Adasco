/**
 * ADASCO SYNERGY LIMITED - Interactive Engine
 * Handling Calculator, Color Visualizer, Project Filters, Nav, & WhatsApp Integrations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Sticky Header & Back-To-Top Toggle
  // =========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const currentYearSpan = document.getElementById('currentYear');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky styling
    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Scroll spy for navigation
    updateActiveNavLink();
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 2. Navigation Active State (ScrollSpy) & Smooth Scroll
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let currentId = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.style.display === 'flex';
      if (isOpen) {
        mainNav.style.display = '';
        mainNav.style.position = '';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '100%';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.background = 'rgba(6, 17, 36, 0.98)';
        mainNav.style.padding = '1.5rem';
        mainNav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
        mainNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 868) {
          mainNav.style.display = '';
        }
      });
    });
  }

  // =========================================================================
  // 3. Interactive Roofing Cost Estimator & Material Calculator
  // =========================================================================
  const roofAreaSlider = document.getElementById('roofAreaSlider');
  const lblArea = document.getElementById('lblArea');
  const lblBuildingType = document.getElementById('lblBuildingType');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const profileRadios = document.querySelectorAll('input[name="roofProfile"]');
  const gaugeRadios = document.querySelectorAll('input[name="gaugeThickness"]');

  // Result display elements
  const resArea = document.getElementById('resArea');
  const resProfile = document.getElementById('resProfile');
  const resGauge = document.getElementById('resGauge');
  const resSheets = document.getElementById('resSheets');
  const resAccessories = document.getElementById('resAccessories');
  const resTotalPrice = document.getElementById('resTotalPrice');
  const btnSendWhatsAppQuote = document.getElementById('btnSendWhatsAppQuote');

  // Base pricing parameters (Naira per m²)
  const profileConfig = {
    longspan: {
      name: 'Long Span Aluminium',
      baseRate: 4800,
      sheetCoverage: 3.0 // approx 3m avg sheet
    },
    steptiles: {
      name: 'Step-Tile Profile',
      baseRate: 5400,
      sheetCoverage: 2.8
    },
    metcopo: {
      name: 'Metcopo Profile',
      baseRate: 5200,
      sheetCoverage: 2.9
    },
    stonetile: {
      name: 'Stone Coated Tile',
      baseRate: 6800,
      sheetCoverage: 0.5 // small individual tile pieces
    }
  };

  const gaugeMultiplier = {
    '0.45': 1.0,
    '0.50': 1.15,
    '0.55': 1.32,
    '0.70': 1.65
  };

  function calculateRoofEstimate() {
    const area = parseInt(roofAreaSlider.value, 10);
    const selectedProfileVal = document.querySelector('input[name="roofProfile"]:checked')?.value || 'longspan';
    const selectedGaugeVal = document.querySelector('input[name="gaugeThickness"]:checked')?.value || '0.45';

    const profileData = profileConfig[selectedProfileVal];
    const multiplier = gaugeMultiplier[selectedGaugeVal] || 1.0;

    // Estimate number of sheets / tiles
    let pieceCount = 0;
    let pieceUnit = 'Sheets';
    if (selectedProfileVal === 'stonetile') {
      pieceCount = Math.round(area * 2.2); // approx 2.2 tiles per m2
      pieceUnit = 'Tiles';
    } else {
      pieceCount = Math.round(area / profileData.sheetCoverage);
      pieceUnit = 'Sheets (approx 3m)';
    }

    // Estimate accessories (ridge caps, flashing, screws)
    const ridgeCount = Math.max(12, Math.round(area * 0.08));

    // Calculate Estimated Cost
    const ratePerSqm = profileData.baseRate * multiplier;
    const baseCost = area * ratePerSqm;
    const accessoriesCost = ridgeCount * 5500 + 45000; // ridges + screws/sealants
    const minTotal = Math.round(baseCost + accessoriesCost);
    const maxTotal = Math.round(minTotal * 1.15); // tolerance for waste cut

    // Update UI elements
    lblArea.textContent = `${area} m²`;
    resArea.textContent = `${area} m²`;
    resProfile.textContent = profileData.name;
    resGauge.textContent = `${selectedGaugeVal} mm ${selectedGaugeVal === '0.45' ? 'Standard' : (selectedGaugeVal === '0.70' ? 'Heavy Industrial' : 'Premium')}`;
    resSheets.textContent = `~${pieceCount.toLocaleString()} ${pieceUnit}`;
    resAccessories.textContent = `~${ridgeCount} Ridge Caps + Sealing Kit`;
    resTotalPrice.textContent = `₦${minTotal.toLocaleString()} – ₦${maxTotal.toLocaleString()}`;

    return {
      area,
      profile: profileData.name,
      gauge: selectedGaugeVal,
      sheets: `${pieceCount} ${pieceUnit}`,
      ridges: ridgeCount,
      minPrice: minTotal.toLocaleString(),
      maxPrice: maxTotal.toLocaleString()
    };
  }

  // Event Listeners for Estimator Controls
  roofAreaSlider.addEventListener('input', () => {
    calculateRoofEstimate();
    // Update active preset if matches
    presetBtns.forEach(btn => {
      if (parseInt(btn.dataset.area, 10) === parseInt(roofAreaSlider.value, 10)) {
        btn.classList.add('active');
        lblBuildingType.textContent = btn.dataset.name;
      } else {
        btn.classList.remove('active');
      }
    });
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      lblBuildingType.textContent = btn.dataset.name;
      roofAreaSlider.value = btn.dataset.area;
      calculateRoofEstimate();
    });
  });

  profileRadios.forEach(radio => radio.addEventListener('change', calculateRoofEstimate));
  gaugeRadios.forEach(radio => radio.addEventListener('change', calculateRoofEstimate));

  // Initial computation
  calculateRoofEstimate();

  // WhatsApp Order from Calculator
  if (btnSendWhatsAppQuote) {
    btnSendWhatsAppQuote.addEventListener('click', () => {
      const data = calculateRoofEstimate();
      const message = `Hello MD Shalom (Adasco Synergy Limited),%0A%0AI just generated an instant roofing estimate on your website:%0A%0A• Roof Area: ${data.area} m²%0A• Profile: ${data.profile}%0A• Aluminium Gauge: ${data.gauge} mm%0A• Estimated Quantity: ${data.sheets}%0A• Accessories: ~${data.ridges} Ridge Caps%0A• Estimated Total: ₦${data.minPrice} – ₦${data.maxPrice}%0A%0APlease confirm exact stock availability and advise on on-site inspection. Thank you!`;
      
      const whatsappUrl = `https://wa.me/2349066224148?text=${message}`;
      window.open(whatsappUrl, '_blank');
      showToast('Redirecting your estimate to Managing Director Shalom on WhatsApp...');
    });
  }

  // =========================================================================
  // 4. Interactive Roofing Color Visualizer
  // =========================================================================
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const roofVisualizerPreview = document.getElementById('roofVisualizerPreview');
  const swatchColorName = document.getElementById('swatchColorName');

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorHex = btn.dataset.color;
      const colorLabel = btn.dataset.name;

      if (roofVisualizerPreview) {
        roofVisualizerPreview.style.backgroundColor = colorHex;
      }
      if (swatchColorName) {
        swatchColorName.textContent = colorLabel;
      }
    });
  });

  // =========================================================================
  // 5. Featured Projects Filter Tabs (Promina Style)
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // =========================================================================
  // 6. Request A Quote Form Handling
  // =========================================================================
  const quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const location = document.getElementById('projectLocation').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const details = document.getElementById('projectDetails').value.trim();

      if (!name || !phone || !location) {
        showToast('Please fill out all required fields.');
        return;
      }

      const whatsappText = `Hello MD Shalom (Adasco Synergy Limited),%0A%0ANew Quote Request from Website:%0A• Client Name: ${encodeURIComponent(name)}%0A• Phone / WhatsApp: ${encodeURIComponent(phone)}%0A• Location: ${encodeURIComponent(location)}%0A• Service Required: ${encodeURIComponent(service)}%0A• Details: ${encodeURIComponent(details || 'Standard site inspection requested.')}%0A%0APlease get in touch with me.`;

      const targetUrl = `https://wa.me/2349066224148?text=${whatsappText}`;
      
      showToast('Quote received! Opening direct chat with MD Shalom...');
      setTimeout(() => {
        window.open(targetUrl, '_blank');
        quoteForm.reset();
      }, 700);
    });
  }

  // =========================================================================
  // 7. Toast Notification Utility
  // =========================================================================
  function showToast(msg) {
    const toast = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

});
