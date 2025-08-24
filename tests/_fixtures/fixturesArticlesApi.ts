import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  newArticleWithoutTags;
  newArticleWithOneTag;
  newArticleWithTwoTags;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  newArticleWithoutTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 0);

    await use(articleData);
  },
  newArticleWithOneTag: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 1);

    await use(articleData);
  },
  newArticleWithTwoTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 2);

    await use(articleData);
  },
});
