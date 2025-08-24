import { test } from '../../_fixtures/fixtures';

test(`Create artile by unautorized user`, async ({
  articlesApi,
  newArticleWithoutTags,
  registeredUser,
}) => {
  const response = await articlesApi.createArticle(newArticleWithoutTags, null);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
