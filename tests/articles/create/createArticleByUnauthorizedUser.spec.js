import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({
  articleData,
  articleApi,
}) => {
  const response = await articleApi.createNewArticle(articleData);

  await articleApi.assertUnauthorizedResponseCode(response);
});
