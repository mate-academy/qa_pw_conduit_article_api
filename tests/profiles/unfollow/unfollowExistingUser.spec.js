import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow followed profile`, async ({ followedProfile }) => {
  const { followedUsername, followerProfilesApi } = followedProfile;

  const response = await followerProfilesApi.unfollowProfile(followedUsername);

  await followerProfilesApi.assertSuccessResponseCode(response);
  await followerProfilesApi.assertFollowingHasValueFalse(response);
});
