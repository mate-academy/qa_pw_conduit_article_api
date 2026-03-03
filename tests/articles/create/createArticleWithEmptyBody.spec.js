import { EMPTY_ARTICLE_BODY } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty body', async ({
  registeredUser,
  articleWithoutTags,
  articlesApi,
}) => {
  articleWithoutTags['body'] = '';

  const response = await articlesApi.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_ARTICLE_BODY,
    '0',
  );
});
