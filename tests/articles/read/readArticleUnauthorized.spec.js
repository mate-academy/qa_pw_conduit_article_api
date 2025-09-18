import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { request as pwRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Read existing article by unauthorized user', async ({ userRequests }) => {
  const req = userRequests[0];

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
  expect(created).toHaveProperty('article');
  const slug = created.article.slug;
  const expectedAuthor = created.article?.author?.username;

  const noAuth = await pwRequest.newContext();
  try {
    const readRes = await noAuth.get(`/api/articles/${slug}`);
    expect(readRes.status()).toBe(200);

    const readBody = await readRes.json();
    expect(readBody).toHaveProperty('article');
    const a = readBody.article;

    expect(a.slug).toBe(slug);
    expect(a.title).toBeTruthy();
    expect(a.description).toBeTruthy();
    expect(a.body).toBeTruthy();
    expect(Array.isArray(a.tagList)).toBe(true);
    expect(a.author?.username).toBe(expectedAuthor);
    expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
    expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);
  } finally {
    await noAuth.dispose();
  }
});
