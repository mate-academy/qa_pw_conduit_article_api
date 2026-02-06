import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow not existing user profile`, async ({
  newUserData,
  userRequests,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.followProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
