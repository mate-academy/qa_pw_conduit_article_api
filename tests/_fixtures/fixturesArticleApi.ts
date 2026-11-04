import { test as base } from '@playwright/test';
import { request as apiRequest } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  newArticleData;
}>({
  articlesApi: async ({ request }, use) => {
    const article = new ArticlesApi(request);

    await use(article);
  },
  newArticleData: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger);

    await use(articleData);
  },
});
