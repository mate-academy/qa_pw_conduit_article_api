import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let profilesApi;
let user1;

test.beforeEach(async ({ registeredUsers, userRequests }) => {
  user1 = registeredUsers[0];
  profilesApi = new ProfilesApi(userRequests[1]);

  const response = await profilesApi.followProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(response);
});

test('Unfollow existing user profile', async () => {
  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(response);
  await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
  await profilesApi.assertFollowingHasValueFalse(response);
});
