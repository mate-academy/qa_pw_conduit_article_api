import { test } from '../../_fixtures/fixtures';

test(`Follow profile with empty auth token`, async ({
  registeredUser,
  profilesApi,
}) => {
  const user = registeredUser;

  const response = await profilesApi.followProfile(user.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
