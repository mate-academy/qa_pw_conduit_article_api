import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Read existing article by unauthorized user`, async ({ userRequests, request }) => {
  const authorArticlesApi = new ArticlesApi(userRequests[0]);
  const readerArticlesApi = new ArticlesApi(request);

  const createResponse = await authorArticlesApi.createArticle({
    title: 'Readable article',
    description: 'Article description',
    body: 'Article body',
    tagList: ['tag'],
  });
  const slug = await authorArticlesApi.parseSlugFromBody(createResponse);

  const response = await readerArticlesApi.getArticle(slug);

  await readerArticlesApi.assertSuccessResponseCode(response);
  await readerArticlesApi.assertTitleHasCorrectValue(response, 'Readable article');
});
