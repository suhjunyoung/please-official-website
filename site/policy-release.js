/* Prepared dates are agreed; exact publication/effective times remain unset. */
const POLICY_RELEASE = Object.freeze({
  v2EffectiveAt: '2026-10-12T09:00:00+09:00',
  publishedDate: '2026-11-12',
  effectiveDate: '2026-11-19',
  publishedAt: '2026-11-12T23:30:00+09:00',
  effectiveAt: '2026-11-19T23:30:00+09:00',
  correctionPublishedAt: '2026-11-12T23:30:00+09:00',
});

function policyView(search, hostname, now = Date.now(), schedule = POLICY_RELEASE) {
  const params = new URLSearchParams(search);
  const language = params.get('lang') === 'en' ? 'en' : 'ko';
  const local = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(hostname);
  const preview = local ? params.get('preview') : null;
  const parsed = value => typeof value === 'string' && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(value)
    ? Date.parse(value) : NaN;
  const published = parsed(schedule.publishedAt);
  const effective = parsed(schedule.effectiveAt);
  const validSchedule = Number.isFinite(published) && Number.isFinite(effective)
    && effective - published >= 7 * 24 * 60 * 60 * 1000;
  const announced = validSchedule && now >= published;
  const active = announced && now >= effective;
  const corrected = Number.isFinite(parsed(schedule.correctionPublishedAt))
    && now >= parsed(schedule.correctionPublishedAt);
  const review = ['v3', 'announcement', 'correction'].includes(preview);
  const version = params.get('version') || (review ? preview : active ? 'v3' : 'v2');
  const draft = review && version !== 'v2';
  const available = version === 'v2' || (draft || announced) && ['v3', 'announcement'].includes(version)
    || (draft || corrected) && version === 'correction';
  return { language, version, available, draft, announced, active, corrected,
    showV3: announced || review, review, preview: review ? preview : null };
}

function policyUrl(kind, view, version = view.version) {
  const query = new URLSearchParams({ version });
  if (view.language === 'en') query.set('lang', 'en');
  if (view.review) query.set('preview', version === 'v2' ? 'v3' : version);
  return `/${kind}/?${query}`;
}

function policySource(kind, view) {
  if (!view.available || !['terms', 'privacy'].includes(kind)) return null;
  const suffix = `${view.language}.md`;
  if (view.version === 'v2') return `/content/${kind}.${suffix}`;
  if (view.version === 'v3') return `/content/v3/${kind}.${suffix}`;
  if (view.version === 'announcement') return `/content/v3/announcement.${suffix}`;
  if (view.version === 'correction') return `/content/corrections/notification-retention.${suffix}`;
  return null;
}

function policyDate(value, language) {
  if (!value) return language === 'en' ? 'To be decided' : '미정';
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'ko-KR', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    ...(dateOnly ? {} : { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }),
  }).format(new Date(dateOnly ? `${value}T00:00:00+09:00` : value)) + ' KST';
}

if (typeof module !== 'undefined') module.exports = { POLICY_RELEASE, policyView, policyUrl, policySource, policyDate };
