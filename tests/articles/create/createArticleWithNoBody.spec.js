import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test(`Create article with empty body field`, async ({
  userRequests,
  newArticleData,
}) => {
  test.fail(); // BUG: backend accepts empty body (200), expected 422

  const articleWithNoBody = { ...newArticleData, body: '' };
  const userRequestApi = new ArticlesApi(userRequests[0]);

  const response = await userRequestApi.createArticle(articleWithNoBody);
  await userRequestApi.assertUnprocessableEntityResponseCode(response);
});
