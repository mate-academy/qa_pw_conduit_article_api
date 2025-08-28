import { test } from '../../_fixtures/fixtures';

test(`Read profile for not existng user`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
