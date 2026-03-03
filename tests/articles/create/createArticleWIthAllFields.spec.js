import { test } from '../../_fixtures/fixtures';

test('Create article with all fields', async ({
  registeredUser,
  articleWithOneTag,
  articlesApi,
}) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );
  
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitle(response, articleWithOneTag.title);
  await articlesApi.assertDescription(
    response,
    articleWithOneTag.description
  );
  await articlesApi.assertBody(response, articleWithOneTag.body);
  await articlesApi.assertTags(response, articleWithOneTag.tagList);
  await articlesApi.assertSlugExists(response);
});
