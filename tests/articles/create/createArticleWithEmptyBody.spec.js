import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article with empty body`, async ({
  newArticleData,
  userRequests,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  newArticleData.body = '';

  const response = await articlesApi.createNewArticle(newArticleData);

  await articlesApi.assertSuccessResponseCode(response);

  await articlesApi.assertArticleHasCorrectValues(response, newArticleData);
});
