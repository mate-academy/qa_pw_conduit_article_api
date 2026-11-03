import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  registeredUsers,
  userRequests,
  newArticleData,
}) => {
  const user1 = registeredUsers[0];

  const user1Api = new ArticlesApi(userRequests[0], 1);
  const user2Api = new ArticlesApi(userRequests[1], 2);

  const createResponse = await user1Api.createArticle(
    newArticleData,
    user1.token,
  );
  await user1Api.assertSuccessResponseCode(createResponse);
  const slug = await user1Api.parseSlugFromBody(createResponse);

  const response = await user2Api.getArticle(slug);
  await user2Api.assertSuccessResponseCode(response);
  await user2Api.assertAuthornameHasCorrectValue(response, user1.username);
  await user2Api.assertTitleHasCorrectValue(response, newArticleData.title);
});
