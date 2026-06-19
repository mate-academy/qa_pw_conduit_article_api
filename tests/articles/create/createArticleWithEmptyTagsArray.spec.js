import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty tags array`, async ({ userRequests }) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const response = await articlesApi.createArticle({
    title: 'Article with empty tags',
    description: 'Article description',
    body: 'Article body',
    tagList: [],
  });

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, 'Article with empty tags');
  await articlesApi.assertBodyHasCorrectValue(response, 'Article body');
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    'Article description',
  );
  await articlesApi.assertTagListHasCorrectValue(response, []);
});
