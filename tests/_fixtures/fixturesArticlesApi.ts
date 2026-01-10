import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';

export const test = base.extend<{
  articlesNumber: number;
  articleTagsNumber: number;
  articlesApi: ArticlesApi;
  newArticleData: ReturnType<typeof generateNewArticleData>;
  newArticlesData: ReturnType<typeof generateNewArticleData>[];
}>({
  articlesNumber: [1, { option: true }],
  articleTagsNumber: [0, { option: true }],
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  }
  ,
  newArticleData: async ({ logger, articleTagsNumber }, use) => {
    const articleData = generateNewArticleData(logger, articleTagsNumber);

    await use(articleData);
  }
  ,
  newArticlesData: async ({ logger, articlesNumber, articleTagsNumber }, use) => {
    const articles = Array(articlesNumber);

    for (let i = 0; i < articlesNumber; i++) {
      articles[i] = generateNewArticleData(logger, articleTagsNumber);
    }

    await use(articles);
  }
});