import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/usersErrorMessages';

test.use({ usersNumber: 2 });

test(`Follow profile for existing user with empty token`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  // Переопределяем заголовки для конкретного запроса
  const response = await profilesApi.followProfile(user1.username, '');

  await profilesApi.assertUnauthorizedResponseCode(response);
  await profilesApi.assertTextResponseContains(response, UNAUTHORIZED);
});
