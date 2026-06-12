import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  newArticleData,
  userRequests,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const response = await articlesApi.createNewArticle(newArticleData);

  await articlesApi.assertSuccessResponseCode(response);

  await articlesApi.assertArticleHasCorrectValues(response, newArticleData);
});
