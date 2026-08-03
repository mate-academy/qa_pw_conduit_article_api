import { test } from '../../_fixtures/fixtures';

test(`Unfollow profile for existing user by other user`, async ({
  followContext,
}) => {
  const { user1, profilesApi } = followContext;

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertSuccessResponseCode(response);
  await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
  await profilesApi.assertFollowingHasValueFalse(response);
});
