import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Follow existing user profile with empty auth token`, async ({
  request,
  registeredUsers,
}) => {
  const user1 = registeredUsers[0];

  const profilesApi = new ProfilesApi(request);

  const response = await profilesApi.followProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
