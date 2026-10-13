import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test.use({ tagNumber: 0 });

test(`Create article with no tags`, async ({
  userRequests,
  newArticleData,
}) => {
  const userRequestApi = new ArticlesApi(userRequests[0]);
  const response = await userRequestApi.createArticle(newArticleData);

  await userRequestApi.assertSuccessResponseCode(response);
  await userRequestApi.assertTagListIsEmpty(response);
});
