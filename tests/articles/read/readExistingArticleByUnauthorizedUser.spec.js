import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 1 });

test(`Read existing article by unauthorized user`, async ({
  request,
  registeredUsers,
  userRequests,
  logger,
}) => {
  const user1 = registeredUsers[0];

  const authenticatedArticlesApi = new ArticlesApi(userRequests[0]);
  const articleData = generateNewArticleData(logger, 3);

  const createResponse = await authenticatedArticlesApi.createArticle(
    articleData,
  );
  await authenticatedArticlesApi.assertSuccessResponseCode(createResponse);

  const articleSlug = await authenticatedArticlesApi.parseSlugFromBody(
    createResponse,
  );

  const unauthenticatedArticlesApi = new ArticlesApi(request);

  const readResponse = await unauthenticatedArticlesApi.getArticle(
    articleSlug,
  );

  await unauthenticatedArticlesApi.assertSuccessResponseCode(readResponse);

  await unauthenticatedArticlesApi.assertTitleHasCorrectValue(
    readResponse,
    articleData.title,
  );
  await unauthenticatedArticlesApi.assertDescriptionHasCorrectValue(
    readResponse,
    articleData.description,
  );
  await unauthenticatedArticlesApi.assertBodyHasCorrectValue(
    readResponse,
    articleData.body,
  );
  const uniqueTags = [...new Set(articleData.tagList)];
  await unauthenticatedArticlesApi.assertTagListHasCorrectValue(
    readResponse,
    uniqueTags,
  );
  await unauthenticatedArticlesApi.assertAuthorUsernameHasCorrectValue(
    readResponse,
    user1.username,
  );
});
