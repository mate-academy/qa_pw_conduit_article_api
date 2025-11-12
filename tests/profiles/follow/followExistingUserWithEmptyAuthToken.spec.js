import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Follow existing user with empty auth token`, async ({
  registeredUsers,
  emptyAuthRequest,
}) => {
  const user1 = registeredUsers[0];

  const profilesApi = new ProfilesApi(emptyAuthRequest);

  const response = await profilesApi.followProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
