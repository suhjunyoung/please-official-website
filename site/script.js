const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

function closeNav() {
  if (!navToggle || !nav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.sr-only').textContent = '메뉴 열기';
  nav.classList.remove('open');
  document.documentElement.classList.remove('nav-open');
  document.body.classList.remove('nav-open');
}

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.querySelector('.sr-only').textContent = open ? '메뉴 닫기' : '메뉴 열기';
  nav?.classList.toggle('open', open);
  document.documentElement.classList.toggle('nav-open', open);
  document.body.classList.toggle('nav-open', open);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 16), { passive: true });
window.addEventListener('pageshow', closeNav);
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeNav();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    closeNav();
    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in-view');
});

const jarTemplate = document.querySelector('#app-jar-template');
document.querySelectorAll('[data-app-jar]').forEach((target) => {
  if (jarTemplate instanceof HTMLTemplateElement) target.append(jarTemplate.content.cloneNode(true));
});

const guideSteps = [...document.querySelectorAll('[data-guide-step]')];
const guidePreviews = [...document.querySelectorAll('[data-guide-preview]')];
const guideNumber = document.querySelector('[data-guide-number]');
const guideBar = document.querySelector('[data-guide-bar]');

function selectGuideStep(nextIndex) {
  const index = Math.max(0, Math.min(guideSteps.length - 1, nextIndex));
  if (!guideSteps.length || !guidePreviews[index]) return;

  guideSteps.forEach((step, stepIndex) => {
    const active = stepIndex === index;
    step.classList.toggle('active', active);
    step.setAttribute('aria-pressed', String(active));
  });

  guidePreviews.forEach((preview, previewIndex) => {
    const active = previewIndex === index;
    preview.classList.remove('active');
    preview.hidden = !active;
    if (active) {
      void preview.offsetWidth;
      preview.classList.add('active');
    }
  });

  if (guideNumber) guideNumber.textContent = String(index + 1).padStart(2, '0');
  if (guideBar) guideBar.style.width = `${((index + 1) / guideSteps.length) * 100}%`;
}

guideSteps.forEach((step, index) => step.addEventListener('click', () => selectGuideStep(index)));

if ('IntersectionObserver' in window && guideSteps.length) {
  const stepObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible && window.innerWidth > 760) selectGuideStep(guideSteps.indexOf(visible.target));
  }, { rootMargin: '-28% 0px -40% 0px', threshold: [0.2, 0.5, 0.8] });
  guideSteps.forEach((step) => stepObserver.observe(step));
}
