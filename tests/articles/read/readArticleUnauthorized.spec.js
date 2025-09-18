import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Read existing article by unauthorized user', async ({ userRequests, request }) => {
  // Create an article as an authorized user to get a slug
  const reqAuth = userRequests[0];
  const createPayload = {
    article: {
      title: `Public Read ${Date.now()}`,
      description: 'Anyone should be able to read',
      body: 'Readable without auth',
      tagList: [],
    },
  };

  const createRes = await reqAuth.post('/api/articles', { data: createPayload });
  expect([200, 201]).toContain(createRes.status());

  const created = await createRes.json();
  expect(created).toHaveProperty('article');
  const slug = created.article.slug;
  const expectedAuthor = created.article?.author?.username;
  expect(slug).toBeTruthy();
  expect(expectedAuthor).toBeTruthy();

  // Read without auth (built-in `request` has baseURL configured)
  const readRes = await request.get(`/api/articles/${slug}`);
  const status = readRes.status();

  if (status === 200) {
    const readBody = await readRes.json();
    expect(readBody).toHaveProperty('article');
    const a = readBody.article;

    // Required fields
    expect(a.slug).toBe(slug);
    expect(a.title).toBeTruthy();
    expect(a.description).toBeTruthy();
    expect(a.body).toBeTruthy();
    expect(Array.isArray(a.tagList)).toBe(true);
    expect(a.author?.username).toBe(expectedAuthor);
    expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
    expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);

    // Reader-perspective defaults for anonymous
    expect(a.favorited).toBe(false);
    expect(typeof a.favoritesCount).toBe('number');
    return;
  }

  if (status === 401) {
    const json = await readRes.json().catch(() => null);
    expect(json).toBeTruthy();
    expect(json).toHaveProperty('errors');
    const hasMeaningfulMsg =
      Object.values(json.errors || {}).some(
        v => Array.isArray(v) && v.some(m => String(m).trim().length > 0)
      );
    expect(hasMeaningfulMsg).toBe(true);
    return;
  }

  const text = await readRes.text().catch(() => '<no body>');
  throw new Error(`Unexpected status ${status} for GET /api/articles/${slug}\n${text}`);
});
