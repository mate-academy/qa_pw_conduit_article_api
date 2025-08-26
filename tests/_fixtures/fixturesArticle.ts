import { test as base } from '@playwright/test';
import {
  generateNewArticleData
} from '../../src/common/testData/generateNewArticleData'

export const test = base.extend<{
  articleWithoutTags;
  articleWithEmptyBody;
  articleWithEmptyTitle;
  newArticle;
}>({
  articleWithoutTags: async ({logger}, use) => {
    const article = generateNewArticleData(logger)
    article['tagList'] = [];
    await use(article);
  },
  articleWithEmptyBody: async ({logger}, use) => {
    const article = generateNewArticleData(logger)
    article['body']  = '';
    await use(article);
  },
  articleWithEmptyTitle: async ({logger}, use) => {
    const article = generateNewArticleData(logger)
    article['title'] = '';
    await use(article);
  },
  newArticle: async ({logger}, use) => {
    const article = generateNewArticleData(logger, 2)
    await use(article);
  },

});
