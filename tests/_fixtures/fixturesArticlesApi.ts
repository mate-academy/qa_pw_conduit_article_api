import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{ newArticleData }>({
  newArticleData: async ({ logger }, use) => {
    const newArticleData = generateNewArticleData(logger, 1);

    await use(newArticleData);
  },
});
