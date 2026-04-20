/* ============================================================
   KRITAGYA RAJ PANDEY — Portfolio JavaScript
   Features: Custom cursor, typing animation, scroll reveal,
             sticky nav, skill bars, mobile menu, form handler
   ============================================================ */
 
/* ---- Wait for DOM ---- */
document.addEventListener('DOMContentLoaded', () => {
 
  /* ===========================================================
     1. CUSTOM CURSOR (desktop only)
  =========================================================== */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
 
  if (window.innerWidth > 768 && dot && ring) {
    let ringX = 0, ringY = 0;
    let dotX  = 0, dotY  = 0;
 
    document.addEventListener('mousemove', e => {
      dotX = e.clientX; dotY = e.clientY;
      dot.style.left  = dotX + 'px';
      dot.style.top   = dotY + 'px';
    });
 
    // Smooth ring follow
    function animateRing() {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
 
    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
 
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  }
 
 
  /* ===========================================================
     2. STICKY NAVBAR — add .scrolled class on scroll
  =========================================================== */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
 
 
  /* ===========================================================
     3. HAMBURGER / MOBILE MENU
  =========================================================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');
 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
 
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
 
 
  /* ===========================================================
     4. TYPING ANIMATION in hero section
  =========================================================== */
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'MBBS Student',
    'Content Creator',
    'Medical Educator',
    'Future Physician',
    'Aspiring YouTuber',
  ];
 
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingDelay = 110;
 
  function typeLoop() {
    const current = phrases[phraseIndex];
 
    if (!isDeleting) {
      // Typing
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        // Pause at end before deleting
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1800);
        return;
      }
    } else {
      // Deleting
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 110;
      }
    }
 
    typingDelay = isDeleting ? 60 : 110;
    setTimeout(typeLoop, typingDelay);
  }
 
  // Start after a short delay so page loads first
  setTimeout(typeLoop, 800);
 
 
  /* ===========================================================
     5. SCROLL REVEAL ANIMATION
  =========================================================== */
  const revealEls = document.querySelectorAll('.reveal');
 
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings: delay based on order among siblings
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320); // max 320ms stagger
 
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
 
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });
 
  revealEls.forEach(el => revealObserver.observe(el));
 
 
  /* ===========================================================
     6. SKILL BAR ANIMATION — triggered on scroll into view
  =========================================================== */
  const skillFills = document.querySelectorAll('.skill-fill');
 
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        // Short delay so the reveal animation plays first
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 300);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
 
  skillFills.forEach(fill => barObserver.observe(fill));
 
 
  /* ===========================================================
     7. CONTACT FORM — mock submit handler
  =========================================================== */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
 
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
 
      // Simulate network request
      setTimeout(() => {
        formSuccess.style.display = 'block';
        form.reset();
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'rgba(0, 233, 106, 0.2)';
        btn.style.color = '#00e96a';
        btn.style.boxShadow = 'none';
 
        setTimeout(() => {
          formSuccess.style.display = 'none';
          btn.textContent = 'Send Message →';
          btn.disabled = false;
          btn.style = '';
        }, 5000);
      }, 1200);
    });
  }
 
 
  /* ===========================================================
     8. ACTIVE NAV LINK — highlight section in view
  =========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');
 
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--white)';
          }
        });
      }
    });
  }, { threshold: 0.45 });
 
  sections.forEach(sec => sectionObserver.observe(sec));
 
 
  /* ===========================================================
     9. SMOOTH SCROLL for anchor links
  =========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
 
 
  /* ===========================================================
     10. PARALLAX GLOW EFFECT on hero glows (subtle)
  =========================================================== */
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
 
  if (glow1 && glow2 && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      glow1.style.transform = `translate(${x}px, ${y}px)`;
      glow2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    });
  }
 
}); // end DOMContentLoaded
 