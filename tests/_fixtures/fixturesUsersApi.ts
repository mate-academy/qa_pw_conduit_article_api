import {
  request as apiRequest,
  type APIRequestContext,
} from '@playwright/test';
import { test as base } from './fixturesGeneric';
import { UsersApi } from '../../src/api/endpoints/UsersApi';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

type UserData = ReturnType<typeof generateNewUserData>;

type RegisteredUser = UserData & {
  token: string;
};

type UsersApiFixtures = {
  usersApi: UsersApi;
  newUserData: UserData;
  newUsersData: UserData[];
  registeredUser: RegisteredUser;
  registeredUsers: RegisteredUser[];
  userRequests: APIRequestContext[];
};

export const test = base.extend<UsersApiFixtures>({
  usersApi: async ({ request }, use) => {
    const client = new UsersApi(request);

    await use(client);
  },

  newUserData: async ({ logger }, use) => {
    const userData = generateNewUserData(logger);

    await use(userData);
  },

  newUsersData: async ({ logger, usersNumber }, use) => {
    const users = Array.from({ length: usersNumber }, () =>
      generateNewUserData(logger),
    );

    await use(users);
  },

  registeredUser: async ({ usersApi, newUserData }, use) => {
    const response = await usersApi.registerNewUser(newUserData);

    await usersApi.assertSuccessResponseCode(response);

    const token = await usersApi.parseTokenFromBody(response);

    const registeredUser = {
      ...newUserData,
      token,
    };

    await use(registeredUser);
  },

  registeredUsers: async ({ usersApi, newUsersData }, use) => {
    const registeredUsers: RegisteredUser[] = [];

    for (const user of newUsersData) {
      const response = await usersApi.registerNewUser(user);

      await usersApi.assertSuccessResponseCode(response);

      const token = await usersApi.parseTokenFromBody(response);

      registeredUsers.push({
        ...user,
        token,
      });
    }

    await use(registeredUsers);
  },

  userRequests: async ({ registeredUsers, baseURL }, use) => {
    const contexts: APIRequestContext[] = [];

    try {
      for (const user of registeredUsers) {
        const context = await apiRequest.newContext({
          baseURL,
          extraHTTPHeaders: {
            authorization: `Token ${user.token}`,
            'content-type': 'application/json',
          },
        });

        contexts.push(context);
      }

      await use(contexts);
    } finally {
      for (const context of contexts) {
        await context.dispose();
      }
    }
  },
});
