import { test } from '../../_fixtures/fixtures';
import { BODY_CANNOT_BE_EMPTY } from '../../../src/constants/articleErrorMessages';

test(`Create article with empty body`, async ({
  createdArticleData,
  articlesApi,
  registeredUser,
}) => {
  const key = 'body';

  createdArticleData.body = null;
  const response = await articlesApi.createArticle(
    { article: createdArticleData },
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInJSONResponseBody(
    response,
    BODY_CANNOT_BE_EMPTY,
    key,
  );
});
