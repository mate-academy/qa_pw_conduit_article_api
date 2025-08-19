import { test as base, expect } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  createdArticleData;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);
    await use(client);
  },

  createdArticleData: async ({ logger, tagsNumber }, use) => {
    const articleData = generateNewArticleData(logger, tagsNumber);
    await use(articleData); // Добавьте await use()
  },
});
