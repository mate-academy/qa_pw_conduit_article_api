import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  `Unfollow profile for existing user by other user with empty auth token`,
  async ({ userRequestWithoutToken, registeredUser}) => {

    const userNameOfRegisteredUser = registeredUser.username;
    const profilesApi = new ProfilesApi(userRequestWithoutToken);

    const response = await profilesApi.unfollowProfile(
      userNameOfRegisteredUser
    );
    await profilesApi.assertUnauthorizedResponseCode(response);

  });
