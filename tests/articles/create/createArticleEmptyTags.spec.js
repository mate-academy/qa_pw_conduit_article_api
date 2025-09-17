import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty tags array', async ({ userRequests }) => {
  const req = userRequests[0];

  const payload = {
    article: {
      title: `Empty Tags ${Date.now()}`,
      description: 'Article without tags',
      body: 'Content body',
      tagList: [],
    },
  };

  const res = await req.post('/api/articles', { data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.article.title).toBe(payload.article.title);
  expect(Array.isArray(body.article.tagList)).toBe(true);
  expect(body.article.tagList.length).toBe(0);
});
