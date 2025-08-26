import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  `Unfollow profile for existing user by other user`,
  async ({ userRequests, registeredUser }) => {

    const userNameOfRegisteredUser = registeredUser.username;
    const userRequest = await userRequests[0];
    const profilesApi = new ProfilesApi(userRequest);

    const responseFollow = await profilesApi.followProfile(
      userNameOfRegisteredUser
    );

    await profilesApi.assertFollowingHasValueTrue(responseFollow);
    await profilesApi.assertUsernameHasCorrectValue(
      responseFollow,
      userNameOfRegisteredUser
    );

    const responseUnfollow = await profilesApi.unfollowProfile(
      userNameOfRegisteredUser
    );

    await profilesApi.assertFollowingHasValueFalse(responseUnfollow);
    await profilesApi.assertUsernameHasCorrectValue(
      responseUnfollow,
      userNameOfRegisteredUser
      );
  });
