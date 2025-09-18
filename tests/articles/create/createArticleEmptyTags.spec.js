import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with empty tags array', async ({ userRequests, registeredUsers }) => {
  const req = userRequests[0];
  const creatorUsername = registeredUsers[0].username;

  const payload = {
    article: {
      title: `Empty Tags ${Date.now()}`,
      description: 'Article without tags',
      body: 'Content body',
      tagList: [],
    },
  };

  const res = await req.post('/api/articles', { data: payload });
  expect(res.status()).toBe(200); // or: expect([200, 201]).toContain(res.status());

  const json = await res.json();

  expect(json).toHaveProperty('article');
  const a = json.article;

  expect(a.title).toBe(payload.article.title);
  expect(a.description).toBe(payload.article.description);
  expect(a.body).toBe(payload.article.body);

  expect(Array.isArray(a.tagList)).toBe(true);
  expect(a.tagList).toEqual([]); // prefer exact empty array

  expect(a.slug).toBeTruthy();

  expect(a).toHaveProperty('author');
  expect(a.author?.username).toBe(creatorUsername);

  expect(a).toHaveProperty('createdAt');
  expect(a).toHaveProperty('updatedAt');
  expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
  expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);
});
