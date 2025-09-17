import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow not existing user profile`, async ({ userRequests }) => {
  const followerReq = userRequests[0];
  const profilesApi = new ProfilesApi(followerReq);

  const ghost = `non_existing_${Date.now()}`;
  const response = await profilesApi.followProfile(ghost);

  if (profilesApi.assertNotFoundResponseCode) {
    await profilesApi.assertNotFoundResponseCode(response);
  } else {
    await profilesApi.assertErrorResponseCode(response, 404);
  }
  if (profilesApi.assertNotFoundErrorBody) {
    await profilesApi.assertNotFoundErrorBody(response, 'profile');
  }
});
