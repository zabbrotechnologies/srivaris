// -------------------------------------------------------------
// SRIVARI AUTOMATION SOLUTIONS - INTERACTIVE JS
// Google-Style Clean Design
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. NAVBAR SCROLL ELEVATION EFFECT & THREE DOTS TOGGLE
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  const toggleMenu = () => {
    if (!navMenu) return;
    const isActive = navMenu.classList.contains('active');
    if (isActive) {
      navMenu.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
    } else {
      navMenu.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('active');
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when clicking any nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 3. (Removed glass-panel spotlight — clean Material style)

  // 4. SUBTLE PARALLAX ON HERO IMAGE
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      heroVisual.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
  }

  // 5. DYNAMIC STAT COUNTER ANIMATION
  const statNumbers = document.querySelectorAll('.stat-val');
  let animatedStats = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const isPercent = stat.textContent.includes('%');
      const suffix = isPercent ? '%' : '+';
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const eased = progress * (2 - progress); // ease-out
        const current = (target * eased).toFixed(target % 1 === 0 ? 0 : 1);
        stat.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  // IntersectionObserver for Stats
  const statsContainer = document.querySelector('.hero-stats-row');
  if (statsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsContainer);
  }

  // 6. SERVICES TAB FILTERING
  const tabPills = document.querySelectorAll('.tab-pill');
  const serviceCards = document.querySelectorAll('.service-image-card');

  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. INTERACTIVE ESTIMATOR CALCULATOR
  const calcIndustry = document.getElementById('calcIndustry');
  const calcLines = document.getElementById('calcLines');
  const linesCountText = document.getElementById('linesCountText');
  const estEfficiency = document.getElementById('estEfficiency');
  const estDetails = document.getElementById('estDetails');

  const updateCalculator = () => {
    if (!calcLines || !estEfficiency) return;

    const lines = parseInt(calcLines.value, 10);
    linesCountText.textContent = `${lines} ${lines === 1 ? 'Line' : 'Lines'}`;

    const industryVal = calcIndustry ? calcIndustry.value : 'auto';
    let baseBoost = 26;

    if (industryVal === 'auto') baseBoost += 10;
    if (industryVal === 'pharma') baseBoost += 12;
    if (industryVal === 'fmcg') baseBoost += 8;
    if (industryVal === 'electronics') baseBoost += 14;

    const totalBoost = Math.min(baseBoost + Math.floor(lines * 0.8), 58);
    const estUnits = lines * 6500;

    estEfficiency.textContent = `+${totalBoost}%`;
    if (estDetails) {
      estDetails.textContent = `Estimated annual throughput boost of ~${estUnits.toLocaleString()} units with integrated Srivaris PLC, Vision & Robotics automation across ${lines} ${lines === 1 ? 'active line' : 'active lines'}.`;
    }
  };

  if (calcLines) {
    calcLines.addEventListener('input', updateCalculator);
    if (calcIndustry) calcIndustry.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // 8. CONTACT FORM → WHATSAPP REDIRECT
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = (document.getElementById('contactName')?.value    || '').trim();
      const email   = (document.getElementById('contactEmail')?.value   || '').trim();
      const message = (document.getElementById('contactMessage')?.value || '').trim();

      const waText =
        `Hello Srivari Automation Solutions! 👋\n\n` +
        `*New Project Inquiry*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n\n` +
        `💬 *Project Requirements:*\n${message}`;

      const waUrl = `https://wa.me/919715140664?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

  // 9. SMOOTH SCROLL REVEAL ON SCROLL
  const revealEls = document.querySelectorAll('.glass-panel, .pillar-card, .service-image-card, .about-img-card, section > .container > .section-head');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`;
      revealObserver.observe(el);
    });
  }

  // 10. RE-INITIALIZE LUCIDE after page is ready
  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 200);
});
