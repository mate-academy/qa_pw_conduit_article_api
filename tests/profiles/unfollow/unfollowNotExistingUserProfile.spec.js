import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Unfollow not existing user profile`, async ({
  newUserData,
  userRequests,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.unfollowProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
