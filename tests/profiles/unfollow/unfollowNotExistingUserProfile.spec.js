import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 2 });

test(`Unfollow not existing user profile`, async ({ userRequests }) => {
  const fakeUserName = faker.person.firstName();
  const user2Request = userRequests[1];

  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.unfollowProfile(fakeUserName);
  await profilesApi.assertNotFoundResponseCode(response);
});
