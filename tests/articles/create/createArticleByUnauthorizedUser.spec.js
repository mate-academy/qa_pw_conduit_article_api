import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test(`Create article by unauthorized user`, async ({ request, logger }) => {
  const articlesApi = new ArticlesApi(request);
  const articleData = generateNewArticleData(logger, 3);
  const response = await articlesApi.createArticle(articleData);
  await articlesApi.assertUnauthorizedResponseCode(response);
});
