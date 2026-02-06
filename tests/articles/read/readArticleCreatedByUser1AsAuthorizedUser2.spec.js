import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  logger,
  userRequests,
}) => {
  const articleData = generateNewArticleData(logger, 2);
  const creatorApi = new ArticlesApi(userRequests[0]);

  const createResponse = await creatorApi.createArticle({
    title: articleData.title,
    description: articleData.description,
    body: articleData.text,
    tagList: articleData.tags,
  });

  await creatorApi.assertSuccessResponseCode(createResponse);

  const createBody = await creatorApi.parseBody(createResponse);
  const slug = createBody.article.slug;

  const readerApi = new ArticlesApi(userRequests[1]);
  const response = await readerApi.getArticle(slug);

  await readerApi.assertSuccessResponseCode(response);
  await readerApi.assertSlugHasCorrectValue(response, slug);
  await readerApi.assertTitleHasCorrectValue(response, articleData.title);
});
