import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { ROUTES } from '../../../src/constants/apiRoutes';
import { test } from '../../_fixtures/fixtures';
import { request as pwRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test(`Unfollow existing user with empty auth token`, async ({
  registeredUsers,
}) => {
  const target = registeredUsers[0];

  // No auth headers context
  const noAuth = await pwRequest.newContext();
  try {
    const res = await noAuth.delete(ROUTES.profiles(target.username).follow);
    const dummy = new (class extends ProfilesApi {
      constructor() { super(noAuth); }
    })();

    if (dummy.assertUnauthorizedResponseCode) {
      await dummy.assertUnauthorizedResponseCode(res);
    } else {
      await dummy.assertErrorResponseCode(res, 401);
    }
  } finally {
    await noAuth.dispose();
  }
});
