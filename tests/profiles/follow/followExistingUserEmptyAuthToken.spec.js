import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow profile with empty auth token`, async ({ registeredUser, request }) => {
  const profilesApi = new ProfilesApi(request);
  const response = await profilesApi.followProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
