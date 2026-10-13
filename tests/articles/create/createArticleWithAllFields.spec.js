import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test(`Create article with all fields filled in`, async ({
  userRequests,
  newArticleData,
}) => {
  const userRequestApi = new ArticlesApi(userRequests[0]);
  const response = await userRequestApi.createArticle(newArticleData);

  await userRequestApi.assertSuccessResponseCode(response);
  await userRequestApi.assertArticlesFieldsMatch(response, newArticleData);
  await userRequestApi.assertTaglistFieldHasValue(
    response,
    newArticleData.tagList,
  );
});
