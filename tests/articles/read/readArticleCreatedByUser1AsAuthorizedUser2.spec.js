import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user 1 as authorized user 2`, async ({
  newArticleData,
  userRequests,
}) => {
  const [user1Request, user2Request] = userRequests;

  const user1ArticlesApi = new ArticlesApi(user1Request);

  const user1Response = await user1ArticlesApi.createNewArticle(newArticleData);

  await user1ArticlesApi.assertSuccessResponseCode(user1Response);

  const slug = await user1ArticlesApi.parseSlugFromBody(user1Response);

  const user2ArticlesApi = new ArticlesApi(user2Request);

  const user2Response = await user2ArticlesApi.getArticle(slug);

  await user2ArticlesApi.assertSuccessResponseCode(user2Response);

  await user2ArticlesApi.assertArticleHasCorrectValues(
    user2Response,
    newArticleData,
  );
});
