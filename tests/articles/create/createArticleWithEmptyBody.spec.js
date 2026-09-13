import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article with empty body`, async ({
  userRequests,
  newArticleData,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle({
    ...newArticleData,
    body: '',
  });

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertBodyTextHasCorrectValue(response, '');
});
