import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty body', async ({ userRequests }) => {
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
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body?.article?.title).toBe(payload.article.title);
  expect(body?.article?.description).toBe(payload.article.description);
  expect(body?.article?.body).toBe('');
  expect(Array.isArray(body?.article?.tagList)).toBe(true);
});
