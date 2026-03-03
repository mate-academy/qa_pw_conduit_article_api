import { EMPTY_ARTICLE_TITLE } from '../../../src/constants/authErrorMessages';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty title', async ({
  registeredUser,
  articleWithoutTags,
  articlesApi,
}) => {
  articleWithoutTags['title'] = '';

  const response = await articlesApi.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_ARTICLE_TITLE,
    '0',
  );
});