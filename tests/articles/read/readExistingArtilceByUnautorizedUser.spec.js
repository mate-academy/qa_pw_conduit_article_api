import { test } from '../../_fixtures/fixtures';

test(`Read article by unauthorized user`, async ({
  articleApi,
  createdArticle,
}) => {
  const article = createdArticle.article;
  const response = await articleApi.readArticle(article.slug);

  await articleApi.assertSuccessResponseCode(response);
  await articleApi.assertTitleHasCorrectValue(response, article.title);
  await articleApi.assertDescriptionHasCorrectValue(
    response,
    article.description,
  );
  await articleApi.assertBodyHasCorrectValue(response, article.body);});
