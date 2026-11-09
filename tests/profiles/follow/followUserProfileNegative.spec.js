import { request as apiRequest } from '@playwright/test';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { test } from '../../_fixtures/fixtures';

test(`Follow profile of non-existing user by registered user`, async ({
  userRequests,
}) => {
  const registeredUserRequest = userRequests[0];
  const profilesApi = new ProfilesApi(registeredUserRequest);
  const nonExistingUsername = generateNewUserData().username;

  const response = await profilesApi.followProfile(nonExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);
});


test(`Follow existing user with empty auth token`, async ({
  registeredUsers,
}) => {
  const registeredUser = registeredUsers[0];
  const userRequest = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: `Token ${''}`,
      'content-type': 'application/json',
    },
  });
  const profilesApi = new ProfilesApi(userRequest);

  const response = await profilesApi.followProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});