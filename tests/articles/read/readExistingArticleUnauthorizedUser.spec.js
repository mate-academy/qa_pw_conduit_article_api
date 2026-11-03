import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Read existing article by unauthorized user`, async ({
  registeredUsers,
  userRequests,
  newArticleData,
  articlesApi,
}) => {
  const user1 = registeredUsers[0];

  const user1Api = new ArticlesApi(userRequests[0], 1);

  const createResponse = await user1Api.createArticle(
    newArticleData,
    user1.token,
  );
  await user1Api.assertSuccessResponseCode(createResponse);
  const slug = await user1Api.parseSlugFromBody(createResponse);

  const response = await articlesApi.getArticle(slug);
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertAuthornameHasCorrectValue(response, user1.username);
  await articlesApi.assertTitleHasCorrectValue(response, newArticleData.title);
});
