import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { TITLE_CANNOT_BE_EMPTY } from '../../../src/constants/articleErrorMessages';

test.use({ usersNumber: 1 });

test(`Create article with empty title`, async ({ userRequests, logger }) => {
  const articlesApi = new ArticlesApi(userRequests[0]);

  const articleData = generateNewArticleData(logger, 3);
  articleData.title = '';

  const response = await articlesApi.createArticle(articleData);

  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInResponseBody(
    response,
    TITLE_CANNOT_BE_EMPTY,
    'title',
  );
});
