import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  `Unfollow profile for not existing user by other user`,
  async ({ userRequests, newUserData}) => {

    const notExistingUserName = newUserData.username + '_notfound';
    const userRequest = await userRequests[0];
    const profilesApi = new ProfilesApi(userRequest);

    const response = await profilesApi.unfollowProfile(notExistingUserName);
    await profilesApi.assertNotFoundResponseCode(response);

  });
