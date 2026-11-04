import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';

export const test = base.extend<{
  newArticleData;
  articlesApi;
  articleWithThreeTags;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  newArticleData: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger);

    await use(articleData);
  },
  articleWithThreeTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 3);

    await use(articleData);
  },
});
