import { test as base } from '@playwright/test';
import { request as apiRequest } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articleApi;
  newArticleData;
  createdArticle;
  articleRequests;
  articleApiAuth;
}>({
  articleApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);
    await use(client);
  },
  newArticleData: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger);
    await use(articleData);
  },

  articleApiAuth: async ({ registeredUser }, use) => {
    const contextWithAuth = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: `Token ${registeredUser.token}`,
        'content-type': 'application/json',
      },
    });

    const api = new ArticlesApi(contextWithAuth);
    await use(api);
  },
  createdArticle: async ({ registeredUsers, newArticleData }, use) => {
    const contextWithAuth = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: `Token ${registeredUsers[0].token}`,
        'content-type': 'application/json',
      },
    });

    const articleApi = new ArticlesApi(contextWithAuth);
    const response = await articleApi.createNewArticle(newArticleData);
    await articleApi.assertSuccessResponseCode(response);

    const body = await articleApi.parseBody(response);
    await use({ ...newArticleData, slug: body.article.slug });
  },
  articleRequests: async ({ registeredUsers, usersNumber }, use) => {
    const requests: ArticlesApi[] = [];
    for (let i = 0; i < usersNumber; i++) {
      const context = await apiRequest.newContext({
        extraHTTPHeaders: {
          authorization: `Token ${registeredUsers[i].token}`,
          'content-type': 'application/json',
        },
      });
      requests.push(new ArticlesApi(context));
    }
    await use(requests);
  },
});
