import { test } from '../../_fixtures/fixtures';

test('Create article without tags', async ({
  newArticleData,
  articleApiAuth
}) => {
  const response = await articleApiAuth.createNewArticle({
    title: newArticleData.title,
    description: newArticleData.description,
    body: newArticleData.body,
  });

  await articleApiAuth.assertSuccessResponseCode(response);
});
