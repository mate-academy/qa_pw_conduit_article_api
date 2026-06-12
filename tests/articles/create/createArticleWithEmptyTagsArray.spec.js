import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article with empty tags array`, async ({
  newArticleData,
  userRequests,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  newArticleData.tagList = [];

  const response = await articlesApi.createNewArticle(newArticleData);

  await articlesApi.assertSuccessResponseCode(response);

  await articlesApi.assertArticleHasCorrectValues(response, newArticleData);
});
