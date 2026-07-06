import { test } from '../../../tests/_fixtures/fixtures';

test(`Read existing article by unauthorized user`, async ({ 
registeredUsers,
  userRequests,
  articleApi,
  newArticleData,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

const response = await articleApi.createArticle(userRequests[0]);


await articleApi.getArticle(response.body.article);
await articleApi.assertUnauthorizedResponseCode(response);
});
