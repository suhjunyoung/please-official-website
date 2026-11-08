const { test } = require('node:test');
const assert = require('node:assert/strict');
const { POLICY_RELEASE, policyView, policyUrl, policySource } = require('../site/policy-release.js');

const schedule = { ...POLICY_RELEASE,
  publishedAt: '2027-01-10T09:00:00+09:00', effectiveAt: '2027-01-17T09:00:00+09:00' };
const published = Date.parse(schedule.publishedAt);
const effective = Date.parse(schedule.effectiveAt);
const view = (search, now = published, host = 'please.yellodevs.space', config = schedule) =>
  policyView(search, host, now, config);

test('unset dates keep current v2 and do not publish v3 through a query parameter', () => {
  assert.equal(view('', effective, undefined, POLICY_RELEASE).version, 'v2');
  for (const search of ['?version=v3', '?preview=v3', '?version=v3&preview=v3']) {
    const result = view(search, effective, undefined, POLICY_RELEASE);
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
  const result = view('?preview=v3', effective, '127.0.0.1', POLICY_RELEASE);
  assert.equal(result.version, 'v3'); assert.equal(result.draft, true); assert.equal(result.active, false);
  const old = view('?version=v2&preview=v3', effective, 'localhost', POLICY_RELEASE);
  assert.equal(old.draft, false); assert.equal(old.showV3, true);
  assert.equal(policySource('privacy', result), '/content/v3/privacy.ko.md');
});
test('language and legal cross-links preserve exact versions and local review context', () => {
  const result = view('?preview=v3&lang=en', effective, 'localhost', POLICY_RELEASE);
  assert.equal(policyUrl('terms', result), '/terms/?version=v3&lang=en&preview=v3');
  assert.equal(policySource('privacy', result), '/content/v3/privacy.en.md');
  assert.equal(policyUrl('privacy', result, 'v2'), '/privacy/?version=v2&lang=en&preview=v3');
});
test('correction has its own publication boundary independent of v3', () => {
  const config = { ...POLICY_RELEASE, correctionPublishedAt: schedule.publishedAt };
  assert.equal(view('?version=correction', published - 1, undefined, config).available, false);
  const result = view('?version=correction&lang=en', published, undefined, config);
  assert.equal(result.announced, false); assert.equal(result.corrected, true);
  assert.equal(policySource('privacy', result), '/content/corrections/notification-retention.en.md');
});
test('unknown versions, hosts and document types cannot select arbitrary sources', () => {
  assert.equal(view('?preview=v3', effective, 'localhost.evil.example', POLICY_RELEASE).draft, false);
  assert.equal(policySource('privacy', view('?version=../../other', effective)), null);
  assert.equal(policySource('../private', view('')), null);
});
