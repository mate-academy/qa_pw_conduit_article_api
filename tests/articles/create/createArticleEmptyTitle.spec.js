import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty title → validation error (422)', async ({ userRequests }) => {
  const req = userRequests[0];

  const payload = {
    article: {
      title: '',
      description: 'Title is intentionally empty',
      body: 'Some article body',
      tagList: ['t1', 't2'],
    },
  };

  const res = await req.post('/api/articles', { data: payload });

  if (res.status() !== 422) {
    const text = await res.text().catch(() => '<no body>');
    test.fail(true, `Backend returned ${res.status()} for empty title, expected 422.\nResponse:\n${text}`);
  }

  expect(res.status()).toBe(422);

  const json = await res.json();
  expect(json).toHaveProperty('errors');
  const msgs = json.errors?.title ?? [];
  expect(Array.isArray(msgs)).toBe(true);
  expect(msgs.length).toBeGreaterThan(0);
  expect(msgs.every(m => typeof m === 'string' && m.trim().length > 0))
  .toBe(true);
});
