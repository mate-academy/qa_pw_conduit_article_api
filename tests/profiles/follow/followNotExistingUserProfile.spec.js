import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow profile for not existing user`, async ({
  newUserData,
  userRequests,
}) => {
  const authenticatedProfilesApi = new ProfilesApi(userRequests[0]);

  const response = await authenticatedProfilesApi.followProfile(
    newUserData.username,
  );

  await authenticatedProfilesApi.assertNotFoundResponseCode(response);
});
