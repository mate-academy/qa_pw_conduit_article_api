import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

let articleSlug;

test.beforeEach(async ({userRequests, newArticleData}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const response = await articlesApi.createArticle(newArticleData);
  articleSlug = await articlesApi.getArticleSlugFromResponse(response);
});

test('Read existing article by unauthorized user', async ({articlesApi}) => {
  const response = await articlesApi.readArticle(articleSlug);
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertArticleResponseToHaveRequiredFields(response);
});