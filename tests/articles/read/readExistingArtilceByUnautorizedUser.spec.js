import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Read existing article by unauthorized user', async ({
  request,
  newArticleData,
  userRequests,
}) => {
  const articlesApiUser1 = new ArticlesApi(userRequests[0]);
  const createResponse = await articlesApiUser1.createArticle(newArticleData);
  const slug = await articlesApiUser1.parseSlugFromBody(createResponse);

  const articlesApiAnon = new ArticlesApi(request);
  const response = await articlesApiAnon.getArticle(slug);

  await articlesApiAnon.assertSuccessResponseCode(response);
});
