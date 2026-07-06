import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow profile for existing user by other user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];


  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.unfollowProfile('nonExistentUser12345');

  await profilesApi.assertNotFoundResponseCode(response);
});