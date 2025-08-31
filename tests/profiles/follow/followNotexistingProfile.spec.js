import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/responceCodes';

test.use({ usersNumber: 2 });

test(`Follow not existing user profile by another user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);
  const notExistingProfilesName = user1.username + '_'
  const response = await profilesApi.followProfile(notExistingProfilesName);

  await profilesApi.assertResponseCode(response, NOT_FOUND);


});
