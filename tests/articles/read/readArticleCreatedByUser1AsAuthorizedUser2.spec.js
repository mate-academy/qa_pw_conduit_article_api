import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  registeredUsers,
  userRequests,
  logger,
}) => {
  const user1 = registeredUsers[0];
  const user2 = registeredUsers[1];

  const user1ArticlesApi = new ArticlesApi(userRequests[0]);
  const articleData = generateNewArticleData(logger, 3);

  const createResponse = await user1ArticlesApi.createArticle(articleData);
  await user1ArticlesApi.assertSuccessResponseCode(createResponse);

  const articleSlug = await user1ArticlesApi.parseSlugFromBody(createResponse);

  const user2ArticlesApi = new ArticlesApi(userRequests[1]);

  const readResponse = await user2ArticlesApi.getArticle(articleSlug);

  await user2ArticlesApi.assertSuccessResponseCode(readResponse);

  await user2ArticlesApi.assertTitleHasCorrectValue(
    readResponse,
    articleData.title,
  );
  await user2ArticlesApi.assertDescriptionHasCorrectValue(
    readResponse,
    articleData.description,
  );
  await user2ArticlesApi.assertBodyHasCorrectValue(
    readResponse,
    articleData.body,
  );
  const uniqueTags = [...new Set(articleData.tagList)];
  await user2ArticlesApi.assertTagListHasCorrectValue(readResponse, uniqueTags);
  await user2ArticlesApi.assertAuthorUsernameHasCorrectValue(
    readResponse,
    user1.username,
  );
});
