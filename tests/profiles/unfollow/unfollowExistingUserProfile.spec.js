import { ProfilesApi } from "../../../src/api/endpoints/ProfilesApi";
import { test } from "../../_fixtures/fixtures";

test.use({usersNumber: 2})
let user1Request;
let user2;
let user1ProfilesApi;

test.beforeEach(async ({ registeredUsers, userRequests }) => {
  user1Request = userRequests[0];
  user2 = registeredUsers[1];
  user1ProfilesApi = new ProfilesApi(user1Request);
  const response = await user1ProfilesApi.followProfile(user2.username);
  await user1ProfilesApi.assertSuccessResponseCode(response);
});

test(`Unfollow profile for existing user`, async ({
  registeredUsers,
}) => {
  const response = await user1ProfilesApi.unfollowProfile(user2.username);
  await user1ProfilesApi.assertSuccessResponseCode(response);
  await user1ProfilesApi.assertFollowingHasValueFalse(response);
});
