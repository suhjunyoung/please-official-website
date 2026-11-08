const assert = require('node:assert/strict');
const { POLICY_RELEASE: schedule } = require('../site/policy-release.js');
const timestamp = value => typeof value === 'string' && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(value)
  ? Date.parse(value) : NaN;
const published = timestamp(schedule.publishedAt);
const effective = timestamp(schedule.effectiveAt);
assert.ok(Number.isFinite(published) && Number.isFinite(effective),
  'Review-only branch: agree announcement/effective dates before deployment.');
assert.ok(effective - published >= 7 * 86400000, 'The configured notice period must be at least seven days.');
assert.ok(Number.isFinite(timestamp(schedule.correctionPublishedAt)),
  'Choose and record the separate correction publication date before deployment.');
const fs = require('node:fs');
const path = require('node:path');
for (const folder of ['v3', 'corrections']) {
  for (const name of fs.readdirSync(path.join(__dirname, '../site/content', folder))) {
    const content = fs.readFileSync(path.join(__dirname, '../site/content', folder, name), 'utf8');
    assert.ok(!content.includes('YYYY-MM-DD'), `Replace draft dates before deployment: ${folder}/${name}`);
  }
}
console.log('Policy release dates and public copies checked.');
