import { test } from '../../_fixtures/fixtures';

test(`Create article with empty tags array`, async ({
  createdArticleData,
  articlesApi,
  registeredUser,
}) => {
  const response = await articlesApi.createArticle(
    { article: createdArticleData },
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectTitle(
    response,
    createdArticleData.title,
  );
  await articlesApi.assertTagsNumberIsCorrect(
    response,
    createdArticleData.tagList.length,
  );
});
