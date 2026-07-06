import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Follow profile for user with empty auth token`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];
  
  const unexistUser ={
    ...user2Request,
    token: ' ' 
  };
  const profilesApi = new ProfilesApi(user2Request);
  const response = await profilesApi.followProfile(unexistUser.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
