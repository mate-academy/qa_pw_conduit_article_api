import { test, expect } from '@playwright/test';

test.use({ usersNumber: 1 a});

test('Read article (unauthorized) → 200 with article or 401 with error'
  , async ({ userRequests, request }) => {
  // 1) Create an article as an authorized user
  const reqAuth = userRequests[0];
  const createRes = await reqAuth.post('/api/articles', {
    data: {
      article: {
        title: `ReadUnauth ${Date.now()}`,
        description: 'Desc',
        body: 'Body',
        tagList: [],
      },
    },
  });
  expect(createRes.ok()).toBe(true);
  const created = await createRes.json();
  expect(created).toHaveProperty('article');
  const slug = created.article.slug;
  const expectedAuthor = created.article.author?.username;
  expect(slug).toBeTruthy();
  expect(expectedAuthor).toBeTruthy();

  // 2) Read without auth
  const res = await request.get(`/api/articles/${slug}`);
  const status = res.status();

  if (status === 200) {
    const json = await res.json();
    expect(json).toHaveProperty('article');
    const a = json.article;

    expect(a.slug).toBe(slug);
    expect(a.title).toBeTruthy();
    expect(a.description).toBeTruthy();
    expect(a.body).toBeTruthy();
    expect(Array.isArray(a.tagList)).toBe(true);

    expect(a.author?.username).toBe(expectedAuthor);

    expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
    expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);

    expect(a.favorited).toBe(false);
    expect(typeof a.favoritesCount).toBe('number');
    return;
  }

  if (status === 401) {
    const json = await res.json().catch(() => null);
    expect(json).toBeTruthy();
    expect(json).toHaveProperty('errors');
    const hasMeaningfulMsg =
      Object.values(json.errors || {}).some(
        v => Array.isArray(v) && v.some(m => String(m).trim().length > 0)
      );
    expect(hasMeaningfulMsg).toBe(true);
    return;
  }

  const text = await res.text().catch(() => '<no body>');
  test.fail(true, `Unexpected status ${status} for GET /api/articles/${slug}\n${text}`);
});
