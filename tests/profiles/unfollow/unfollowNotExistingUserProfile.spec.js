import { test } from '../../_fixtures/fixtures';

test(`Unfollow profile for not existing user by other user`, async ({
  registeredUser,
  profilesApi,
}) => {
  const notExistingUser = {
    username: 'not-existing-user',
  };

  const response = await profilesApi.unfollowProfile(
    notExistingUser.username,
    registeredUser.token,
  );

  await profilesApi.assertNotFoundResponseCode(response);
});