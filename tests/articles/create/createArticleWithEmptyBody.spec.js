import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty body`, async ({ logger, userRequests }) => {
  const articleData = generateNewArticleData(logger, 1);
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle({
    title: articleData.title,
    description: articleData.description,
    body: '',
    tagList: articleData.tags,
  });

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, articleData.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleData.description,
  );
  await articlesApi.assertBodyHasCorrectValue(response, '');
  await articlesApi.assertTagsHaveCorrectValue(response, articleData.tags);
});
