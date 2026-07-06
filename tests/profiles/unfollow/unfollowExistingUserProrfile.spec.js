import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow profile for existing user by other user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

 const response1 = await profilesApi.followProfile(user1.username);
 await profilesApi.assertSuccessResponseCode(response1);

  const response2 = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(response2);

  await profilesApi.assertUsernameHasCorrectValue(response2, user1.username);
  await profilesApi.assertFollowingHasValueFalse(response2);
});
