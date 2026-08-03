import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Follow profile for non existing user by other user`, async ({
  userRequests,
  newUserData,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.followProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
