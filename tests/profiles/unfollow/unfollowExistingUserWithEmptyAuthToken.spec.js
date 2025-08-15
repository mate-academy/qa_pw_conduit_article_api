import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow existing user with empty auth token`, async ({
  registeredUsers,
  emptyAuthRequest
}) => {
  const user1 = registeredUsers[0];

  const profilesApi = new ProfilesApi(emptyAuthRequest);

  await profilesApi.followProfile(user1.username);

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
