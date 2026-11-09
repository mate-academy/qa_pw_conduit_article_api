import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  registeredUsers,
  userRequests,
  logger,
}) => {
  const articleData = generateNewArticleData(logger, 2);
  const article = {
    title: articleData.title,
    description: articleData.description,
    body: articleData.text,
    tagList: articleData.tags,
  };
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle(article);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, article.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    article.description,
  );
  await articlesApi.assertBodyHasCorrectValue(response, article.body);
  await articlesApi.assertTagListHasCorrectValue(response, article.tagList);
  await articlesApi.assertAuthorUsernameHasCorrectValue(
    response,
    registeredUsers[0].username,
  );
});
