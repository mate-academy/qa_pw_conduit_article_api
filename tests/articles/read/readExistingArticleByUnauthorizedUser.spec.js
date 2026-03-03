import { test } from '../../_fixtures/fixtures';

test('Unauthorized user can read an existing article', async ({
  articlesApi,
  articleWithOneTag,
  registeredUser,
}) => {
  const createResponse = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token
  );
  await articlesApi.assertSuccessResponseCode(createResponse);

  const createdArticle = await articlesApi.parseBody(createResponse);
  const slug = createdArticle.article.slug;

  const readResponse = await articlesApi.getArticle(slug);

  await articlesApi.assertSuccessResponseCode(readResponse);

  await articlesApi.assertTitle(readResponse, articleWithOneTag.title);
  await articlesApi.assertDescription(
    readResponse,
    articleWithOneTag.description
  );
  await articlesApi.assertBody(readResponse, articleWithOneTag.body);
  await articlesApi.assertTags(readResponse, articleWithOneTag.tagList);
  await articlesApi.assertSlugExists(readResponse);
});