import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { NOT_FOUND } from '../../../src/constants/responceCodes';
import { test } from '../../_fixtures/fixtures';


test(`Follow profile for not existing user by other user`, async ({
  userRequests,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.followProfile('randomUsername');

  await profilesApi.assertNotFoundResponseCode(response);
});
