// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    const successMsg = document.getElementById('form-success-message');
    // Simple validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      [name, email, message].forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '#dbeafe';
        }
      });
      return;
    }
    [name, email, message].forEach(input => {
      input.style.borderColor = '#dbeafe';
    });
    // Send to Formspree (replace YOUR_FORMSPREE_ENDPOINT below)
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });
      if (response.ok) {
        if (successMsg) {
          successMsg.textContent = 'Thank you! Your message has been sent.';
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 3500);
        }
        contactForm.reset();
      } else {
        if (successMsg) {
          successMsg.textContent = 'Sorry, there was a problem. Please try again later.';
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 3500);
        }
      }
    } catch (err) {
      if (successMsg) {
        successMsg.textContent = 'Sorry, there was a problem. Please try again later.';
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3500);
      }
    }
  });
}
// Hamburger menu logic
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
const navOverlay = document.getElementById('nav-overlay');
const body = document.body;

function openMenu() {
  navList.classList.add('open');
  navOverlay.classList.add('show');
  navOverlay.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  body.style.overflow = 'hidden';
}
function closeMenu() {
  navList.classList.remove('open');
  navOverlay.classList.remove('show');
  navOverlay.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  body.style.overflow = '';
}
if (navToggle && navList && navOverlay) {
  navToggle.addEventListener('click', () => {
    navList.classList.contains('open') ? closeMenu() : openMenu();
  });
  navOverlay.addEventListener('click', closeMenu);
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('open')) closeMenu();
  });
}
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

const faders = document.querySelectorAll('.fade-in-up');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
