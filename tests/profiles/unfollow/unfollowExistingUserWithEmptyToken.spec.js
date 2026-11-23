import { test } from '../../_fixtures/fixtures';

test('Unfollow existing user with empty auth token', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.unfollowProfile(
    registeredUser.username,
    '',
  );

  await profilesApi.assertUnauthorizedResponseCode(response);
});
