import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article with all fields', async ({
  registeredUser,
  newArticleData,
  request,
}) => {
  const articlesApi = new ArticlesApi(request);

  const response = await articlesApi.createArticle(
    newArticleData,
    `Token ${registeredUser.token}`,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertArticleHasCorrectValues(response, newArticleData);
  await articlesApi.assertArticleAuthor(response, registeredUser.username);
});
