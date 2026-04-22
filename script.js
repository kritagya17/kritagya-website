/* ============================================================
   KRITAGYA RAJ PANDEY — Portfolio JavaScript
<<<<<<< HEAD
   Optimised, clean, single-file.

   Features:
     1.  Custom cursor (desktop only)
     2.  Sticky navbar with scroll detection
     3.  Mobile hamburger menu
     4.  Typing / typewriter animation
     5.  Scroll-reveal (IntersectionObserver)
     6.  Skill bar animation (IntersectionObserver)
     7.  Contact form handler (mock)
     8.  Active nav link highlight
     9.  Smooth anchor scroll
     10. Hero parallax glow effect
     11. Floating particles
     12. Keyboard accessibility for mobile menu
   ============================================================ */

'use strict';

/* ─── Run after DOM is ready ─── */
document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================
     1. CUSTOM CURSOR
     — Only activates on non-touch / non-mobile
  =========================================================== */
  const isMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (isMouse && cursorDot && cursorRing) {
    document.body.style.cursor = 'none';

    let dotX = 0, dotY = 0;
    let ringX = -100, ringY = -100;

    /* Instant dot follow */
    document.addEventListener('mousemove', e => {
      dotX = e.clientX;
      dotY = e.clientY;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top  = dotY + 'px';
    });

    /* Smooth ring lerp via rAF */
    const lerp = (a, b, t) => a + (b - a) * t;
    (function animateRing() {
      ringX = lerp(ringX, dotX, 0.13);
      ringY = lerp(ringY, dotY, 0.13);
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    /* Grow ring on interactive elements */
    document.querySelectorAll('a, button, .skill-card, .ach-card, .video-card')
      .forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });

    /* Hide when cursor leaves window */
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
    });
  }


  /* ===========================================================
     2. STICKY NAVBAR — add .scrolled on scroll
  =========================================================== */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // apply on load (e.g. after hard-refresh mid-page)


=======
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
 
 
>>>>>>> 1217cb10ab0eadaee2fdc43e5efb464476bcc47e
  /* ===========================================================
     3. HAMBURGER / MOBILE MENU
  =========================================================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');
<<<<<<< HEAD

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  hamburger.addEventListener('click', () => toggleMenu());

  /* Close when a link is clicked */
  mobLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* Close when clicking outside the menu */
  document.addEventListener('click', e => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });


  /* ===========================================================
     4. TYPING / TYPEWRITER ANIMATION
  =========================================================== */
  const typedEl = document.getElementById('typedText');

  if (typedEl) {
    const phrases = [
      'MBBS Student · IOM Nepal',
      'CEE 2080 Rank #1 in Nepal',
      'Medical Content Creator',
      'Aspiring YouTuber',
      'Future Physician',
      'Lifelong Learner',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let delay     = 100;

    function typeLoop() {
      const phrase = phrases[phraseIdx];

      if (!deleting) {
        typedEl.textContent = phrase.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === phrase.length) {
          /* Pause at full word before starting delete */
          setTimeout(() => { deleting = true; typeLoop(); }, 1900);
          return;
        }
        delay = 95;
      } else {
        typedEl.textContent = phrase.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          delay     = 420; /* Pause before typing next word */
        } else {
          delay = 52;
        }
      }

      setTimeout(typeLoop, delay);
    }

    /* Small initial delay so page renders first */
    setTimeout(typeLoop, 900);
  }


  /* ===========================================================
     5. SCROLL REVEAL
     Reveals .reveal elements as they enter the viewport.
     Siblings get a staggered delay for a cascade effect.
  =========================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Calculate stagger based on position among .reveal siblings */
      const siblings = Array.from(entry.target.parentElement.children)
        .filter(el => el.classList.contains('reveal'));
      const sibIdx  = siblings.indexOf(entry.target);
      const stagger = Math.min(sibIdx * 80, 360); /* cap at 360ms */

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, stagger);

      revealObs.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -44px 0px',
  });

  revealEls.forEach(el => revealObs.observe(el));


  /* ===========================================================
     6. SKILL BAR ANIMATION
  =========================================================== */
  const skillFills = document.querySelectorAll('.skill-fill');

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill = entry.target;
      /* Short delay so the reveal animation plays first */
      setTimeout(() => {
        fill.style.width = fill.getAttribute('data-width');
      }, 320);
      barObs.unobserve(fill);
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => barObs.observe(fill));


  /* ===========================================================
     7. CONTACT FORM — mock submission with feedback
  =========================================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      /* Show loading state */
      submitBtn.innerHTML = '<span>Sending…</span>';
      submitBtn.disabled = true;

      /* Simulate network delay (replace with real fetch/emailjs in production) */
      setTimeout(() => {
        formSuccess.style.display = 'block';
        contactForm.reset();
        submitBtn.innerHTML = '✓ Message Sent!';
        submitBtn.style.background = 'rgba(34, 211, 165, 0.15)';
        submitBtn.style.boxShadow  = 'none';
        submitBtn.style.color      = '#22d3a5';

        /* Reset after 5 s */
        setTimeout(() => {
          formSuccess.style.display = 'none';
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled  = false;
          submitBtn.style     = '';
        }, 5000);
      }, 1100);
    });
  }


  /* ===========================================================
     8. ACTIVE NAV LINK HIGHLIGHT
     Highlights the nav link matching the section in view.
  =========================================================== */
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    });
  }, {
    threshold: 0.4,
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72px'} 0px 0px 0px`,
  });

  sections.forEach(sec => sectionObs.observe(sec));


  /* ===========================================================
     9. SMOOTH ANCHOR SCROLLING
     Offsets scroll by navbar height so content isn't hidden.
  =========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      if (href === '#') return; /* plain # does nothing */
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72'
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ===========================================================
     10. HERO PARALLAX GLOW
     Subtle mouse-tracking effect on the hero background glows.
  =========================================================== */
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');

  if (glow1 && glow2 && isMouse) {
    let ticking = false;

    document.addEventListener('mousemove', e => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const xRatio = (e.clientX / window.innerWidth  - 0.5);
        const yRatio = (e.clientY / window.innerHeight - 0.5);
        const x1 = xRatio * 28;
        const y1 = yRatio * 18;
        glow1.style.transform = `translate(${x1}px, ${y1}px)`;
        glow2.style.transform = `translate(${-x1 * 0.55}px, ${-y1 * 0.55}px)`;
        ticking = false;
      });
    });
  }


  /* ===========================================================
     11. FLOATING PARTICLES
     Lightweight ambient particles in the background layer.
  =========================================================== */
  const particlesLayer = document.getElementById('particlesLayer');

  if (particlesLayer) {
    /* Reduce particle count on mobile for performance */
    const maxParticles = window.innerWidth < 768 ? 0 : 18;
    if (maxParticles === 0) return; /* skip on mobile entirely */

    function createParticle() {
      const p    = document.createElement('div');
      const size = Math.random() * 3 + 1;          /* 1–4 px */
      const dur  = Math.random() * 14 + 10;         /* 10–24 s */
      const del  = Math.random() * 8;               /* 0–8 s  */
      const left = Math.random() * 100;             /* 0–100% */

      p.className = 'particle';
      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${left}%;
        animation-duration:${dur}s;
        animation-delay:${del}s;
      `;
      particlesLayer.appendChild(p);

      /* Remove from DOM when animation is long done */
      setTimeout(() => p.remove(), (dur + del) * 1000 + 2000);
    }

    /* Seed initial batch */
    for (let i = 0; i < maxParticles; i++) createParticle();

    /* Trickle new particles over time */
    const particleInterval = setInterval(() => {
      if (document.hidden) return; /* pause when tab not visible */
      createParticle();
    }, 1200);

    /* Clean up interval if ever needed */
    window.addEventListener('beforeunload', () => clearInterval(particleInterval));
  }


  /* ===========================================================
     12. DOWNLOAD CV — ensure button triggers download
     (already handled by the `download` attribute in HTML,
      but this adds a fallback console warning if file is missing)
  =========================================================== */
  const cvBtn = document.getElementById('downloadCvBtn');
  if (cvBtn) {
    cvBtn.addEventListener('click', e => {
      /*
        If you haven't added cv.pdf yet, this shows a helpful alert.
        REMOVE this block once your cv.pdf is in place.
      */
      const href = cvBtn.getAttribute('href');
      if (href === 'cv.pdf') {
        /* Check if the file likely exists by doing a HEAD request */
        fetch(href, { method: 'HEAD' })
          .then(res => {
            if (!res.ok) {
              e.preventDefault();
              alert('📄 CV is being prepared! Check back soon.');
            }
            /* If file exists, the default download behaviour proceeds */
          })
          .catch(() => {
            /* Network or CORS issue — allow the click to proceed normally */
          });
      }
    });
  }

}); /* end DOMContentLoaded */
=======
 
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
 
>>>>>>> 1217cb10ab0eadaee2fdc43e5efb464476bcc47e
