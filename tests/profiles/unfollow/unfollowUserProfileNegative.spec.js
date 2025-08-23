import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request } from '@playwright/test';

test.use({ usersNumber: 2 });
let user1;

test.describe('Unauthorized unfollow user scenarios', () => {
  test.beforeEach(async ({ registeredUsers, userRequests }) => {
    user1 = registeredUsers[0];
    const user2Request = userRequests[1];

    const profilesApi = new ProfilesApi(user2Request);

    const response = await profilesApi.followProfile(user1.username);

    await profilesApi.assertSuccessResponseCode(response);

    await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
    await profilesApi.assertFollowingHasValueTrue(response);
  });

  test(`Unfollow profile for NOT existing user by other user`, async ({
    userRequests,
  }) => {
    const user2Request = userRequests[1];

    const profilesApi = new ProfilesApi(user2Request);

    const response = await profilesApi.unfollowProfile('unknown_user_profile');

    await profilesApi.assertNotFoundResponseCode(response);
  });

  test(`Unfollow profile for existing user as unknown user`, async ({}) => {
    const unknownUserRequest = await request.newContext({});

    const profilesApi = new ProfilesApi(unknownUserRequest);

    const response = await profilesApi.unfollowProfile(user1.username);

    await profilesApi.assertUnauthorizedResponseCode(response);
  });
});
