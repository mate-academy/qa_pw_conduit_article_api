import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow existing user profile`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const followResponse = await profilesApi.followProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(followResponse);

  const unfollowResponse = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(unfollowResponse);
  await profilesApi.assertFollowingHasValueFalse(unfollowResponse);
});
