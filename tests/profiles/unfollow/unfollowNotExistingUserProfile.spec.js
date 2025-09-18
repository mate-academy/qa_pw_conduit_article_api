import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { ROUTES } from '../../../src/constants/apiRoutes';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Unfollow not existing user profile`, async ({ userRequests }) => {
  const followerReq = userRequests[0];
  const profilesApi = new ProfilesApi(followerReq);

  const ghost = `non_existing_${Date.now()}`;

  const res = await followerReq.delete(ROUTES.profiles(ghost).follow);

  // Prefer your own helpers if present; fall back to generic 404
  if (profilesApi.assertNotFoundResponseCode) {
    await profilesApi.assertNotFoundResponseCode(res);
  } else {
    await profilesApi.assertErrorResponseCode(res, 404);
  }
});
