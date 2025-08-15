import { test } from '../../_fixtures/fixtures';

test('Create article with all fields', async ({
  newArticleData,
  articleApiAuth
}) => {
  const response = await articleApiAuth.createNewArticle(newArticleData);

  await articleApiAuth.assertTitleHasCorrectValue(response, newArticleData.title);
  await articleApiAuth.assertDescriptionHasCorrectValue(response, newArticleData.description);
  await articleApiAuth.assertBodyHasCorrectValue(response, newArticleData.bodyy);
  await articleApiAuth.assertTagListHasCorrectValue(response, newArticleData.tagList);
});
