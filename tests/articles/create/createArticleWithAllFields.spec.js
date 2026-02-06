import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with all fields`, async ({ logger, userRequests }) => {
  const articleData = generateNewArticleData(logger, 3);
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle({
    title: articleData.title,
    description: articleData.description,
    body: articleData.text,
    tagList: articleData.tags,
  });

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, articleData.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleData.description,
  );
  await articlesApi.assertBodyHasCorrectValue(response, articleData.text);
  await articlesApi.assertTagsHaveCorrectValue(response, articleData.tags);
});
