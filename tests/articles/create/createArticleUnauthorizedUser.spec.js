import { test } from '../../_fixtures/fixtures';

test(`Create artile by unautorized user`, async ({
  articlesApi,
  newArticleData,
}) => {
  const response = await articlesApi.createArticle(newArticleData, '');
  await articlesApi.assertUnauthorizedResponseCode(response);
});
