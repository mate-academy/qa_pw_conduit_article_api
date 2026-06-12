import { ProfilesApi } from "../../../src/api/endpoints/ProfilesApi";
import { test } from "../../_fixtures/fixtures";

test(`Unfollow not existing user profile`, async ({userRequests}) => {
  const username = 'not_existing_username';
  const user2Request = userRequests[0];

  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.unfollowProfile(username);

  await profilesApi.assertNotFoundResponseCode(response);
});