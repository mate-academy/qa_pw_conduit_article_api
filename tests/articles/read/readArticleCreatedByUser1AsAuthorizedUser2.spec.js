import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test('Read article created by user1 as authorized user2', async ({
  registeredUsers,
  userRequests,
  newArticleData,
}) => {
  const user1 = registeredUsers[0];

  const user1ArticlesApi = new ArticlesApi(userRequests[0]);
  const creareResponse = await user1ArticlesApi.createArticle(newArticleData);
  const slug = await user1ArticlesApi.parseSlugFromBody(creareResponse);

  const user2ArticlesApi = new ArticlesApi(userRequests[1]);
  const response = await user2ArticlesApi.getArticle(slug);

  await user2ArticlesApi.assertSuccessResponseCode(response);
  await user2ArticlesApi.assertAuthorUsernameHasCorrectValue(
    response,
    user1.username,
  );
});
