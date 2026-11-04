import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test('Read article created by user1 as authorized user2', async ({
  newArticleData,
  userRequests,
}) => {
  const articlesApiUser1 = new ArticlesApi(userRequests[0]);
  const createResponse = await articlesApiUser1.createArticle(newArticleData);
  const slug = await articlesApiUser1.parseSlugFromBody(createResponse);

  const articlesApiUser2 = new ArticlesApi(userRequests[1]);
  const response = await articlesApiUser2.getArticle(slug);

  await articlesApiUser2.assertSuccessResponseCode(response);
});
