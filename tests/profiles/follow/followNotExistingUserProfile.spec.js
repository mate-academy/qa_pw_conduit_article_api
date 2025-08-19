import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/usersErrorMessages';

test.use({ usersNumber: 2 });

test(`Follow profile for not existing user by other user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const invalidUser = {
    ...user1,
    username: 'nonExistingUser',
  };

  const response = await profilesApi.followProfile(invalidUser.username);

  await profilesApi.assertNotFoundResponseCode(response);
  await profilesApi.assertTextResponseContains(response, NOT_FOUND);
});
