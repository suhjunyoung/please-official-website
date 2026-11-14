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
    target.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));
    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
});

const revealElements = [...document.querySelectorAll('.reveal')];
function revealVisible() {
  const thresholdY = window.innerHeight + 40;
  revealElements.forEach((element) => {
    if (element.classList.contains('in-view')) return;
    if (element.getBoundingClientRect().top <= thresholdY) element.classList.add('in-view');
  });
}

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 40px 0px', threshold: 0.01 })
  : null;

revealElements.forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in-view');
});
revealVisible();
window.addEventListener('scroll', revealVisible, { passive: true });

const jarTemplate = document.querySelector('#app-jar-template');
const jarGradientIds = ['jar-back', 'glass-edge', 'glass-floor', 'rim-fill'];
document.querySelectorAll('[data-app-jar]').forEach((target, jarIndex) => {
  if (!(jarTemplate instanceof HTMLTemplateElement)) return;
  const fragment = jarTemplate.content.cloneNode(true);
  const prefix = `jar-${jarIndex}-`;
  jarGradientIds.forEach((id) => {
    const gradient = fragment.querySelector(`#${id}`);
    if (gradient) gradient.id = `${prefix}${id}`;
    fragment.querySelectorAll(`[fill="url(#${id})"]`).forEach((node) => node.setAttribute('fill', `url(#${prefix}${id})`));
    fragment.querySelectorAll(`[stroke="url(#${id})"]`).forEach((node) => node.setAttribute('stroke', `url(#${prefix}${id})`));
  });
  target.append(fragment);
});

const guideTrack = document.querySelector('[data-guide-track]');
const guideSticky = guideTrack?.querySelector('.guide-sticky');
const guideDial = document.querySelector('[data-guide-dial]');
const guideSteps = [...document.querySelectorAll('[data-guide-step]')];
const guidePreviews = [...document.querySelectorAll('[data-guide-preview]')];

const DIAL_START_PAD = 0.08;
const DIAL_END_PAD = 0.1;
const DIAL_USABLE = 1 - DIAL_START_PAD - DIAL_END_PAD;
const DIAL_LERP = 0.14;
const MOBILE_SWIPE_THRESHOLD = 48;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let currentGuideIndex = Math.max(0, guidePreviews.findIndex((preview) => preview.classList.contains('is-active')));
let targetDialPos = currentGuideIndex;
let renderedDialPos = currentGuideIndex;
let dialRafId = 0;

function isDesktopDial() {
  return Boolean(guideTrack && guideSticky && window.innerWidth > 760);
}

function getDesktopScrollProgress() {
  if (!guideTrack || !guideSticky || guideSteps.length < 2) return 0;
  const travel = guideTrack.offsetHeight - guideSticky.offsetHeight;
  if (travel <= 0) return 0;
  const raw = Math.min(1, Math.max(0, -guideTrack.getBoundingClientRect().top / travel));
  const normalized = Math.min(1, Math.max(0, (raw - DIAL_START_PAD) / DIAL_USABLE));
  return normalized * (guideSteps.length - 1);
}

function activateGuidePreview(nextIndex) {
  const index = Math.max(0, Math.min(guideSteps.length - 1, nextIndex));
  if (!guideSteps.length || !guidePreviews[index] || index === currentGuideIndex) return;
  currentGuideIndex = index;

  guideSteps.forEach((step, stepIndex) => {
    const active = stepIndex === index;
    step.classList.toggle('active', active);
    step.setAttribute('aria-pressed', String(active));
  });

  guidePreviews.forEach((preview, previewIndex) => {
    preview.classList.toggle('is-active', previewIndex === index);
  });
}

function applyDialTransforms(pos) {
  const stride = window.innerWidth > 980 ? 124 : window.innerWidth > 760 ? 132 : 114;
  guideSteps.forEach((step, index) => {
    const d = index - pos;
    const dist = Math.abs(d);
    const y = d * stride;
    const scale = Math.max(0.74, 1 - dist * 0.14);
    const opacity = dist >= 2.25 ? 0 : Math.max(0.14, 1 - dist * 0.44);
    const rotateX = Math.max(-42, Math.min(42, -d * 18));
    step.style.transform = `translate3d(0, calc(-50% + ${y.toFixed(1)}px), 0) rotateX(${rotateX.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
    step.style.opacity = opacity.toFixed(3);
    step.style.zIndex = String(10 - Math.round(dist));
  });
}

function tickDial() {
  if (isDesktopDial()) targetDialPos = getDesktopScrollProgress();

  const diff = targetDialPos - renderedDialPos;
  if (reducedMotionQuery.matches || Math.abs(diff) < 0.002) {
    renderedDialPos = targetDialPos;
    dialRafId = 0;
  } else {
    renderedDialPos += diff * DIAL_LERP;
    dialRafId = window.requestAnimationFrame(tickDial);
  }

  applyDialTransforms(renderedDialPos);
  activateGuidePreview(Math.round(renderedDialPos));
}

function scheduleDialTick() {
  if (!dialRafId) dialRafId = window.requestAnimationFrame(tickDial);
}

function selectGuideStep(nextIndex) {
  const index = Math.max(0, Math.min(guideSteps.length - 1, nextIndex));
  if (!guideSteps.length) return;

  if (isDesktopDial()) {
    const travel = guideTrack.offsetHeight - guideSticky.offsetHeight;
    const ratio = guideSteps.length > 1
      ? DIAL_START_PAD + (index / (guideSteps.length - 1)) * DIAL_USABLE
      : 0;
    const targetY = window.scrollY + guideTrack.getBoundingClientRect().top + ratio * travel;
    window.scrollTo({ top: targetY, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
  } else {
    targetDialPos = index;
    scheduleDialTick();
  }
}

if (guideSteps.length) {
  if (isDesktopDial()) {
    targetDialPos = getDesktopScrollProgress();
    renderedDialPos = targetDialPos;
  }
  applyDialTransforms(renderedDialPos);
  activateGuidePreview(Math.round(renderedDialPos));

  guideSteps.forEach((step, index) => step.addEventListener('click', () => selectGuideStep(index)));

  guideDial?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectGuideStep(currentGuideIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectGuideStep(currentGuideIndex - 1);
    }
  });

  let touchStartY = 0;
  let hasTouchStart = false;
  guideDial?.addEventListener('touchstart', (event) => {
    const touch = event.touches?.[0] || event.changedTouches?.[0];
    if (!touch) {
      hasTouchStart = false;
      return;
    }
    touchStartY = touch.clientY;
    hasTouchStart = true;
  }, { passive: true });
  guideDial?.addEventListener('touchend', (event) => {
    if (isDesktopDial() || !hasTouchStart) return;
    hasTouchStart = false;
    const touchEnd = event.changedTouches?.[0] || event.touches?.[0];
    if (!touchEnd) return;
    const deltaY = touchStartY - touchEnd.clientY;
    if (Math.abs(deltaY) < MOBILE_SWIPE_THRESHOLD) return;
    selectGuideStep(currentGuideIndex + (deltaY > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (isDesktopDial()) scheduleDialTick();
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (isDesktopDial()) targetDialPos = getDesktopScrollProgress();
    applyDialTransforms(renderedDialPos);
  }, { passive: true });
}
