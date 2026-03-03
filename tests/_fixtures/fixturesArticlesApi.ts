import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesAPI';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  articleWithoutTags;
  articleWithOneTag;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);

    await use(article);
  },
});
