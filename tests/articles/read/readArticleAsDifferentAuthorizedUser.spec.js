import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 2 });

test('Read article created by user1 as authorized user2', async ({ userRequests }) => {
  const authorReq = userRequests[0];
  const readerReq = userRequests[1];

  // Create as user1
  const createPayload = {
    article: {
      title: `Cross Read ${Date.now()}`,
      description: 'Different user should read',
      body: 'Reader is authorized but different user',
      tagList: ['x'],
    },
  };
  const createRes = await authorReq.post('/api/articles', { data: createPayload });
  expect(createRes.status()).toBe(200);
  const created = await createRes.json();
  const slug = created.article.slug;

  // Read as user2 (authorized)
  const readRes = await readerReq.get(`/api/articles/${slug}`);
  expect(readRes.status()).toBe(200);
  const readBody = await readRes.json();
  expect(readBody.article.slug).toBe(slug);
  expect(readBody.article.title).toBe(createPayload.article.title);
});
