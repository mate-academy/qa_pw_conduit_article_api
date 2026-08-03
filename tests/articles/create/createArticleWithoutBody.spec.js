import { test } from '../../_fixtures/fixtures';

test(`Create article without body`, async ({
  articleApiAuthorized,
  articleData,
}) => {
  articleData.body = null;

  const response = await articleApiAuthorized.createNewArticle(articleData);

  await articleApiAuthorized.assertUnprocessableEntityResponseCode(response)
  await articleApiAuthorized.assertErrorMessageInResponseBody(
    response,
    'body:Article.body cannot be null',
    'body',
  );
});
