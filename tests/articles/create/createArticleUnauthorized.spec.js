// tests/articles/create/createArticleUnauthorized.spec.js
import { test, expect } from '@playwright/test';

test('Create article unauthorized → 401 + error payload', async ({ request }) => {
  const payload = {
    article: {
      title: `Unauthorized ${Date.now()}`,
      description: 'Should fail without auth',
      body: 'Ignored because no token',
      tagList: ['x'],
    },
  };

  // No Authorization header on purpose
  const res = await request.post('/api/articles', { data: payload });

  expect(res.status()).toBe(401);

  // Checklist: parse and assert error JSON shape
  const json = await res.json().catch(() => null);
  expect(json).toBeTruthy();
  expect(json).toHaveProperty('errors');

  const hasMeaningfulMsg =
    Object.values(json.errors || {}).some(
      v => Array.isArray(v) && v.some(m => String(m).trim().length > 0)
    );

  expect(hasMeaningfulMsg).toBe(true);
});
