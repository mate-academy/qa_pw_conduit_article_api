import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { ROUTES } from '../../../src/constants/apiRoutes';
import { test, expect } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow existing user profile`, async ({
  registeredUsers,
  userRequests,
}) => {
  const target = registeredUsers[0];      // profile to follow/unfollow
  const followerReq = userRequests[1];    // authenticated follower
  const profilesApi = new ProfilesApi(followerReq);

  // Precondition: follow using ProfilesApi
  const followRes = await profilesApi.followProfile(target.username);
  await profilesApi.assertSuccessResponseCode(followRes);
  await profilesApi.assertUsernameHasCorrectValue(followRes, target.username);
  await profilesApi.assertFollowingHasValueTrue(followRes);

  // Unfollow
  const unfollowRes = await followerReq.delete(
    ROUTES.profiles(target.username).follow
  );

  // Assert 200 and following: false using your existing helpers
  await profilesApi.assertSuccessResponseCode(unfollowRes);
  await profilesApi.assertUsernameHasCorrectValue(unfollowRes, target.username);
  await profilesApi.assertFollowingHasValueFalse(unfollowRes);
});
