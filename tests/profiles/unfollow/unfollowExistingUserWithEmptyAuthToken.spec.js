import { test } from '../../_fixtures/fixtures';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';

test.use({ usersNumber: 2 });

test(`Unfollow profile for existing user with empty auth token`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const followResponse = await profilesApi.followProfile(
    user1.username,
    registeredUsers[1].token
  );
  await profilesApi.assertSuccessResponseCode(followResponse);

  const unfollowResponse = await profilesApi.unfollowProfile(
    user1.username,
    ''
  );
  await profilesApi.assertUnauthorizedResponseCode(unfollowResponse);
});