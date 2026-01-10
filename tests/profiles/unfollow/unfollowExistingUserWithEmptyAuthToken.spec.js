import { ProfilesApi } from "../../../src/api/endpoints/ProfilesApi";
import { test } from "../../_fixtures/fixtures";

test.use({usersNumber: 2})
let user1Request;
let user2;

test.beforeEach(async ({ registeredUsers, userRequests }) => {
  user1Request = userRequests[0];
  user2 = registeredUsers[1];
  const authProfilesApi = new ProfilesApi(user1Request);
  const response = await authProfilesApi.followProfile(user2.username);
  await authProfilesApi.assertSuccessResponseCode(response);
});

test(`Unfollow profile for existing user with empty auth token`, async ({
  profilesApi,
}) => {
  const response = await profilesApi.unfollowProfile(user2.username);
  await profilesApi.assertUnauthorizedResponseCode(response);
});
