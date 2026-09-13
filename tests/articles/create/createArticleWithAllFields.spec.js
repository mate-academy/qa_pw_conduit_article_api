import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ tagNumber: 2 });

test(`Create article with all fields`, async ({
  userRequests,
  registeredUsers,
  newArticleData,
}) => {
  const author = registeredUsers[0];
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle(newArticleData);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, newArticleData.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    newArticleData.description,
  );
  await articlesApi.assertBodyTextHasCorrectValue(
    response,
    newArticleData.body,
  );
  await articlesApi.assertTagListHasCorrectValue(
    response,
    newArticleData.tagList,
  );
  await articlesApi.assertAuthorUsernameHasCorrectValue(
    response,
    author.username,
  );
});
