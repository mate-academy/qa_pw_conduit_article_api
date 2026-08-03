import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article by another user`, async ({
  articleApiAuthorized,
  createdArticle,
}) => {
  const article = createdArticle.article;
  const response = await articleApiAuthorized.readArticle(article.slug);

  await articleApiAuthorized.assertSuccessResponseCode(response);
  await articleApiAuthorized.assertTitleHasCorrectValue(
    response,
    article.title,
  );
  await articleApiAuthorized.assertDescriptionHasCorrectValue(
    response,
    article.description,
  );
  await articleApiAuthorized.assertBodyHasCorrectValue(response, article.body);
});
