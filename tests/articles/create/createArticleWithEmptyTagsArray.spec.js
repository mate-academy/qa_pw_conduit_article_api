import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 1 });

test(`Create article with empty tags array`, async ({
  registeredUsers,
  userRequests,
  logger,
}) => {
  const user1 = registeredUsers[0];
  const articlesApi = new ArticlesApi(userRequests[0]);

  const articleData = generateNewArticleData(logger, 0);

  const response = await articlesApi.createArticle(articleData);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, articleData.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleData.description,
  );
  await articlesApi.assertBodyHasCorrectValue(response, articleData.body);
  await articlesApi.assertTagListHasCorrectValue(response, []);
  await articlesApi.assertAuthorUsernameHasCorrectValue(
    response,
    user1.username,
  );
  await articlesApi.assertSlugIsNotEmpty(response);
});
