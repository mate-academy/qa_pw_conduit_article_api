import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with all fields', async ({ userRequests }) => {
  const req = userRequests[0];

  const payload = {
    article: {
      title: `All Fields ${Date.now()}`,
      description: 'Fully populated article',
      body: 'This is a complete article body.',
      tagList: ['alpha', 'beta', 'gamma'],
    },
  };

  const res = await req.post('/api/articles', { data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.article.title).toBe(payload.article.title);
  expect(body.article.description).toBe(payload.article.description);
  expect(body.article.body).toBe(payload.article.body);
  expect(body.article.tagList).toEqual(payload.article.tagList);
  expect(body.article.slug).toBeTruthy();
});
