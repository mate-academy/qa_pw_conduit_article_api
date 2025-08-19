import { test } from '../../_fixtures/fixtures';
import { INTERNAL_SERVER_ERROR_TEXT } from '../../../src/constants/articleErrorMessages';

test(`Create article with empty title`, async ({
  createdArticleData,
  articlesApi,
  registeredUser,
}) => {
  createdArticleData.title = null;
  const response = await articlesApi.createArticle(
    { article: createdArticleData },
    registeredUser.token,
  );

  await articlesApi.assertInternalServerErrorResponseCode(response);
  await articlesApi.assertTextResponseContains(
    response,
    INTERNAL_SERVER_ERROR_TEXT,
  );
});
