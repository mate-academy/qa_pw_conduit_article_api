import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test(`Unfollow existing user with empty auth token`, async ({
  registeredUser,
}) => {
  const emptyTokenRequest = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: `Token `,
      'content-type': 'application/json',
    },
  });

  const profilesApi = new ProfilesApi(emptyTokenRequest);

  const response = await profilesApi.unfollowProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
