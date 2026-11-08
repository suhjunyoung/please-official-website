/* Dates stay null until the announcement and effective schedule is agreed. */
const POLICY_RELEASE = Object.freeze({
  v2EffectiveAt: '2026-10-12T09:00:00+09:00',
  publishedAt: null,
  effectiveAt: null,
  correctionPublishedAt: null,
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

if (typeof module !== 'undefined') module.exports = { POLICY_RELEASE, policyView, policyUrl, policySource };
