import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/authErrorMessages';

test(`Create article with empty title`, async ({
  createdArticleData,
  articlesApi,
}) => {
  const response = await articlesApi.createArticle({
    article: createdArticleData,
  });

  await articlesApi.assertUnauthorizedResponseCode(response);
  await articlesApi.assertTextResponseContains(response, UNAUTHORIZED);
});
