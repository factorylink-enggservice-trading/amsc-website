/* =========================================================
   AMSC FactoryLink — Site interactions
   Nav state, mobile menu, scroll reveals, animated counters
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header solid state on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const setHeaderState = () => {
      header.classList.toggle('solid', window.scrollY > 40);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active nav link based on current page ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffixEl = el.querySelector('.suffix');
      const decimals = el.dataset.count.includes('.') ? 1 : 0;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.firstChild.nodeValue = decimals ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.firstChild.nodeValue = decimals ? target.toFixed(decimals) : target;
        }
      };
      requestAnimationFrame(tick);
    };

    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((el) => {
      el.textContent = '0';
      const suffix = el.dataset.suffix;
      if (suffix) {
        const span = document.createElement('span');
        span.className = 'suffix';
        span.textContent = suffix;
        el.appendChild(span);
      }
      counterIO.observe(el);
    });
  }

  /* ---- Contact form (front-end placeholder; wire to backend later) ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.querySelector('#form-feedback');
      if (feedback) {
        feedback.textContent = 'This form isn\'t connected to a server yet — hook up the backend to receive submissions.';
        feedback.classList.add('show');
      }
    });
  }

  /* ---- In Practice: click-to-expand photos ---- */
  const practiceItems = document.querySelectorAll('.practice-item');
  if (practiceItems.length) {
    const collapseItem = (item) => {
      item.classList.remove('expanded');
      item.setAttribute('aria-expanded', 'false');
    };
    const toggleItem = (item) => {
      const isExpanded = item.classList.contains('expanded');
      practiceItems.forEach(collapseItem);
      if (!isExpanded) {
        item.classList.add('expanded');
        item.setAttribute('aria-expanded', 'true');
      }
    };
    practiceItems.forEach((item) => {
      item.addEventListener('click', () => toggleItem(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleItem(item);
        }
      });
      const closeBtn = item.querySelector('.practice-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          collapseItem(item);
        });
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        practiceItems.forEach(collapseItem);
      }
    });
  }

});