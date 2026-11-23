import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty tags array', async ({
  registeredUser,
  newArticleData,
  request,
}) => {
  const articlesApi = new ArticlesApi(request);

  const articleData = {
    ...newArticleData,
    tagList: [],
  };

  const response = await articlesApi.createArticle(
    articleData,
    `Token ${registeredUser.token}`,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertArticleHasCorrectValues(response, articleData);
  await articlesApi.assertArticleAuthor(response, registeredUser.username);
});
