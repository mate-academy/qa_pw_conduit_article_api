import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { NOT_FOUND } from '../../../src/constants/responceCodes';

test('Unfollow not existing user profile', async ({
  newUserData,
  userRequests,
}) => {
  const profilesApi = new ProfilesApi(userRequests[0]);

  const response = await profilesApi.unfollowProfile(newUserData.username);

  await profilesApi.assertResponseCode(response, NOT_FOUND);
});
