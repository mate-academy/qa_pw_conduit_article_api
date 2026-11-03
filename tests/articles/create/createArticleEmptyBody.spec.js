import { test } from '../../_fixtures/fixtures';
import { EMPTY_BODY_MESSAGE } from '../../../src/constants/articleErrorMessages';

test(`Create article with empty body`, async ({
  articlesApi,
  registeredUser,
  newArticleData,
}) => {
  const articleWithoutBody = { ...newArticleData };
  delete articleWithoutBody.body;
  const response = await articlesApi.createArticle(
    articleWithoutBody,
    registeredUser.token,
  );
  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_BODY_MESSAGE,
    'body',
  );
});
