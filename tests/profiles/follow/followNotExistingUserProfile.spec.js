import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Follow profile for user that does not exist`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];
  
  const unexistUser ={
    ...user2Request,
    username: 'userThatDoesNotExist12345'
  };
  const profilesApi = new ProfilesApi(user2Request);
  const response = await profilesApi.followProfile(unexistUser.username);

  await profilesApi.assertNotFoundResponseCode(response);
});