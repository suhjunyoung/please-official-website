const assert = require('node:assert/strict');
const { POLICY_RELEASE: schedule } = require('../site/policy-release.js');
const timestamp = value => typeof value === 'string' && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(value)
  ? Date.parse(value) : NaN;
const published = timestamp(schedule.publishedAt);
const effective = timestamp(schedule.effectiveAt);
assert.ok(Number.isFinite(published) && Number.isFinite(effective),
  'Review-only branch: confirm exact publication/effective times before deployment.');
assert.ok(effective - published >= 7 * 86400000, 'The configured notice period must be at least seven days.');
const fs = require('node:fs');
const path = require('node:path');
for (const name of fs.readdirSync(path.join(__dirname, '../site/content/v3'))) {
  const content = fs.readFileSync(path.join(__dirname, '../site/content/v3', name), 'utf8');
  assert.ok(!content.includes('YYYY-MM-DD'), `Replace draft dates before deployment: v3/${name}`);
}
console.log('Policy release dates and public copies checked.');
