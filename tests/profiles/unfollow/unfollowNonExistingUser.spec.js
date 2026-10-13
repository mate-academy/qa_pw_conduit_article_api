import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { generateNonExistingUsername } from '../../../src/common/testData/generateNewUserData';

test(`Unfollow profile of non-existing user`, async ({ userRequests }) => {
  const userRequest = userRequests[0];
  const profilesApi = new ProfilesApi(userRequest);

  const nonExistingUsername = generateNonExistingUsername();

  const response = await profilesApi.unfollowProfile(nonExistingUsername);
  await profilesApi.assertNotFoundResponseCode(response);
});
