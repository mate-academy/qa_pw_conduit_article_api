import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type ArticleData = ReturnType<typeof generateNewArticleData>;

type ArticlesApiFixtures = {
  articlesApi: ArticlesApi;
  newArticleData: ArticleData;
};

export const test = base.extend<ArticlesApiFixtures>({
  articlesApi: async ({ request }, use) => {
    const articlesApi = new ArticlesApi(request);

    await use(articlesApi);
  },

  newArticleData: async ({}, use) => {
    const articleData = generateNewArticleData(null, 3);

    await use(articleData);
  },
});
