import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';



test(
  `Follow profile for existing user by other user with empty auth token`,
  async ({ registeredUser, userRequestWithoutToken }) => {
      const userName = await registeredUser.username;
      const profilesApi = new ProfilesApi(userRequestWithoutToken);
      const response = await profilesApi.followProfile(userName);
      await profilesApi.assertUnauthorizedResponseCode(response);


});
