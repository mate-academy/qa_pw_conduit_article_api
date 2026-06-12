import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Read existing article by unauthorized user`, async ({
  newArticleData,
  userRequests,
  request,
}) => {
  const userArticlesApi = new ArticlesApi(userRequests[0]);

  const userResponse = await userArticlesApi.createNewArticle(newArticleData);

  await userArticlesApi.assertSuccessResponseCode(userResponse);

  const slug = await userArticlesApi.parseSlugFromBody(userResponse);

  const guestArticlesApi = new ArticlesApi(request);

  const guestResponse = await guestArticlesApi.getArticle(slug);

  await guestArticlesApi.assertSuccessResponseCode(guestResponse);

  await guestArticlesApi.assertArticleHasCorrectValues(
    guestResponse,
    newArticleData,
  );
});
