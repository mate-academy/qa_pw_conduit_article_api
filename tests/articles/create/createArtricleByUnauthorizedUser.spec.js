import { test } from '../../_fixtures/fixtures';

test('Сreate article by unauthorized user', async ({
  articleWithOneTag,
  articlesApi,
}) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
  );

  await articlesApi.assertUnauthorizedResponseCode(response);
});