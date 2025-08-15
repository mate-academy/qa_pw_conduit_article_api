import { test } from '../../_fixtures/fixtures';

test('Create article without title', async ({
  newArticleData,
  articleApiAuth
}) => {
  const response = await articleApiAuth.createNewArticle({
    description: newArticleData.description,
    body: newArticleData.body,
    tagList: []
  });

  await articleApiAuth.assertSuccessResponseCode(response);
});
