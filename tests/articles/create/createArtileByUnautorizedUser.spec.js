import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article by unauthorized user', async ({
  request,
  newArticleData,
}) => {
  const articlesApi = new ArticlesApi(request);

  const response = await articlesApi.createArticle(newArticleData);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
