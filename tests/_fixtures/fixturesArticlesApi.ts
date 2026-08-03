import { test as base, request as apiRequest } from '@playwright/test';
import { ArticleApi } from '../../src/api/endpoints/ArticleApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  articleApi;
  articleData;
  articleApiAuthorized;
  createdArticle;
}>({
  articleApi: async ({ request }, use) => {
    const client = new ArticleApi(request);

    await use(client);
  },

  articleData: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 1);

    await use(articleData);
  },

  articleApiAuthorized: async ({ registeredUser }, use) => {
    const authorizedRequest = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: `Token ${registeredUser.token}`,
        'content-type': 'application/json',
      },
    });

    const client = new ArticleApi(authorizedRequest);
    await use(client);
  },

  createdArticle: async ({ usersApi, logger, articleData }, use) => {
    const userData = generateNewUserData(logger);
    const res1 = await usersApi.registerNewUser(userData);
    await usersApi.assertSuccessResponseCode(res1);
    userData['token'] = await usersApi.parseTokenFromBody(res1);

    const userRequest = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: `Token ${userData.token}`,
        'content-type': 'application/json',
      },
    });

    const articleApi = new ArticleApi(userRequest);
    const response = await articleApi.createNewArticle(articleData);
    const articleBody = await articleApi.parseBody(response);

    await use(articleBody);
  },
});
