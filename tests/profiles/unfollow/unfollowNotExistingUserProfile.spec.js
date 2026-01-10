import { ProfilesApi } from "../../../src/api/endpoints/ProfilesApi";
import { test } from "../../_fixtures/fixtures";

test(`Unfollow profile for not existing user`, async ({
  userRequests,
}) => {
  const userRequest = userRequests[0];
  const profilesApi = new ProfilesApi(userRequest);
  const response = await profilesApi.unfollowProfile('randomUsername');
  await profilesApi.assertNotFoundResponseCode(response);
});