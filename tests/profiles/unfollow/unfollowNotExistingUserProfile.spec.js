import { test } from '../../_fixtures/fixtures';

test(`Unfollow not existing profile by other user`, async ({
  followContext,
  newUserData
}) => {
  const { profilesApi } = followContext;

  const response = await profilesApi.unfollowProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
