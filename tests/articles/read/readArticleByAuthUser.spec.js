import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  createdArticle,
  userRequests,
}) => {
  const user2Request = userRequests[1];
  const readerApi = new ArticlesApi(user2Request);

  const response = await readerApi.readArticle(createdArticle.slug);
  await readerApi.assertSuccessResponseCode(response);
  await readerApi.assertArticlesFieldsMatch(response, createdArticle);
});
