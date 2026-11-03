import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  articlesApi,
  registeredUser,
  articleWithThreeTags,
}) => {
  const response = await articlesApi.createArticle(
    articleWithThreeTags,
    registeredUser.token,
  );
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertAuthornameHasCorrectValue(
    response,
    registeredUser.username,
  );
  await articlesApi.assertResponseBodyContainsSlug(response);
  await articlesApi.assertTitleHasCorrectValue(
    response,
    articleWithThreeTags.title,
  );
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleWithThreeTags.description,
  );
});
