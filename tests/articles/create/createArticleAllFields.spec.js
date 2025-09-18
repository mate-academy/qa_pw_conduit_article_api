// tests/articles/create/createArticleAllFields.spec.js
import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

test.use({ usersNumber: 1 });

test('Create article with all fields', async ({ userRequests, registeredUsers }) => {
  const req = userRequests[0];
  const creatorUsername = registeredUsers[0].username;

  const payload = {
    article: {
      title: `All Fields ${Date.now()}`,
      description: 'Fully populated article',
      body: 'This is a complete article body.',
      tagList: ['alpha', 'beta', 'gamma'],
    },
  };

  const res = await req.post('/api/articles', { data: payload });
  expect(res.ok()).toBe(true);

  const body = await res.json();
  expect(body).toHaveProperty('article');
  const a = body.article;

  expect(a.title).toBe(payload.article.title);
  expect(a.description).toBe(payload.article.description);
  expect(a.body).toBe(payload.article.body);

  expect(Array.isArray(a.tagList)).toBe(true);
  expect(a.tagList).toEqual(payload.article.tagList);

  expect(a.slug).toBeTruthy();

  expect(a).toHaveProperty('author');
  expect(a.author).toHaveProperty('username');
  expect(a.author.username).toBe(creatorUsername);

  expect(a).toHaveProperty('createdAt');
  expect(a).toHaveProperty('updatedAt');
  expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
  expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);
});
