import { test } from '../../_fixtures/fixtures';

test.describe('Empty create Article scenarios', () => {
  test(`Create article with empty Title`, async ({
    articlesApi,
    newArticleWithoutTags,
    registeredUser,
  }) => {
    newArticleWithoutTags.title = '';
    const response = await articlesApi.createArticle(
      newArticleWithoutTags,
      registeredUser.token,
    );

    await articlesApi.assertUnprocessableEntityResponseCode(response);
  });

  test(`Create article with empty Body Text`, async ({
    articlesApi,
    newArticleWithOneTag,
    registeredUser,
  }) => {
    newArticleWithOneTag.body = '';
    const response = await articlesApi.createArticle(
      newArticleWithOneTag,
      registeredUser.token,
    );

    await articlesApi.assertUnprocessableEntityResponseCode(response);
  });
});
