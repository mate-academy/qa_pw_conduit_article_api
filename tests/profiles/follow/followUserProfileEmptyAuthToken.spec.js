import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Follow profile by other user with empty auth token`, async ({
  registeredUser, request}) => {
  const profilesApi = new ProfilesApi(request);

  const response = await profilesApi.followProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});

