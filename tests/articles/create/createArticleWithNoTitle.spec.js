import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test(`Create article with empty title field`, async ({
  userRequests,
  newArticleData,
}) => {
  test.fail(); // BUG: backend accepts empty title (200), expected 422

  const articleWithNoTitle = { ...newArticleData, title: '' };
  const userRequestApi = new ArticlesApi(userRequests[0]);

  const response = await userRequestApi.createArticle(articleWithNoTitle);
  await userRequestApi.assertUnprocessableEntityResponseCode(response);
});
