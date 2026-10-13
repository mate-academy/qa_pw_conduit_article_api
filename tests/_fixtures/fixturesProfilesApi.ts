import { test as base } from '@playwright/test';
import { ProfilesApi } from '../../src/api/endpoints/ProfilesApi';

export const test = base.extend<{
  profilesApi;
  followedProfile;
}>({
  profilesApi: async ({ request }, use) => {
    const client = new ProfilesApi(request);

    await use(client);
  },

  followedProfile: async (
    { registeredUsers, userRequests, usersNumber },
    use,
  ) => {
    if (usersNumber < 2) {
      throw new Error('followedProfile requires test.use({ usersNumber: 2 })');
    }

    const user1 = registeredUsers[0];
    const user2Request = userRequests[1];

    const followerProfilesApi = new ProfilesApi(user2Request);
    const response = await followerProfilesApi.followProfile(user1.username);

    await followerProfilesApi.assertSuccessResponseCode(response);
    await followerProfilesApi.assertFollowingHasValueTrue(response);
    await use({
      followedUsername: user1.username,
      followerProfilesApi,
    });
  },
});
