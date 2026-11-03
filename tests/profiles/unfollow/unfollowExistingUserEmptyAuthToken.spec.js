import { request as apiRequest } from '@playwright/test';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow existing user with empty auth token`, async ({
  registeredUsers,
}) => {
  const user1 = registeredUsers[0];

  const emptyTokenRequest = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: 'Token ',
      'content-type': 'application/json',
    },
  });

  const profilesApi = new ProfilesApi(emptyTokenRequest, 2);

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);

  await emptyTokenRequest.dispose();
});
