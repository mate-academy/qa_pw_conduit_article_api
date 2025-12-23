import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test.describe('Follow Profile', () => {
  test('Follow existing user by other user', async ({
    registeredUsers,
    userRequests,
  }) => {
    const user1 = registeredUsers[0]; // target
    const user2Request = userRequests[1]; // actor

    const profilesApi = new ProfilesApi(user2Request);
    const response = await profilesApi.followProfile(user1.username);

    await profilesApi.assertSuccessResponseCode(response);
    await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
    await profilesApi.assertFollowingHasValueTrue(response);
  });

  test('Follow non-existing user profile', async ({ userRequests }) => {
    const profilesApi = new ProfilesApi(userRequests[0]);
    const response = await profilesApi.followProfile('nonexistentuser');

    await profilesApi.assertNotFoundResponseCode(response);
  });

  test('Follow existing user with empty auth token', async ({
    unauthenticatedRequest,
    registeredUsers,
  }) => {
    const profilesApi = new ProfilesApi(unauthenticatedRequest);
    const response = await profilesApi.followProfile(
      registeredUsers[0].username,
    );

    await profilesApi.assertUnauthorizedResponseCode(response);
  });
});
