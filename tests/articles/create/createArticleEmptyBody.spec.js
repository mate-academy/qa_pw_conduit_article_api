import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty body → should be a validation error (422)', async ({ userRequests }) => {
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

  if (res.status() !== 422) {
    const text = await res.text().catch(() => '<no text>');
    throw new Error(
      `Expected 422 for empty body, got ${res.status()}.\nResponse:\n${text}`
    );
  }

  const json = await res.json();
  expect(json).toHaveProperty('errors');
  const msgs = json.errors?.body ?? [];
  expect(Array.isArray(msgs)).toBe(true);
  expect(msgs.length).toBeGreaterThan(0);
});
