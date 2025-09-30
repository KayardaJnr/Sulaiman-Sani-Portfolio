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
