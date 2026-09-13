import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Read existing article by unauthorized user', async ({
  userRequests,
  newArticleData,
  articlesApi,
}) => {
  const authorArticlesApi = new ArticlesApi(userRequests[0]);
  const creareResponse = await authorArticlesApi.createArticle(newArticleData);
  const slug = await authorArticlesApi.parseSlugFromBody(creareResponse);

  const response = await articlesApi.getArticle(slug);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, newArticleData.title);
});
