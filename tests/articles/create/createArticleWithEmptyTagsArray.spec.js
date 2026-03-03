import { test } from '../../_fixtures/fixtures';

test('Create article with empty tags', async ({
  registeredUser,
  articleWithoutTags,
  articlesApi,
}) => {
  const response = await articlesApi.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitle(response, articleWithoutTags.title);
  await articlesApi.assertDescription(
    response,
    articleWithoutTags.description
  );
  await articlesApi.assertBody(response, articleWithoutTags.body);
  await articlesApi.assertTags(articleWithoutTags.tagList)
});