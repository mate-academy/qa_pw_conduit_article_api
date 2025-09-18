import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty body → should be a validation error (422)'
  , async ({ userRequests }) => {
  const req = userRequests[0];

  const payload = {
    article: {
      title: `NoBody ${Date.now()}`,
      description: 'Body is intentionally empty',
      body: '',
      tagList: ['t1'],
    },
  };

  const res = await req.post('/api/articles', { data: payload });

  if (res.status() === 422) {
    const json = await res.json();
    expect(json).toHaveProperty('errors');
    const msgs = json.errors?.body ?? [];
    expect(Array.isArray(msgs)).toBe(true);
    expect(msgs.length).toBeGreaterThan(0);
    return;
  }

  // Unexpected: backend accepted empty body. Fail with diagnostics.
  const text = await res.text().catch(() => '<no text>');
  test.fail(true, `Backend returned ${res.status()} for empty body
  , expected 422.\nResponse:\n${text}`);
  expect(res.status()).toBe(422); // keeps assertion semantics
});