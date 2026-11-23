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
  const user2ArticlesApi = new ArticlesApi(userRequests[1]);

  const createResponse = await user1ArticlesApi.createArticle(newArticleData);

  await user1ArticlesApi.assertSuccessResponseCode(createResponse);
  await user1ArticlesApi.assertArticleAuthor(createResponse, user1.username);

  const slug = await user1ArticlesApi.parseSlugFromBody(createResponse);

  const readResponse = await user2ArticlesApi.getArticle(slug);

  await user2ArticlesApi.assertSuccessResponseCode(readResponse);
  await user2ArticlesApi.assertArticleHasCorrectValues(
    readResponse,
    newArticleData,
  );
  await user2ArticlesApi.assertArticleAuthor(readResponse, user1.username);
});
