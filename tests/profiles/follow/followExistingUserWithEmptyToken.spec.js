import { test } from '../../_fixtures/fixtures';

test('Follow existing user with empty auth token', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.followProfile(registeredUser.username, '');

  await profilesApi.assertUnauthorizedResponseCode(response);
});
