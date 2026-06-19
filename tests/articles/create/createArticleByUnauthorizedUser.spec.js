import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({ request }) => {
  const articlesApi = new ArticlesApi(request);
  const response = await articlesApi.createArticle({
    title: 'Unauthorized article',
    description: 'Article description',
    body: 'Article body',
    tagList: ['tag'],
  });

  await articlesApi.assertUnauthorizedResponseCode(response);
});
