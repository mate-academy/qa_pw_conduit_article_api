import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test.beforeEach(async ({ registeredUsers, userRequests }) => {
  const profilesApi = new ProfilesApi(userRequests[1]);

  const followResponse = await profilesApi.followProfile(
    registeredUsers[0].username,
  );
  await profilesApi.assertSuccessResponseCode(followResponse);
});

test(`Unfollow profile for existing user by other user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const profilesApi = new ProfilesApi(userRequests[1]);

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(response);

  await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
  await profilesApi.assertFollowingHasValueFalse(response);
});
