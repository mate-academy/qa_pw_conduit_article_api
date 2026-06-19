import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  userRequests,
}) => {
  const authorArticlesApi = new ArticlesApi(userRequests[0]);
  const readerArticlesApi = new ArticlesApi(userRequests[1]);

  const createResponse = await authorArticlesApi.createArticle({
    title: 'Shared article',
    description: 'Article description',
    body: 'Article body',
    tagList: ['tag'],
  });
  const slug = await authorArticlesApi.parseSlugFromBody(createResponse);

  const response = await readerArticlesApi.getArticle(slug);

  await readerArticlesApi.assertSuccessResponseCode(response);
  await readerArticlesApi.assertTitleHasCorrectValue(response, 'Shared article');
  await readerArticlesApi.assertBodyHasCorrectValue(response, 'Article body');
});
