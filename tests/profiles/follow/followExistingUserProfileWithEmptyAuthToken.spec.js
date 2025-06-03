import { UNAUTHORIZED } from '../../../src/constants/responceCodes';
import { test } from '../../_fixtures/fixtures';

test(`Follow profile for existing user with empty auth token`, async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.followProfile(registeredUser.username);

  await profilesApi.assertResponseCode(response, UNAUTHORIZED)
});
