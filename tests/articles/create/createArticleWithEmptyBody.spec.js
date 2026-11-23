import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty body', async ({
  registeredUser,
  newArticleData,
  request,
}) => {
  const articlesApi = new ArticlesApi(request);

  const articleData = {
    ...newArticleData,
    body: '',
  };

  const response = await articlesApi.createArticle(
    articleData,
    `Token ${registeredUser.token}`,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
