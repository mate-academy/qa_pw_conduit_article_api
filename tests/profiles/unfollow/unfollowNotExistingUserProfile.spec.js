import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  `Unfollow profile for not existing user by other user`,
  async ({ userRequests, newUsersData}) => {

    const notExistingUserName = newUsersData.username;
    const userRequest = await userRequests[0];
    const profilesApi = new ProfilesApi(userRequest);

    const response = await profilesApi.unfollowProfile(notExistingUserName);
    await profilesApi.assertNotFoundResponseCode(response);
    
  });
