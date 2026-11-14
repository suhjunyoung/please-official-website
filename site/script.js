(() => {
  'use strict';

  /* Shared constants synced with the Please! mobile app (theme.ts, characters.ts, translations.ts). */
  const STORE_LINKS = {
    ios: 'https://apps.apple.com/kr/app/id6806937598',
    android: 'https://play.google.com/store/apps/details?id=kr.please.app',
  };

  const CANDY_ORDER = ['blueberry', 'bubblegum', 'mint', 'marigold', 'grape', 'sky', 'fern', 'cinnamon'];

  const CHARACTERS = {
    shiba: { src: '/assets/brand/shiba.webp', alt: '나', color: 'blueberry' },
    gyuri: { src: '/assets/brand/gyuri.webp', alt: '지우', color: 'bubblegum' },
    junyoung: { src: '/assets/brand/junyoung.webp', alt: '준영', color: 'mint' },
    minsu: { src: '/assets/brand/minsu.webp', alt: '민수', color: 'marigold' },
  };

  const ICONS = {
    check: '<svg viewBox="0 0 17 17" fill="none" aria-hidden="true"><path d="M14.1667 4.25L6.375 12.0417L2.83333 8.5" stroke="currentColor" stroke-width="2.125" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trash: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4H14" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66667 7.33333V11.3333" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.33333 7.33333V11.3333" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3.75 9H14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 3.75V14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect height="16" rx="3" stroke="currentColor" stroke-width="1.8" width="18" x="3" y="5"/><path d="M3 10.5h18" stroke="currentColor" stroke-width="1.8"/><path d="M8 3v4M16 3v4" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>',
    heartOutline: '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14.25 10.5C15.3675 9.405 16.5 8.0925 16.5 6.375C16.5 5.28098 16.0654 4.23177 15.2918 3.45818C14.5182 2.6846 13.469 2.25 12.375 2.25C11.055 2.25 10.125 2.625 9 3.75C7.875 2.625 6.945 2.25 5.625 2.25C4.53098 2.25 3.48177 2.6846 2.70818 3.45818C1.9346 4.23177 1.5 5.28098 1.5 6.375C1.5 8.1 2.625 9.4125 3.75 10.5L9 15.75L14.25 10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heartFilled: '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14.25 10.5C15.3675 9.405 16.5 8.0925 16.5 6.375C16.5 5.28098 16.0654 4.23177 15.2918 3.45818C14.5182 2.6846 13.469 2.25 12.375 2.25C11.055 2.25 10.125 2.625 9 3.75C7.875 2.625 6.945 2.25 5.625 2.25C4.53098 2.25 3.48177 2.6846 2.70818 3.45818C1.9346 4.23177 1.5 5.28098 1.5 6.375C1.5 8.1 2.625 9.4125 3.75 10.5L9 15.75L14.25 10.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heartCount: '<svg viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M10.2917 7.58333C11.0988 6.7925 11.9167 5.84458 11.9167 4.60417C11.9167 3.81404 11.6028 3.05628 11.0441 2.49758C10.4854 1.93888 9.72762 1.625 8.9375 1.625C7.98417 1.625 7.3125 1.89583 6.5 2.70833C5.6875 1.89583 5.01583 1.625 4.0625 1.625C3.27238 1.625 2.51461 1.93888 1.95591 2.49758C1.39721 3.05628 1.08333 3.81404 1.08333 4.60417C1.08333 5.85 1.89583 6.79792 2.70833 7.58333L6.5 11.375L10.2917 7.58333Z" fill="currentColor" stroke="currentColor" stroke-width="1.08333" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const GUIDE_STEPS = [
    {
      num: '01',
      title: '부탁을 한눈에 나눠 봐요',
      description: '부탁은 날짜에 맞춰 밀린\u00A0일, 오늘, 나중에로\u00A0모여요.\n지금 필요한\u00A0일을 바로 찾을\u00A0수\u00A0있어요.',
    },
    {
      num: '02',
      title: '한 줄로 가볍게 부탁해요',
      description: '핵심만 한\u00A0줄로 적고, 받을\u00A0사람과 날짜를\u00A0고르세요.\n담당자를 비워\u00A0두면 누구나 할\u00A0수\u00A0있어요.',
    },
    {
      num: '03',
      title: '부탁을 눌러 자세히 살펴봐요',
      description: '부탁을 누르면 필요한\u00A0일을 바로 할\u00A0수\u00A0있어요. 내가 남긴 부탁은\u00A0수정하고, 다른 부탁은 누가 남기고 완료했는지 살펴볼\u00A0수\u00A0있어요.',
    },
    {
      num: '04',
      title: '끝낸 일은 함께 축하해요',
      description: '일을 끝낸 사람이 체크하면 그\u00A0자리에서 함께\u00A0축하해요.\n다른 사람이 완료한 부탁에는 하트로 마음을 전할\u00A0수\u00A0있어요.',
    },
    {
      num: '05',
      title: '함께한 만큼 캔디가 쌓여요',
      description: '완료한 부탁은 내\u00A0색 캔디가 되어 함께 쓰는 병에\u00A0담겨요.\nMy\u00A0Family에서 최근\u00A02주 활동과 레벨을 확인해\u00A0보세요.',
    },
    {
      num: '06',
      title: '홈 화면에서도 부탁을 확인해요',
      description: '홈\u00A0화면에서 밀린\u00A0일과 오늘 할\u00A0일을 한눈에\u00A0보고, 앱을 열지 않아도 바로 확인할\u00A0수\u00A0있어요. 위젯을 누르면 Please!\u00A0앱으로 곧바로\u00A0이동해요.',
    },
  ];

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Ensure store links remain synced with centralized STORE_LINKS. */
  document.querySelectorAll('[data-store="ios"]').forEach((anchor) => {
    anchor.setAttribute('href', STORE_LINKS.ios);
  });
  document.querySelectorAll('[data-store="android"]').forEach((anchor) => {
    anchor.setAttribute('href', STORE_LINKS.android);
  });

  /* Inject shared SVG icons where declared. */
  document.querySelectorAll('[data-calendar-icon]').forEach((slot) => {
    slot.innerHTML = ICONS.calendar;
  });

  /* Render app-accurate MissionRow, SectionHeader, CharacterAvatar, and FamilyLevelRow components. */
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function withPlease(rawText) {
    return `${String(rawText).trim()} 부탁해요`;
  }

  function renderCharacterAvatar(characterKey, size = 24, extraClass = '') {
    const profile = CHARACTERS[characterKey] || CHARACTERS.shiba;
    const borderWidth = Math.max(2, Math.round(size * 0.07));
    const cls = extraClass ? `char-avatar ${extraClass}` : 'char-avatar';
    return `<span class="${cls}" style="--avatar-size:${size}px;--avatar-border:${borderWidth}px;--avatar-ring:var(--candy-${profile.color})"><img src="${profile.src}" alt="" width="256" height="256" decoding="async" /></span>`;
  }

  function renderSectionHeader({ title, count, showAdd = false }) {
    const addHtml = showAdd
      ? `<span class="app-add-btn" aria-hidden="true">${ICONS.plus}</span>`
      : '';
    return `<div class="app-section-header"><div class="app-section-title-wrap"><strong class="app-section-title">${escapeHtml(title)}</strong><span class="app-count-badge app-count-badge--section">${count}</span></div>${addHtml}</div>`;
  }

  function renderReactions(reactions) {
    if (!reactions) return '';
    const avatarHtml = (reactions.avatars || [])
      .map((key) => renderCharacterAvatar(key, 22, 'app-avatar-item'))
      .join('');
    const addedAvatarHtml = reactions.animateAddedAvatar
      ? renderCharacterAvatar(reactions.animateAddedAvatar, 22, 'app-avatar-item app-avatar-enter')
      : '';
    const countHtml = reactions.animateCountTo != null
      ? `<span class="app-heart-num-wrap"><span class="app-heart-num is-before">${reactions.count}</span><span class="app-heart-num is-after" aria-hidden="true">${reactions.animateCountTo}</span></span>`
      : `<span class="app-heart-num">${reactions.count}</span>`;
    return `<div class="app-mission-reactions"><span class="app-count-badge app-count-badge--heart">${ICONS.heartCount}${countHtml}</span><div class="app-avatar-stack">${avatarHtml}${addedAvatarHtml}</div></div>`;
  }

  function renderMissionRow(mission) {
    const classes = ['app-mission-row'];
    if (!mission.dateCaption) classes.push('is-compact');
    if (mission.done) classes.push('is-done');
    if (mission.animateComplete) classes.push('animate-complete');
    if (mission.extraClass) classes.push(mission.extraClass);

    const checkboxClasses = ['app-checkbox'];
    if (mission.done) checkboxClasses.push('is-checked');

    const dateHtml = mission.dateCaption
      ? `<span class="app-mission-date">${escapeHtml(mission.dateCaption)}</span>`
      : '';
    const mentionHtml = mission.assignee
      ? `<span class="app-mention" style="color:var(--candy-${mission.assignee.color})">@${escapeHtml(mission.assignee.name)}</span> `
      : '';
    const titleHtml = `<p class="app-mission-title">${mentionHtml}${escapeHtml(withPlease(mission.title))}</p>`;
    const reactionsHtml = renderReactions(mission.reactions);

    let actionHtml = '<span class="app-mission-spacer" aria-hidden="true"></span>';
    if (!mission.done && mission.deletable) {
      actionHtml = `<span class="app-mission-action app-mission-trash" aria-hidden="true">${ICONS.trash}</span>`;
    } else if (mission.reactions && mission.reactions.animateHeart) {
      actionHtml = `<span class="app-mission-action app-mission-heart-toggle" aria-hidden="true"><span class="heart-outline">${ICONS.heartOutline}</span><span class="heart-filled">${ICONS.heartFilled}</span></span>`;
    } else if (mission.done && mission.reactions && mission.reactions.reacted) {
      actionHtml = `<span class="app-mission-action app-mission-heart-active" aria-hidden="true">${ICONS.heartFilled}</span>`;
    } else if (mission.done && mission.reactions && mission.reactions.canReact) {
      actionHtml = `<span class="app-mission-action app-mission-heart-idle" aria-hidden="true">${ICONS.heartOutline}</span>`;
    }

    return `<div class="${classes.join(' ')}"><span class="${checkboxClasses.join(' ')}" aria-hidden="true">${ICONS.check}</span><div class="app-mission-body">${dateHtml}${titleHtml}${reactionsHtml}</div>${actionHtml}</div>`;
  }

  const MISSION_MOUNTS = {
    about: () => [
      `<div class="showcase-group">${renderSectionHeader({ title: '오늘', count: 2, showAdd: true })}<div class="app-mission-list">${renderMissionRow({ title: '강아지 밥 챙기기', deletable: true })}${renderMissionRow({ title: '우산 현관에 두기', assignee: { name: '지우', color: 'bubblegum' }, deletable: true })}</div></div>`,
      `<div class="showcase-group">${renderSectionHeader({ title: '함께 끝낸 일', count: 1, showAdd: false })}<div class="app-mission-list">${renderMissionRow({ title: '저녁 장보기 도와주기', done: true, reactions: { count: 2, avatars: ['gyuri', 'shiba'], reacted: true } })}</div></div>`,
    ].join(''),

    'guide-board': () => [
      `<div class="demo-board-group">${renderSectionHeader({ title: '밀린 일', count: 1, showAdd: true })}${renderMissionRow({ title: '우산 현관에 두기', assignee: { name: '지우', color: 'bubblegum' }, dateCaption: '어제', deletable: true })}</div>`,
      `<div class="demo-board-group">${renderSectionHeader({ title: '오늘', count: 1, showAdd: true })}${renderMissionRow({ title: '강아지 밥 챙기기', deletable: true })}</div>`,
      `<div class="demo-board-group">${renderSectionHeader({ title: '나중에', count: 1, showAdd: true })}${renderMissionRow({ title: '거실 전구 주문하기', dateCaption: '8월 27일', deletable: true })}</div>`,
    ].join(''),

    'guide-detail': () => [
      renderSectionHeader({ title: '오늘', count: 1, showAdd: false }),
      renderMissionRow({ title: '세탁기 돌리기', extraClass: 'detail-mission' }),
    ].join(''),

    'guide-celebrate': () => [
      `<div class="celebrate-group"><span class="celebrate-label">내가 끝낸 부탁</span>${renderMissionRow({ title: '식물 물 주기', animateComplete: true, extraClass: 'complete-target' })}</div>`,
      `<div class="celebrate-group"><span class="celebrate-label">다른 구성원이 끝낸 부탁</span>${renderMissionRow({ title: '장보기 도와주기', done: true, reactions: { count: 1, animateCountTo: 2, avatars: ['minsu'], animateAddedAvatar: 'shiba', animateHeart: true } })}</div>`,
      `<div class="confetti" aria-hidden="true">${'<i></i>'.repeat(6)}</div>`,
    ].join(''),
  };

  document.querySelectorAll('[data-mission-mount]').forEach((mount) => {
    const key = mount.getAttribute('data-mission-mount');
    if (key && typeof MISSION_MOUNTS[key] === 'function') {
      mount.innerHTML = MISSION_MOUNTS[key]();
    }
  });

  document.querySelectorAll('[data-level-mount="guide"]').forEach((mount) => {
    mount.innerHTML = [
      '<div class="app-level-row">',
      renderCharacterAvatar('shiba', 44),
      '<div class="app-level-meta">',
      '<div class="app-level-top">',
      '<span class="app-level-name">나</span>',
      '<span class="app-count-badge app-count-badge--candy" style="--badge-bg:var(--candy-blueberry)">4개</span>',
      '</div>',
      '<div class="app-level-track"><span class="app-level-fill" style="--level-color:var(--candy-blueberry);--level-pct:100%"></span></div>',
      '</div>',
      '</div>',
    ].join('');
  });

  /* Navigation drawer & hash scroll */
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  function closeNav() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    const srOnly = navToggle.querySelector('.sr-only');
    if (srOnly) srOnly.textContent = '메뉴 열기';
    nav.classList.remove('open');
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  }

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    const srOnly = navToggle.querySelector('.sr-only');
    if (srOnly) srOnly.textContent = open ? '메뉴 닫기' : '메뉴 열기';
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
    if (window.innerWidth > 640) closeNav();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      closeNav();
      target.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  });

  /* Scroll reveal observer */
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

  /* Ported candy layout physics from apps/mobile/src/features/family/candy-layout.ts & candy-jar.tsx */
  const CANDY_BOUNDS = {
    bottom: 15,
    floorRise: 9,
    height: 178,
    paddingBottom: 5,
    paddingTop: 8,
    paddingX: 8,
    width: 258,
  };
  const MAX_CANDY_SIZE = 46;
  const POUR_DENSITY = 0.62;
  const ROLL_STRIDE = 0.16;
  const MAX_ROLL_STEPS = 64;
  const MAX_ROLL_REFINEMENTS = 5;
  const ROLL_PRECISION = 0.3;
  const SETTLE_EPSILON = 1e-6;
  const SNUGGLE_CLIMB = 0.05;
  const PATH_POINTS = 10;

  const FALL_HEIGHT = CANDY_BOUNDS.height + 24;
  const FALL_DURATION = 440;
  const MOUTH_FADE_FROM = CANDY_BOUNDS.height;
  const MOUTH_FADE_TO = CANDY_BOUNDS.height - 30;
  const FALL_STAGGER = 34;
  const MAX_FALL_DELAY = 1500;
  const ROLL_BASE_DURATION = 230;
  const ROLL_DURATION_PER_PX = 7;
  const MAX_ROLL_DURATION = 620;
  const DESCENT_THRESHOLD = 0.5;

  function noise(index, salt) {
    let mixed = (index + 1) ^ Math.imul(salt + 1, 0x9e3779b9);
    mixed = Math.imul(mixed ^ (mixed >>> 16), 0x21f0aaad);
    mixed = Math.imul(mixed ^ (mixed >>> 15), 0x735a2d97);
    return ((mixed ^ (mixed >>> 15)) >>> 0) / 0xffffffff;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function floorAt(x, left, right, floor, rise) {
    if (rise <= 0) return floor;
    const half = (right - left) / 2;
    if (half <= 0) return floor;
    const fromCenter = Math.abs(x - (left + right) / 2) / half;
    return floor + rise * (fromCenter ** 3);
  }

  function restingHeight(x, radius, placed, floor) {
    let height = floor + radius;
    for (const other of placed) {
      const dx = Math.abs(x - other.x);
      const span = radius + other.radius;
      if (dx >= span) continue;
      height = Math.max(height, other.y + Math.sqrt(span * span - dx * dx));
    }
    return height;
  }

  function nearestGap(x, y, radius, placed) {
    let gap = Infinity;
    for (const other of placed) {
      const distance = Math.hypot(x - other.x, y - other.y);
      gap = Math.min(gap, distance - (radius + other.radius));
    }
    return gap;
  }

  function pour(total, radius, left, right, floor, rise) {
    const placed = [];
    const lowest = left + radius;
    const highest = right - radius;
    const span = highest - lowest;
    const stride = radius * ROLL_STRIDE;
    const refinements = clamp(
      Math.ceil(Math.log2(Math.max(1, stride / ROLL_PRECISION))) + 1,
      1,
      MAX_ROLL_REFINEMENTS,
    );
    const surfaceAt = (x) => restingHeight(x, radius, placed, floorAt(x, lowest, highest, floor, rise));

    for (let index = 0; index < total; index += 1) {
      let x = lowest + noise(index, 11) * span;
      let y = surfaceAt(x);
      const path = [[x, y]];

      for (let refine = 0; refine < refinements; refine += 1) {
        const step = stride / (2 ** refine);
        for (let attempt = 0; attempt < MAX_ROLL_STEPS; attempt += 1) {
          let nextX = x;
          let nextY = y;
          let nextGap = nearestGap(x, y, radius, placed);

          for (const candidate of [x - step, x + step]) {
            const stepX = clamp(candidate, lowest, highest);
            if (stepX === x) continue;
            const stepY = surfaceAt(stepX);
            const stepGap = nearestGap(stepX, stepY, radius, placed);
            const downhill = stepY < nextY - SETTLE_EPSILON;
            const snuggles = stepY <= nextY + radius * SNUGGLE_CLIMB && stepGap < nextGap - SETTLE_EPSILON;
            if (downhill || snuggles) {
              nextX = stepX;
              nextY = stepY;
              nextGap = stepGap;
            }
          }

          if (nextX === x) break;
          x = nextX;
          y = nextY;
          path.push([x, y]);
        }
      }

      placed.push({ path, radius, x, y });
    }

    return placed;
  }

  function samplePath(path, limit) {
    if (path.length <= limit) return path;
    return Array.from({ length: limit }, (_, step) =>
      path[Math.round((step * (path.length - 1)) / (limit - 1))],
    );
  }

  function layoutCandies(total, bounds) {
    if (total <= 0) return [];
    const left = bounds.paddingX;
    const right = bounds.width - bounds.paddingX;
    const floor = bounds.paddingBottom;
    const ceiling = bounds.height - bounds.paddingTop;
    const innerWidth = right - left;
    const innerHeight = ceiling - floor;
    const rise = bounds.floorRise ?? 0;

    let radius = Math.min(
      MAX_CANDY_SIZE / 2,
      innerWidth / 2,
      innerHeight / 2,
      Math.sqrt((POUR_DENSITY * innerWidth * innerHeight) / (total * Math.PI)),
    );
    let placed = pour(total, radius, left, right, floor, rise);

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const pileTop = placed.reduce((highest, candy) => Math.max(highest, candy.y + candy.radius), floor);
      if (pileTop <= ceiling) break;
      radius *= Math.max(0.5, Math.sqrt(innerHeight / (pileTop - floor)) * 0.98);
      placed = pour(total, radius, left, right, floor, rise);
    }

    return placed.map((candy, index) => ({
      bottom: clamp(candy.y - candy.radius, floor, ceiling - candy.radius * 2),
      index,
      left: clamp(candy.x - candy.radius, left, right - candy.radius * 2),
      path: samplePath(candy.path, PATH_POINTS).map(([pathX, pathY]) => ({
        bottom: pathY - candy.radius,
        left: pathX - candy.radius,
      })),
      rotation: (noise(index, 5) - 0.5) * 24,
      size: candy.radius * 2,
      zIndex: index,
    }));
  }

  function visibleRollPath(path) {
    const last = path.length - 1;
    if (last < 1) return [path[0], path[0]];
    const start = path.findIndex((step) => step.bottom > path[last].bottom + DESCENT_THRESHOLD);
    if (start < 0) return [path[last], path[last]];
    return path.slice(start);
  }

  function computeCandyRoll(candy) {
    const steps = visibleRollPath(candy.path);
    const radius = candy.size / 2;
    const last = Math.max(1, steps.length - 1);
    const angles = steps.map(
      (step) => `${(candy.rotation + (radius > 0 ? ((step.left - candy.left) / radius) * (180 / Math.PI) : 0)).toFixed(2)}deg`,
    );
    const travelled = steps.reduce(
      (acc, step, at) => (at === 0 ? 0 : acc + Math.hypot(step.left - steps[at - 1].left, step.bottom - steps[at - 1].bottom)),
      0,
    );
    return {
      angles,
      duration: Math.min(MAX_ROLL_DURATION, ROLL_BASE_DURATION + travelled * ROLL_DURATION_PER_PX),
      fadeIn: [steps[0].bottom - MOUTH_FADE_FROM, steps[0].bottom - MOUTH_FADE_TO],
      offsetsX: steps.map((step) => step.left - candy.left),
      offsetsY: steps.map((step) => candy.bottom - step.bottom),
      progress: steps.map((_, step) => step / last),
    };
  }

  const jarTemplate = document.querySelector('#app-jar-template');
  const jarGradientIds = ['jar-back', 'glass-edge', 'glass-floor', 'rim-fill'];
  const jarInstances = new Map();

  function mountCandyJar(target, candies, jarIndex) {
    if (!(jarTemplate instanceof HTMLTemplateElement)) return null;
    const fragment = jarTemplate.content.cloneNode(true);
    const prefix = `jar-${jarIndex}-`;
    jarGradientIds.forEach((id) => {
      const gradient = fragment.querySelector(`#${id}`);
      if (gradient) gradient.id = `${prefix}${id}`;
      fragment.querySelectorAll(`[fill="url(#${id})"]`).forEach((node) => node.setAttribute('fill', `url(#${prefix}${id})`));
      fragment.querySelectorAll(`[stroke="url(#${id})"]`).forEach((node) => node.setAttribute('stroke', `url(#${prefix}${id})`));
    });

    const well = fragment.querySelector('[data-candy-well]');
    const countEl = fragment.querySelector('[data-jar-count]');
    const layout = layoutCandies(candies.length, CANDY_BOUNDS);
    const placed = candies.map((color, index) => ({
      color,
      ...layout[index],
    }));

    if (countEl) {
      countEl.innerHTML = `우리가 함께 모은 캔디 <strong class="app-jar-count-num">${placed.length}</strong>개`;
    }

    const pieces = [];
    if (well) {
      well.replaceChildren();
      placed.forEach((candy) => {
        const piece = document.createElement('span');
        piece.className = 'app-candy';
        piece.style.left = `${candy.left.toFixed(2)}px`;
        piece.style.bottom = `${candy.bottom.toFixed(2)}px`;
        piece.style.width = `${candy.size.toFixed(2)}px`;
        piece.style.height = `${candy.size.toFixed(2)}px`;
        piece.style.zIndex = String(candy.zIndex);

        const body = document.createElement('span');
        body.className = 'app-candy-body';

        const surface = document.createElement('span');
        surface.className = `app-candy-surface candy-${candy.color}`;
        surface.style.setProperty('--candy', `var(--candy-${candy.color})`);

        const highlight = document.createElement('span');
        highlight.className = 'app-candy-highlight';
        const glow = document.createElement('span');
        glow.className = 'app-candy-glow';
        surface.append(highlight, glow);

        if (candy.index % 3 === 0) {
          const mark = document.createElement('span');
          mark.className = 'app-candy-mark';
          mark.style.fontSize = `${(candy.size * 0.38).toFixed(2)}px`;
          mark.textContent = '✦';
          surface.append(mark);
        }

        body.append(surface);
        piece.append(body);
        well.append(piece);

        pieces.push({ candy, piece, body, surface, roll: computeCandyRoll(candy) });
      });
    }

    target.replaceChildren(fragment);
    const instance = { target, pieces, hasPlayed: false };
    jarInstances.set(target, instance);
    return instance;
  }

  function applyStaticJar(instance) {
    instance.pieces.forEach(({ candy, piece, body, surface }) => {
      piece.getAnimations().forEach((anim) => anim.cancel());
      body.getAnimations().forEach((anim) => anim.cancel());
      surface.getAnimations().forEach((anim) => anim.cancel());
      piece.style.opacity = '1';
      piece.style.transform = 'none';
      body.style.transform = `rotate(${candy.rotation.toFixed(2)}deg)`;
      surface.style.transform = 'scale(1)';
    });
  }

  function playCandyJar(target) {
    const instance = jarInstances.get(target);
    if (!instance) return;
    if (reducedMotionQuery.matches || typeof HTMLElement.prototype.animate !== 'function') {
      applyStaticJar(instance);
      instance.hasPlayed = true;
      return;
    }

    const total = instance.pieces.length;
    const perCandyDelay = Math.min(FALL_STAGGER, MAX_FALL_DELAY / Math.max(1, total));
    instance.hasPlayed = true;

    instance.pieces.forEach(({ candy, piece, body, surface, roll }) => {
      piece.getAnimations().forEach((anim) => anim.cancel());
      body.getAnimations().forEach((anim) => anim.cancel());
      surface.getAnimations().forEach((anim) => anim.cancel());

      piece.style.opacity = '';
      piece.style.transform = '';
      body.style.transform = '';
      surface.style.transform = '';

      const delay = candy.index * perCandyDelay;
      const fracStart = clamp((roll.fadeIn[0] + FALL_HEIGHT) / FALL_HEIGHT, 0.02, 0.96);
      const fracEnd = clamp((roll.fadeIn[1] + FALL_HEIGHT) / FALL_HEIGHT, fracStart + 0.02, 0.99);
      const tFadeStart = Math.sqrt(fracStart);
      const tFadeEnd = Math.sqrt(fracEnd);

      piece.animate(
        [
          { transform: `translateY(${-FALL_HEIGHT}px)` },
          { transform: 'translateY(0px)' },
        ],
        {
          duration: FALL_DURATION,
          delay,
          easing: 'cubic-bezier(0.5, 0, 0.75, 0)',
          fill: 'both',
        },
      );

      piece.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: tFadeStart },
          { opacity: 1, offset: tFadeEnd },
          { opacity: 1, offset: 1 },
        ],
        {
          duration: FALL_DURATION,
          delay,
          easing: 'linear',
          fill: 'both',
        },
      );

      const rollKeyframes = roll.progress.map((p, idx) => ({
        offset: 1 - Math.sqrt(Math.max(0, 1 - p)),
        transform: `translate(${roll.offsetsX[idx].toFixed(2)}px, ${roll.offsetsY[idx].toFixed(2)}px) rotate(${roll.angles[idx]})`,
      }));
      body.animate(rollKeyframes, {
        duration: roll.duration,
        delay: delay + FALL_DURATION,
        easing: 'linear',
        fill: 'both',
      });

      surface.animate(
        [
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(0.94)', offset: 0.35 },
          { transform: 'scale(1)', offset: 1 },
        ],
        {
          duration: 260,
          delay: delay + FALL_DURATION,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both',
        },
      );
    });
  }

  document.querySelectorAll('[data-app-jar]').forEach((target, jarIndex) => {
    const raw = target.getAttribute('data-candies');
    const candies = raw
      ? raw.split(',').map((item) => item.trim()).filter(Boolean)
      : CANDY_ORDER;
    const instance = mountCandyJar(target, candies, jarIndex);
    if (instance && reducedMotionQuery.matches) {
      applyStaticJar(instance);
    }
  });

  const featureJar = document.querySelector('#features [data-app-jar]');
  if (featureJar) {
    const checkFeatureJar = () => {
      const instance = jarInstances.get(featureJar);
      if (!instance || instance.hasPlayed) return;
      const rect = featureJar.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
        playCandyJar(featureJar);
      }
    };

    if ('IntersectionObserver' in window) {
      const featureObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playCandyJar(featureJar);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.2 });
      featureObserver.observe(featureJar);
    }
    checkFeatureJar();
    window.addEventListener('scroll', checkFeatureJar, { passive: true });
  }

  /* Guide Section: Desktop 3D Dial vs Mobile Onboarding Pager */
  const guideTrack = document.querySelector('[data-guide-track]');
  const guideSticky = guideTrack?.querySelector('.guide-sticky');
  const guideStage = document.querySelector('.guide-stage');
  const guideDial = document.querySelector('[data-guide-dial]');
  const guideSteps = [...document.querySelectorAll('[data-guide-step]')];
  const guidePreviews = [...document.querySelectorAll('[data-guide-preview]')];
  const guideMobilePanel = document.querySelector('[data-guide-mobile]');
  const guideMobileNum = document.querySelector('[data-guide-mobile-num]');
  const guideMobileTitle = document.querySelector('[data-guide-mobile-title]');
  const guideMobileDesc = document.querySelector('[data-guide-mobile-desc]');
  const guideDots = [...document.querySelectorAll('[data-guide-dot]')];
  const guidePrevBtn = document.querySelector('[data-guide-prev]');
  const guideNextBtn = document.querySelector('[data-guide-next]');
  const guideJar = document.querySelector('#guide [data-app-jar]');

  const DIAL_START_PAD = 0.08;
  const DIAL_END_PAD = 0.1;
  const DIAL_USABLE = 1 - DIAL_START_PAD - DIAL_END_PAD;
  const DIAL_LERP = 0.14;
  const SWIPE_THRESHOLD = 40;

  let currentGuideIndex = -1;
  let targetDialPos = Math.max(0, guidePreviews.findIndex((preview) => preview.classList.contains('is-active')));
  let renderedDialPos = targetDialPos;
  let dialRafId = 0;

  function isDesktopDial() {
    return Boolean(
      guideTrack &&
      guideSticky &&
      guideDial &&
      window.innerWidth > 960 &&
      window.innerHeight >= 680,
    );
  }

  function getDesktopScrollProgress() {
    if (!guideTrack || !guideSticky || guideSteps.length < 2) return 0;
    const travel = guideTrack.offsetHeight - guideSticky.offsetHeight;
    if (travel <= 0) return 0;
    const raw = Math.min(1, Math.max(0, -guideTrack.getBoundingClientRect().top / travel));
    const normalized = Math.min(1, Math.max(0, (raw - DIAL_START_PAD) / DIAL_USABLE));
    return normalized * (guideSteps.length - 1);
  }

  function updateMobilePagerUI(index) {
    const step = GUIDE_STEPS[index];
    if (!step) return;
    if (guideMobileNum) guideMobileNum.textContent = step.num;
    if (guideMobileTitle) guideMobileTitle.textContent = step.title;
    if (guideMobileDesc) guideMobileDesc.textContent = step.description;

    guideDots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });

    if (guidePrevBtn) {
      guidePrevBtn.disabled = index === 0;
    }
    if (guideNextBtn) {
      const isLast = index === GUIDE_STEPS.length - 1;
      guideNextBtn.textContent = isLast ? '앱 다운로드 ↓' : '다음';
      guideNextBtn.dataset.action = isLast ? 'download' : 'next';
    }
  }

  function activateGuidePreview(nextIndex, force = false) {
    const index = clamp(nextIndex, 0, Math.max(0, guidePreviews.length - 1));
    if (!guidePreviews[index]) return;
    if (!force && index === currentGuideIndex) return;
    currentGuideIndex = index;

    guideSteps.forEach((step, stepIndex) => {
      const active = stepIndex === index;
      step.classList.toggle('active', active);
      step.setAttribute('aria-pressed', String(active));
    });

    guidePreviews.forEach((preview, previewIndex) => {
      preview.classList.toggle('is-active', previewIndex === index);
    });

    updateMobilePagerUI(index);

    if (index === 4 && guideJar) {
      playCandyJar(guideJar);
    }
  }

  function clearDialTransforms() {
    guideSteps.forEach((step) => {
      step.style.transform = '';
      step.style.opacity = '';
      step.style.zIndex = '';
    });
  }

  function applyDialTransforms(pos) {
    if (!isDesktopDial()) {
      clearDialTransforms();
      return;
    }
    const stride = window.innerHeight > 800 ? 124 : 112;
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
    if (isDesktopDial()) {
      targetDialPos = getDesktopScrollProgress();
    } else {
      dialRafId = 0;
      clearDialTransforms();
      return;
    }

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
    if (!dialRafId && isDesktopDial()) {
      dialRafId = window.requestAnimationFrame(tickDial);
    }
  }

  function selectGuideStep(nextIndex) {
    const index = clamp(nextIndex, 0, Math.max(0, guidePreviews.length - 1));
    if (isDesktopDial()) {
      const travel = guideTrack.offsetHeight - guideSticky.offsetHeight;
      const ratio = guideSteps.length > 1
        ? DIAL_START_PAD + (index / (guideSteps.length - 1)) * DIAL_USABLE
        : 0;
      const targetY = window.scrollY + guideTrack.getBoundingClientRect().top + ratio * travel;
      window.scrollTo({ top: targetY, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
    } else {
      targetDialPos = index;
      renderedDialPos = index;
      activateGuidePreview(index);
    }
  }

  if (guidePreviews.length) {
    if (isDesktopDial()) {
      targetDialPos = getDesktopScrollProgress();
      renderedDialPos = targetDialPos;
    }
    applyDialTransforms(renderedDialPos);
    activateGuidePreview(Math.round(renderedDialPos), true);

    guideSteps.forEach((step, index) => step.addEventListener('click', () => selectGuideStep(index)));
    guideDots.forEach((dot, index) => dot.addEventListener('click', () => selectGuideStep(index)));

    guidePrevBtn?.addEventListener('click', () => selectGuideStep(currentGuideIndex - 1));
    guideNextBtn?.addEventListener('click', () => {
      if (guideNextBtn.dataset.action === 'download') {
        const downloadSection = document.querySelector('#download');
        downloadSection?.scrollIntoView({
          behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
          block: 'start',
        });
        return;
      }
      selectGuideStep(currentGuideIndex + 1);
    });

    guideDial?.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectGuideStep(currentGuideIndex + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectGuideStep(currentGuideIndex - 1);
      }
    });

    let swipeStartX = 0;
    let swipeStartY = 0;
    let hasSwipeStart = false;

    const handleSwipeStart = (event) => {
      if (isDesktopDial()) return;
      const touch = event.touches?.[0];
      if (!touch) return;
      swipeStartX = touch.clientX;
      swipeStartY = touch.clientY;
      hasSwipeStart = true;
    };

    const handleSwipeEnd = (event) => {
      if (isDesktopDial() || !hasSwipeStart) return;
      hasSwipeStart = false;
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      const deltaX = swipeStartX - touch.clientX;
      const deltaY = swipeStartY - touch.clientY;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) return;
      selectGuideStep(currentGuideIndex + (deltaX > 0 ? 1 : -1));
    };

    guideStage?.addEventListener('touchstart', handleSwipeStart, { passive: true });
    guideStage?.addEventListener('touchend', handleSwipeEnd, { passive: true });
    guideMobilePanel?.addEventListener('touchstart', handleSwipeStart, { passive: true });
    guideMobilePanel?.addEventListener('touchend', handleSwipeEnd, { passive: true });

    window.addEventListener('scroll', () => {
      if (isDesktopDial()) scheduleDialTick();
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (isDesktopDial()) {
        targetDialPos = getDesktopScrollProgress();
        renderedDialPos = targetDialPos;
        applyDialTransforms(renderedDialPos);
        activateGuidePreview(Math.round(renderedDialPos));
      } else {
        clearDialTransforms();
      }
    }, { passive: true });
  }
})();
