import { test, expect } from '../../_fixtures/fixtures';

test('Read article created by user1 as authorized user2', async ({
  createdArticle,
  articleRequests,
}) => {
  const articleApiAsUser2 = articleRequests[1];

  const response = await articleApiAsUser2.getArticleBySlug(createdArticle.slug);
  await articleApiAsUser2.assertSuccessResponseCode(response);

  const body = await articleApiAsUser2.parseBody(response);
  expect(body.article.title).toBe(createdArticle.title);
});
