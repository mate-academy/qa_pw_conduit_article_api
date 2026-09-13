import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test('Create article with empty title', async ({
  userRequests,
  newArticleData,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);

  const response = await articlesApi.createArticle({
    ...newArticleData,
    title: '',
  });

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, '');
});
