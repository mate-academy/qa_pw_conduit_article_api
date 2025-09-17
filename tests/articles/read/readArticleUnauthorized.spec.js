import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { request as pwRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Read existing article by unauthorized user', async ({ userRequests }) => {
  const req = userRequests[0];

  // Create an article as an authorized user to get a slug
  const createPayload = {
    article: {
      title: `Public Read ${Date.now()}`,
      description: 'Anyone should be able to read',
      body: 'Readable without auth',
      tagList: [],
    },
  };
  const createRes = await req.post('/api/articles', { data: createPayload });
  expect(createRes.status()).toBe(200);
  const created = await createRes.json();
  const slug = created.article.slug;

  // Read it with NO auth
  const noAuth = await pwRequest.newContext();
  try {
    const readRes = await noAuth.get(`/api/articles/${slug}`);
    expect(readRes.status()).toBe(200);
    const readBody = await readRes.json();
    expect(readBody.article.slug).toBe(slug);
  } finally {
    await noAuth.dispose();
  }
});
