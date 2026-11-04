import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';

test.use({ usersNumber: 1 });

test(`Unfollow existing user with empty auth token`, async ({
  registeredUsers,
  request,
}) => {
  const profilesApi = new ProfilesApi(request);

  const response = await profilesApi.unfollowProfile(
    registeredUsers[0].username,
  );

  await profilesApi.assertResponseCode(response, UNAUTHORIZED);
});
