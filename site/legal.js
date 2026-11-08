const documentType = document.body.dataset.document;
const legalTarget = document.querySelector('[data-legal-content]');
const languageButtons = [...document.querySelectorAll('[data-language]')];
const legalMeta = document.querySelector('[data-legal-meta]');
const policyStatus = document.querySelector('[data-policy-status]');
const versionSwitch = document.querySelector('[data-policy-versions]');
let activePolicyView = policyView(window.location.search, window.location.hostname);
let documentRequest = 0;

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      const parsed = new URL(url.replaceAll('&amp;', '&'), window.location.origin);
      if ((parsed.origin === window.location.origin || parsed.origin === 'https://please.yellodevs.space') &&
          ['/terms/', '/privacy/'].includes(parsed.pathname)) {
        const kind = parsed.pathname.slice(1, -1);
        const version = parsed.searchParams.get('version') || (activePolicyView.version === 'v3' ? 'v3' : 'v2');
        return `<a href="${escapeHtml(policyUrl(kind, activePolicyView, version))}">${label}</a>`;
      }
      if (url.startsWith('/')) return `<a href="${url}">${label}</a>`;
      if (url.startsWith('mailto:')) return `<a href="${url}">${label}</a>`;
      if (url.startsWith('https://') || url.startsWith('http://')) return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
      return label;
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function cleanMarkdown(markdown, language) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  return lines.filter((line) => {
    if (line.includes('Public URL:') || line.includes('게시 위치(공개 URL)')) return false;
    if (language === 'ko' && line.startsWith('> 이 문서는')) return false;
    if (language === 'ko' && line.startsWith('> 앱 화면')) return false;
    if (language === 'ko' && line.startsWith('> 게시 위치')) return false;
    return true;
  }).join('\n');
}

function renderMarkdown(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let index = 0;
  let paragraph = [];
  let listStack = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const closeLists = () => {
    while (listStack.length) html.push(`</${listStack.pop()}>`);
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    const unordered = line.match(/^(\s*)[-*]\s+(.+)$/);
    const ordered = line.match(/^(\s*)\d+\.\s+(.+)$/);

    if (!trimmed) {
      flushParagraph();
      closeLists();
      index += 1;
      continue;
    }

    if (trimmed === '---') {
      flushParagraph(); closeLists(); html.push('<hr />'); index += 1; continue;
    }

    if (heading) {
      flushParagraph(); closeLists();
      const level = Math.min(3, heading[1].length);
      if (level > 1) html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      index += 1; continue;
    }

    if (trimmed.startsWith('>')) {
      flushParagraph(); closeLists();
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quote.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      html.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    if (trimmed.startsWith('|') && index + 1 < lines.length && /^\s*\|?[\s:|-]+\|\s*$/.test(lines[index + 1])) {
      flushParagraph(); closeLists();
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(lines[index].trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
        index += 1;
      }
      rows.splice(1, 1);
      const header = rows.shift() || [];
      html.push('<div class="table-scroll"><table><thead><tr>');
      header.forEach((cell) => html.push(`<th>${inlineMarkdown(cell)}</th>`));
      html.push('</tr></thead><tbody>');
      rows.forEach((row) => {
        html.push('<tr>');
        row.forEach((cell) => html.push(`<td>${inlineMarkdown(cell).replaceAll('&lt;br&gt;', '<br>')}</td>`));
        html.push('</tr>');
      });
      html.push('</tbody></table></div>');
      continue;
    }

    if (unordered || ordered) {
      flushParagraph();
      const match = unordered || ordered;
      const type = unordered ? 'ul' : 'ol';
      const depth = Math.floor(match[1].length / 2);
      while (listStack.length > depth + 1) html.push(`</${listStack.pop()}>`);
      if (listStack.length < depth + 1 || listStack[listStack.length - 1] !== type) {
        if (listStack.length === depth + 1) html.push(`</${listStack.pop()}>`);
        html.push(`<${type}>`); listStack.push(type);
      }
      html.push(`<li>${inlineMarkdown(match[2])}</li>`);
      index += 1; continue;
    }

    closeLists();
    paragraph.push(trimmed);
    index += 1;
  }

  flushParagraph();
  closeLists();
  return html.join('');
}

function policyDate(value, language) {
  if (!value) return language === 'en' ? 'To be decided' : '미정';
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'ko-KR', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(new Date(value)) + ' KST';
}

function showPolicyState(view) {
  const en = view.language === 'en';
  const labels = en ? {
    current: 'Current v2', old: 'Previous v2', v3: view.active ? 'Current v3' : view.draft ? 'Review v3' : 'Upcoming v3',
    draft: 'Review copy · Not published. Announcement and effective dates are not yet set.',
    upcoming: 'Upcoming version. The currently effective version remains v2 until the effective date.',
    previous: 'Previous version. View current v3 for the currently effective document.',
    missing: 'This document has not been published. Select the current document above.',
    correction: 'Correction to current processing information; separate from the v3 revision schedule.',
    announcement: 'Terms and privacy update notice',
    correctionLink: 'Notification record retention correction',
  } : {
    current: '현재 v2', old: '이전 v2', v3: view.active ? '현재 v3' : view.draft ? 'v3 검토본' : '시행 예정 v3',
    draft: '검토본 · 미게시. 공고일과 시행일은 아직 정하지 않았습니다.',
    upcoming: '시행 예정 문서입니다. 시행 전까지 현재 유효한 문서는 v2입니다.',
    previous: '이전 문서입니다. 현재 유효한 문서는 v3에서 확인해 주세요.',
    missing: '아직 공개되지 않은 문서입니다. 위에서 현재 문서를 선택해 주세요.',
    correction: '현재 처리 사실의 정정 안내이며, v3 개정 일정과는 별개입니다.',
    announcement: '약관·개인정보 처리방침 개정 안내',
    correctionLink: '알림 처리 기록 보관 안내 정정',
  };
  versionSwitch.replaceChildren();
  versionSwitch.setAttribute('aria-label', en ? 'Document version' : '문서 버전');
  for (const [version, label] of [['v2', view.active ? labels.old : labels.current], ...(view.showV3 ? [['v3', labels.v3]] : [])]) {
    const link = document.createElement('a'); link.href = policyUrl(documentType, view, version);
    link.textContent = label;
    if (view.version === version) link.setAttribute('aria-current', 'page');
    versionSwitch.append(link);
  }
  const message = !view.available ? labels.missing : view.draft ? labels.draft
    : view.version === 'correction' ? labels.correction
    : view.version === 'v3' && !view.active ? labels.upcoming
    : view.version === 'v2' && view.active ? labels.previous : '';
  policyStatus.replaceChildren();
  policyStatus.hidden = !message && !(view.corrected && documentType === 'privacy');
  if (message) { const text = document.createElement('p'); text.textContent = message; policyStatus.append(text); }
  if (view.corrected && documentType === 'privacy' && view.version !== 'correction') {
    const link = document.createElement('a'); link.href = policyUrl(documentType, view, 'correction');
    link.textContent = labels.correctionLink; policyStatus.append(link);
  }
  const heading = document.querySelector('.page-hero h1');
  heading.textContent = view.version === 'correction' ? labels.correctionLink
    : view.version === 'announcement' ? labels.announcement
    : documentType === 'terms' ? en ? 'Terms of Service' : '서비스 이용약관'
    : en ? 'Privacy Policy' : '개인정보 처리방침';
  const description = document.querySelector('.page-hero h1 + p');
  const eyebrow = document.querySelector('.page-hero .eyebrow');
  eyebrow.textContent = view.version === 'correction' ? 'Retention information'
    : view.version === 'announcement' ? 'Policy update' : documentType === 'terms' ? 'Terms of service' : 'Privacy policy';
  description.textContent = view.version === 'correction'
    ? en ? 'A clarification of notification record retention currently in operation.' : '현재 운영 중인 알림 처리 기록의 보관 기준을 정확하게 안내합니다.'
    : view.version === 'announcement'
    ? en ? 'Review the changes for multiple families, profiles and reminders.' : '여러 가족 참여와 프로필·알림에 관한 개정 내용을 안내합니다.'
    : documentType === 'terms'
    ? en ? 'Conditions for using Please! and the rights and responsibilities of users and operators.' : 'Please! 서비스를 이용하기 위한 조건과 운영자·이용자의 권리 및 의무를 안내합니다.'
    : en ? 'How Please! collects, uses, retains and deletes personal information.' : 'Please!가 어떤 정보를 수집하고, 어떻게 이용·보관하며, 언제 파기하는지 안내합니다.';

  if (legalMeta) legalMeta.textContent = view.version === 'v2'
    ? `${en ? 'Effective' : '시행일자'}: ${policyDate(POLICY_RELEASE.v2EffectiveAt, view.language)}`
    : view.version === 'correction'
    ? `${en ? 'Published' : '게시일자'}: ${policyDate(POLICY_RELEASE.correctionPublishedAt, view.language)}`
    : `${en ? 'Published' : '공고일자'}: ${policyDate(POLICY_RELEASE.publishedAt, view.language)} · ${en ? 'Effective' : '시행일자'}: ${policyDate(POLICY_RELEASE.effectiveAt, view.language)}`;
}

async function loadDocument(language) {
  if (!documentType || !legalTarget) return;
  const request = ++documentRequest;
  const params = new URLSearchParams(window.location.search);
  if (language === 'en') params.set('lang', 'en'); else params.delete('lang');
  const view = policyView(params.toString(), window.location.hostname);
  activePolicyView = view;
  showPolicyState(view);
  document.documentElement.lang = language;
  languageButtons.forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
  });
  window.history.replaceState(null, '', `${window.location.pathname}?${params}`);
  legalTarget.setAttribute('aria-busy', 'true');
  legalTarget.innerHTML = `<p class="legal-loading">${language === 'en' ? 'Loading document…' : '문서를 불러오는 중입니다…'}</p>`;
  const source = policySource(documentType, view);
  if (!source) { legalTarget.replaceChildren(); legalTarget.setAttribute('aria-busy', 'false'); return; }
  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error('Document not found');
    const markdown = cleanMarkdown(await response.text(), language)
      .replaceAll('YYYY-MM-DD HH:MM', '미정').replaceAll('YYYY-MM-DD, HH:MM KST (UTC+9)', 'To be decided');
    if (request !== documentRequest) return;
    legalTarget.innerHTML = renderMarkdown(markdown);
  } catch {
    if (request !== documentRequest) return;
    legalTarget.innerHTML = language === 'en'
      ? '<p>Unable to load the document. Please contact <a href="mailto:yellodevs@gmail.com">yellodevs@gmail.com</a>.</p>'
      : '<p>문서를 불러오지 못했습니다. <a href="mailto:yellodevs@gmail.com">yellodevs@gmail.com</a>으로 문의해 주세요.</p>';
  } finally { if (request === documentRequest) legalTarget.setAttribute('aria-busy', 'false'); }
}

languageButtons.forEach(button => button.addEventListener('click', () => loadDocument(button.dataset.language)));
loadDocument(activePolicyView.language);
