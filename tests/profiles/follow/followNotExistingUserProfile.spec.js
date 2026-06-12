import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Follow not existing user profile`, async ({ userRequests }) => {
  const user2Request = userRequests[0];
  const profilesApi = new ProfilesApi(user2Request);
  const username = 'not_existing_username';

  const response = await profilesApi.followProfile(username);

  await profilesApi.assertNotFoundResponseCode(response);
});
