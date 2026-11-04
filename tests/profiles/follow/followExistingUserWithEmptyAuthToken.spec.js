import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';

test.use({ usersNumber: 1 });

test(`Follow existing user with empty auth token`, async ({
  registeredUsers,
  request,
}) => {
  const user1 = registeredUsers[0];
  const profilesApi = new ProfilesApi(request);

  const response = await profilesApi.followProfile(user1.username);
  await profilesApi.assertResponseCode(response, UNAUTHORIZED);
});
