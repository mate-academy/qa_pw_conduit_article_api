import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty body`, async ({ userRequests }) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const response = await articlesApi.createArticle({
    title: 'Article without body',
    description: 'Article description',
    body: '',
    tagList: ['tag'],
  });

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
