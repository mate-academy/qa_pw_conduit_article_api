import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  newArticleData;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  tagNumber: [0, { option: true }],
  newArticleData: async ({ logger, tagNumber }, use) => {
    const articleData = generateNewArticleData(logger, tagNumber);

    await use(articleData);
  },
});
