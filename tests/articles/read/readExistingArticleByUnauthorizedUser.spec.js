import { test, expect } from '../../_fixtures/fixtures';

test('Read existing article by unauthorized user', async ({
  createdArticle,
  articleApi,
}) => {
  const response = await articleApi.getArticleBySlug(createdArticle.slug);
  await articleApi.assertSuccessResponseCode(response);

  const body = await articleApi.parseBody(response);
  expect(body.article.title).toBe(createdArticle.title);
});
