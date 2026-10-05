const documentType = document.body.dataset.document;
const legalTarget = document.querySelector('[data-legal-content]');
const languageButtons = [...document.querySelectorAll('[data-language]')];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
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

async function loadDocument(language) {
  if (!documentType || !legalTarget) return;
  legalTarget.innerHTML = '<p class="legal-loading">문서를 불러오는 중입니다…</p>';
  try {
    const response = await fetch(`../content/${documentType}.${language}.md`);
    if (!response.ok) throw new Error('Document not found');
    const markdown = cleanMarkdown(await response.text(), language);
    legalTarget.innerHTML = renderMarkdown(markdown);
    document.documentElement.lang = language;
    languageButtons.forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    window.history.replaceState(null, '', language === 'en' ? '?lang=en' : window.location.pathname);
  } catch {
    legalTarget.innerHTML = '<p>문서를 불러오지 못했습니다. <a href="mailto:yellodevs@gmail.com">yellodevs@gmail.com</a>으로 문의해 주세요.</p>';
  }
}

languageButtons.forEach((button) => button.addEventListener('click', () => loadDocument(button.dataset.language)));
const initialLanguage = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ko';
loadDocument(initialLanguage);
