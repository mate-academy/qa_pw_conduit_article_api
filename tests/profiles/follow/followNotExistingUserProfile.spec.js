import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow profile for not existing user`, async ({ newUserData, request }) => {
  const profilesApi = new ProfilesApi(request);
  const response = await profilesApi.followProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
