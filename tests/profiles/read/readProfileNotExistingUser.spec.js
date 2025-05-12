import { test } from '../../_fixtures/fixtures';
import { DEFAULT_IMAGE_LINK } from '../../../src/constants/defaultValues';

test(`Read profile for not existng user`, async ({
  newUserData,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(
    newUserData.username,
    newUserData.token,
  );

  await profilesApi.assertNotFoundResponseCode(response);
});
