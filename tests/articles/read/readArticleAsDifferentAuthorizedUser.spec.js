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
  expect([200, 201]).toContain(createRes.status());

  const created = await createRes.json();
  expect(created).toHaveProperty('article');
  const slug = created.article.slug;
  const expectedAuthor = created.article?.author?.username;
  expect(slug).toBeTruthy();
  expect(expectedAuthor).toBeTruthy();

  // Read as user2 (authorized)
  const readRes = await readerReq.get(`/api/articles/${slug}`);
  expect(readRes.status()).toBe(200);

  const readBody = await readRes.json();
  expect(readBody).toHaveProperty('article');
  const a = readBody.article;

  // Required fields
  expect(a.slug).toBe(slug);
  expect(a.title).toBe(createPayload.article.title);
  expect(a.description).toBe(createPayload.article.description);
  expect(a.body).toBe(createPayload.article.body);
  expect(Array.isArray(a.tagList)).toBe(true);
  expect(a.author?.username).toBe(expectedAuthor);
  expect(Number.isNaN(Date.parse(a.createdAt))).toBe(false);
  expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);

  // Reader-perspective fields
  expect(a.favorited).toBe(false);
  expect(typeof a.favoritesCount).toBe('number');

  expect(typeof a.author?.following).toBe('boolean');
  expect(a.author.following).toBe(false);
});
