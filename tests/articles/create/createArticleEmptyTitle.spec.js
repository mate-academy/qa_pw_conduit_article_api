import { test } from '../../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../../src/constants/articleErrorMessages';

test(`Create article with empty title`, async ({
  articlesApi,
  registeredUser,
  newArticleData,
}) => {
  const articleWithoutTitle = { ...newArticleData };
  delete articleWithoutTitle.title;
  const response = await articlesApi.createArticle(
    articleWithoutTitle,
    registeredUser.token,
  );
  await articlesApi.assertInternalServerErrorResponseCode(response);
});
