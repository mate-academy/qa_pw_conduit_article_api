import { test } from '../../_fixtures/fixtures';

test('Create article with empty body', async ({
  newArticleData,
  articleApiAuth
}) => {
  const response = await articleApiAuth.createNewArticle({
    title: newArticleData.title,
    description: newArticleData.description,
    tagList: newArticleData.tagList
  });

  await articleApiAuth.assertUnprocessableEntityResponseCode(response);
});
