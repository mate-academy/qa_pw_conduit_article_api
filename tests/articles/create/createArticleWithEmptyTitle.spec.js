import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty title', async ({
  registeredUser,
  newArticleData,
  request,
}) => {
  const articlesApi = new ArticlesApi(request);

  const articleData = {
    ...newArticleData,
    title: '',
  };

  const response = await articlesApi.createArticle(
    articleData,
    `Token ${registeredUser.token}`,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
