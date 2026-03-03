import { test } from '../../_fixtures/fixtures';

test(`Unfollow not existing user profile`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.unfollowProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
