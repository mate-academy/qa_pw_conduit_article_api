import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  newArticleData;
  createdArticle;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },

  newArticleData: async ({ logger, tagNumber }, use) => {
    const articleData = generateNewArticleData(logger, tagNumber);

    await use(articleData);
  },
  createdArticle: async ({ userRequests, newArticleData }, use) => {
    const authorArticlesApi = new ArticlesApi(userRequests[0]);
    const response = await authorArticlesApi.createArticle(newArticleData);

    await authorArticlesApi.assertSuccessResponseCode(response);
    newArticleData['slug'] =
      await authorArticlesApi.parseSlugFromBody(response);

    await use(newArticleData);
  },
});
