import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test(`Read existing artilce by unauthorized user`, async ({
  createdArticle,
  articlesApi,
}) => {
  const response = await articlesApi.readArticle(createdArticle.slug);
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertArticlesFieldsMatch(response, createdArticle);
});
