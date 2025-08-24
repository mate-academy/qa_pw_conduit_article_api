import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request } from '@playwright/test';

test.use({ usersNumber: 2 });

test.describe('Unauthorized follow user scenarios', () => {
  test(`Follow profile for NOT existing user by other user`, async ({
    registeredUsers,
    userRequests,
  }) => {
    const user1 = registeredUsers[0];
    const user2Request = userRequests[1];

    const profilesApi = new ProfilesApi(user2Request);

    const response = await profilesApi.followProfile('unknown_user_profile');

    await profilesApi.assertNotFoundResponseCode(response);
  });

  test(`Follow profile for existing user as unknown user`, async ({
    registeredUsers,
  }) => {
    const user1 = registeredUsers[0];

    const unknownUserRequest = await request.newContext({});

    const profilesApi = new ProfilesApi(unknownUserRequest);

    const response = await profilesApi.followProfile(user1.username);

    await profilesApi.assertUnauthorizedResponseCode(response);
  });
});
