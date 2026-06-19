import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow profile for not existing user`, async ({
  userRequests,
  newUserData,
}) => {
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);
  const response = await profilesApi.unfollowProfile(newUserData.username);

  await profilesApi.assertNotFoundResponseCode(response);
});
