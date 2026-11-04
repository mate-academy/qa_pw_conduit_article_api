import { test } from '../../_fixtures/fixtures';

test(`Create article with empty tags array`, async ({
  articlesApi,
  registeredUser,
  articleWithThreeTags,
}) => {
  articleWithThreeTags['tagList'] = [];
  const response = await articlesApi.createArticle(
    articleWithThreeTags,
    registeredUser.token,
  );
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertAuthornameHasCorrectValue(
    response,
    registeredUser.username,
  );
});
