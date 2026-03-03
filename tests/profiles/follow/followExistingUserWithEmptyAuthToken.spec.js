import { test } from '../../_fixtures/fixtures';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';

test.use({ usersNumber: 2 });

test(`Follow profile for existing user with empty auth token`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.followProfile(user1.username, '');

  await profilesApi.assertUnauthorizedResponseCode(response);
});