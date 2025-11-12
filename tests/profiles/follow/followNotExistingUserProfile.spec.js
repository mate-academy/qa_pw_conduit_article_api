import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Follow not existing user profile`, async ({
  userRequests
}) => {
  const nonExistingUsername = 'user_that_does_not_exist_12345';
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.followProfile(nonExistingUsername);

  await profilesApi.assertNotFoundResponseCode(response);
});
