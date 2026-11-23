import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Read existing article by unauthorized user', async ({
  registeredUser,
  newArticleData,
  request,
  articlesApi,
}) => {
  const authorizedArticlesApi = new ArticlesApi(request);

  const createResponse = await authorizedArticlesApi.createArticle(
    newArticleData,
    `Token ${registeredUser.token}`,
  );

  await authorizedArticlesApi.assertSuccessResponseCode(createResponse);

  const slug = await authorizedArticlesApi.parseSlugFromBody(createResponse);

  const readResponse = await articlesApi.getArticle(slug, '');

  await articlesApi.assertSuccessResponseCode(readResponse);
  await articlesApi.assertArticleHasCorrectValues(readResponse, newArticleData);
  await articlesApi.assertArticleAuthor(readResponse, registeredUser.username);
});
