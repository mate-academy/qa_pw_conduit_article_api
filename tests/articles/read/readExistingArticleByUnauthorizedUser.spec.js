import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Read existing article by unauthorized user`, async ({
  articlesApi,
  logger,
  userRequests,
}) => {
  const articleData = generateNewArticleData(logger, 1);
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

  const response = await articlesApi.getArticle(slug);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertSlugHasCorrectValue(response, slug);
});
