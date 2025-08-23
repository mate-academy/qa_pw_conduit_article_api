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

    await articlesApi.assertSuccessResponseCode(response);

    await articlesApi.parseSlug(response);
    await articlesApi.assertTitleCorrect(response, newArticleWithoutTags.title);
    await articlesApi.assertDescriptionCorrect(
      response,
      newArticleWithoutTags.description,
    );
    await articlesApi.assertBodyCorrect(response, newArticleWithoutTags.body);
    await articlesApi.assertTagListCorrect(
      response,
      newArticleWithoutTags.tagList,
    );
    await articlesApi.assertAuthorCorrect(response, registeredUser.username);
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

    await articlesApi.assertSuccessResponseCode(response);

    await articlesApi.parseSlug(response);
    await articlesApi.assertTitleCorrect(response, newArticleWithOneTag.title);
    await articlesApi.assertDescriptionCorrect(
      response,
      newArticleWithOneTag.description,
    );
    await articlesApi.assertBodyCorrect(response, newArticleWithOneTag.body);
    await articlesApi.assertTagListCorrect(
      response,
      newArticleWithOneTag.tagList,
    );
    await articlesApi.assertAuthorCorrect(response, registeredUser.username);
  });
});
