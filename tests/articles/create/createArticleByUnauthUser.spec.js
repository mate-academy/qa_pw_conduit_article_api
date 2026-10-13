import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({
  articlesApi,
  newArticleData,
}) => {
  const response = await articlesApi.createArticle(newArticleData);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
