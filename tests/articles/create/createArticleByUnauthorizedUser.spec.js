import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({
  newArticleData,
  request,
}) => {
  const articlesApi = new ArticlesApi(request);

  const response = await articlesApi.createNewArticle(newArticleData);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
