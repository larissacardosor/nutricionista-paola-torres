document.querySelector('.site-header .brand').addEventListener('click', (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.hash !== '#inicio') history.pushState(null, '', '#inicio');
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

const carousel = document.querySelector('.hero-media');
const slides = [...carousel.querySelectorAll('.hero-slides img')];
const dots = [...carousel.querySelectorAll('.carousel-dot')];
const controls = carousel.querySelector('.carousel-controls');
const toggle = carousel.querySelector('.carousel-toggle');
const toggleIcon = toggle.querySelector('span');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let rotation;

function showSlide(index) {
  slides[currentSlide].setAttribute('aria-hidden', 'true');
  dots[currentSlide].removeAttribute('aria-current');
  currentSlide = index;
  slides[currentSlide].removeAttribute('aria-hidden');
  dots[currentSlide].setAttribute('aria-current', 'true');
}

function setRotation(playing) {
  clearInterval(rotation);
  rotation = playing ? setInterval(() => {
    if (!document.hidden) showSlide((currentSlide + 1) % slides.length);
  }, 5500) : undefined;
  toggle.setAttribute('aria-label', playing ? 'Pausar troca automática' : 'Iniciar troca automática');
  toggleIcon.textContent = playing ? 'Ⅱ' : '▶';
}

dots.forEach((dot, index) => {
  dot.addEventListener('focus', () => setRotation(false));
  dot.addEventListener('click', () => {
    setRotation(false);
    showSlide(index);
  });
});
toggle.addEventListener('click', () => setRotation(rotation === undefined));
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) setRotation(false);
});
controls.hidden = false;
setRotation(!reducedMotion.matches);
