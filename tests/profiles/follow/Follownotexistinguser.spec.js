import { test } from '../../_fixtures/fixtures';

test(`Follow not existing user profile`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.followProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
