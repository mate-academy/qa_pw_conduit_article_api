import { test } from '../../_fixtures/fixtures';

test('Create artile by unautorized user', async ({
  newArticleData,
  articleApi
}) => {
  const response = await articleApi.createNewArticle(newArticleData);

  await articleApi.assertUnauthorizedResponseCode(response);
});
