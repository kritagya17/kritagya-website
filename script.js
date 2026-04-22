/* ============================================================
   KRITAGYA RAJ PANDEY — Portfolio JavaScript
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


  /* ===========================================================
     3. HAMBURGER / MOBILE MENU
  =========================================================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');

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
