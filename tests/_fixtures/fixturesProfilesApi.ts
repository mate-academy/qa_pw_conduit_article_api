import { test as base, request as apiRequest } from '@playwright/test';
import { ProfilesApi } from '../../src/api/endpoints/ProfilesApi';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export const test = base.extend<{
  profilesApi;
  followContext;
}>({
  profilesApi: async ({ request }, use) => {
    const client = new ProfilesApi(request);

    await use(client);
  },

  followContext: async ({ usersApi, logger }, use) => {
    const user1Data = generateNewUserData(logger);
    const user2Data = generateNewUserData(logger);

    const res1 = await usersApi.registerNewUser(user1Data);
    await usersApi.assertSuccessResponseCode(res1);
    user1Data['token'] = await usersApi.parseTokenFromBody(res1);

    const res2 = await usersApi.registerNewUser(user2Data);
    await usersApi.assertSuccessResponseCode(res2);
    user2Data['token'] = await usersApi.parseTokenFromBody(res2);

    const user2Request = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: `Token ${user2Data.token}`,
        'content-type': 'application/json',
      },
    });

    const profilesApi = new ProfilesApi(user2Request);

    const response = await profilesApi.followProfile(user1Data.username);
    await profilesApi.assertSuccessResponseCode(response);

    await use({ user1: user1Data, profilesApi });
  },
});
