import { test } from '../../_fixtures/fixtures';

test(`Unfollow profile with empty auth token`, async ({
  registeredUser,
  profilesApi,
}) => {
  const user = registeredUser;

  const response = await profilesApi.unfollowProfile(user.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
