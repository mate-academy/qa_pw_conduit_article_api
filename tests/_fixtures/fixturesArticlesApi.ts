import { test as base } from '@playwright/test';
import { ArticleApi } from '../../src/api/endpoints/ArticleApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from '../../src/common/logger';


export const test = base.extend <{
  articleApi;
  newArticleData;
},
 {
    logger;
  }
  >({
  articleApi: async ({ request }, use) => {
    const client = new ArticleApi(request);

    await use(client);
  },

  newArticleData: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger,3);

    await use(articleData);
  },
});
