import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/responceCodes';

test.use({ usersNumber: 2 });

test(`Follow not existing user profile`, async ({
  newUserData,
  userRequests,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.followProfile(newUserData.username);
  await profilesApi.assertResponseCode(response, NOT_FOUND);
});
