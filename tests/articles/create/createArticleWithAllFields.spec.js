import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  articleApiAuthorized,
  articleData
}) => {
  const response = await articleApiAuthorized.createNewArticle(articleData);

  await articleApiAuthorized.assertSuccessResponseCode(response);
  await articleApiAuthorized.assertTitleHasCorrectValue(response,
    articleData.title);
  await articleApiAuthorized.assertDescriptionHasCorrectValue(response,
    articleData.description);
  await articleApiAuthorized.assertBodyHasCorrectValue(response,
    articleData.body);
});
