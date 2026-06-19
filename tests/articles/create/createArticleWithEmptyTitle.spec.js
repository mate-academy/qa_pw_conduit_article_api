import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty title`, async ({ userRequests }) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const response = await articlesApi.createArticle({
    title: '',
    description: 'Article description',
    body: 'Article body',
    tagList: ['tag'],
  });

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
