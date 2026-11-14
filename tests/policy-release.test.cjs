const { test } = require('node:test');
const assert = require('node:assert/strict');
const { POLICY_RELEASE, policyView, policyUrl, policySource, policyDate } = require('../site/policy-release.js');

const unsetSchedule = { ...POLICY_RELEASE, publishedAt: null, effectiveAt: null };
const schedule = { ...POLICY_RELEASE,
  publishedAt: '2027-01-10T09:00:00+09:00', effectiveAt: '2027-01-17T09:00:00+09:00' };
const published = Date.parse(schedule.publishedAt);
const effective = Date.parse(schedule.effectiveAt);
const view = (search, now = published, host = 'please.yellodevs.space', config = schedule) =>
  policyView(search, host, now, config);

test('unset dates keep current v2 and do not publish v3 through a query parameter', () => {
  assert.equal(view('', effective, undefined, unsetSchedule).version, 'v2');
  for (const search of ['?version=v3', '?preview=v3', '?version=v3&preview=v3']) {
    const result = view(search, effective, undefined, unsetSchedule);
    assert.equal(result.showV3, false);
    if (search.includes('version=')) assert.equal(policySource('privacy', result), null);
  }
});
test('publication boundary exposes upcoming v3 while default remains v2', () => {
  assert.equal(view('', published - 1).showV3, false);
  assert.equal(view('', published).showV3, true);
  assert.equal(view('', published).version, 'v2');
  assert.equal(view('?version=v3', published).available, true);
});
test('effective boundary changes default while explicit v2 stays available', () => {
  assert.equal(view('', effective - 1).version, 'v2');
  assert.equal(view('', effective).version, 'v3');
  assert.equal(view('?version=v2', effective).version, 'v2');
  assert.equal(policySource('terms', view('?version=v2', effective)), '/content/terms.ko.md');
});
test('missing, invalid, unzoned or shorter-than-seven-day schedules fail closed', () => {
  for (const config of [
    { ...schedule, publishedAt: null }, { ...schedule, effectiveAt: 'bad' },
    { ...schedule, effectiveAt: '2027-01-17T09:00:00' },
    { ...schedule, effectiveAt: '2027-01-17T08:59:59+09:00' },
  ]) assert.equal(view('?version=v3', effective, undefined, config).available, false);
});
test('localhost review switches versions without pretending v3 is effective', () => {
  const result = view('?preview=v3', effective, '127.0.0.1', unsetSchedule);
  assert.equal(result.version, 'v3'); assert.equal(result.draft, true); assert.equal(result.active, false);
  const old = view('?version=v2&preview=v3', effective, 'localhost', unsetSchedule);
  assert.equal(old.draft, false); assert.equal(old.showV3, true);
  assert.equal(policySource('privacy', result), '/content/v3/privacy.ko.md');
});
test('language and legal cross-links preserve exact versions and local review context', () => {
  const result = view('?preview=v3&lang=en', effective, 'localhost', unsetSchedule);
  assert.equal(policyUrl('terms', result), '/terms/?version=v3&lang=en&preview=v3');
  assert.equal(policySource('privacy', result), '/content/v3/privacy.en.md');
  assert.equal(policyUrl('privacy', result, 'v2'), '/privacy/?version=v2&lang=en&preview=v3');
});
test('unknown versions, hosts and document types cannot select arbitrary sources', () => {
  assert.equal(view('?preview=v3', effective, 'localhost.evil.example', unsetSchedule).draft, false);
  assert.equal(policySource('privacy', view('?version=../../other', effective)), null);
  assert.equal(policySource('../private', view('')), null);
});

test('prepared date-only labels do not invent a midnight activation time', () => {
  for (const language of ['ko', 'en']) {
    const date = policyDate(POLICY_RELEASE.effectiveDate, language);
    assert.match(date, /2026/);
    assert.match(date, /11/);
    assert.match(date, /19/);
    assert.doesNotMatch(date, /00:00/);
    assert.match(policyDate('2026-11-19T10:00:00+09:00', language), /10:00/);
  }
  assert.equal(policyView('', 'please.yellodevs.space', Date.parse(POLICY_RELEASE.publishedAt)).version, 'v2');
  assert.equal(policyView('', 'please.yellodevs.space', Date.parse(POLICY_RELEASE.effectiveAt)).version, 'v3');
});
