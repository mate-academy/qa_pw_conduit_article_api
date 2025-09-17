import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request as pwRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test(`Follow existing user with empty auth token`, async ({
  registeredUsers,
}) => {
  const target = registeredUsers[0];

  const noAuth = await pwRequest.newContext(); // no auth headers
  try {
    const profilesApi = new ProfilesApi(noAuth);
    const response = await profilesApi.followProfile(target.username);

    if (profilesApi.assertUnauthorizedResponseCode) {
      await profilesApi.assertUnauthorizedResponseCode(response);
    } else {
      await profilesApi.assertErrorResponseCode(response, 401);
    }
    if (profilesApi.assertUnauthorizedErrorBody) {
      await profilesApi.assertUnauthorizedErrorBody(response);
    }
  } finally {
    await noAuth.dispose();
  }
});
