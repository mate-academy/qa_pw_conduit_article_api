import { test } from '../../_fixtures/fixtures';

test(`Read existing article by unauthorized user`, async ({
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

  const {
    article: { slug },
  } = await response.json();
  const readResponse = await articlesApi.readArticle(slug);

  await articlesApi.assertSuccessResponseCode(readResponse);
});
