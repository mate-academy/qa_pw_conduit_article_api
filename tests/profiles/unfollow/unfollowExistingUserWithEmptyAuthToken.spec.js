import { test } from '../../_fixtures/fixtures';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';

test(`Unfollow existing user with empty auth token`, async ({
  registeredUser,
  request,
}) => {
  const user1 = registeredUser;
  const user2Request = request; // default - without auth token
  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
