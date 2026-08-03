import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Unfollow profile for existing user by 
other user with empty auth token`, async ({
  registeredUser, request}) => {
  const profilesApi = new ProfilesApi(request);

  const response = await profilesApi.unfollowProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});