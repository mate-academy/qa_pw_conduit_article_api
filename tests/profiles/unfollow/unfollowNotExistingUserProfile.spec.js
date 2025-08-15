import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow not existing user profile`, async ({
  registeredUsers,
  userRequests,
}) => {
  const nonExistingUsername = 'user_that_does_not_exist_12345';
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  await profilesApi.followProfile(user1.username);

  const response = await profilesApi.unfollowProfile(nonExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);
});
