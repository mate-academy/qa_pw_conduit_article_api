import { test } from '../../_fixtures/fixtures';

test('Successful user registration', async ({ newUserData, usersApi }) => {
  const response = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(response);

  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);
  await usersApi.assertEmailHasCorrectValue(response, newUserData.email);
  await usersApi.assertResponseBodyContainsToken(response);
});
