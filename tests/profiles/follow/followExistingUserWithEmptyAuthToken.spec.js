import { request as apiRequest } from '@playwright/test';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Follow existing user with empty auth token`, async ({
  registeredUser,
}) => {
  const emptyAuthContext = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: `Token `,
      'content-type': 'application/json',
    },
  });

  const profilesApi = new ProfilesApi(emptyAuthContext);

  const response = await profilesApi.followProfile(registeredUser.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
