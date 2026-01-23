import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 1 });

test(`Create article with all fields`, async ({
  registeredUsers,
  userRequests,
  logger,
}) => {
  const user1 = registeredUsers[0];
  const articlesApi = new ArticlesApi(userRequests[0]);

  const articleData = generateNewArticleData(logger, 3);

  const response = await articlesApi.createArticle(articleData);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, articleData.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleData.description,
  );
  await articlesApi.assertBodyHasCorrectValue(response, articleData.body);

  const uniqueTags = [...new Set(articleData.tagList)];
  await articlesApi.assertTagListHasCorrectValue(response, uniqueTags);
  await articlesApi.assertAuthorUsernameHasCorrectValue(
    response,
    user1.username,
  );
  await articlesApi.assertSlugIsNotEmpty(response);
});
