import { test } from '../../_fixtures/fixtures';
import { EMPTY_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Register user with empty password', async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser({
    email: newUserData.email,
    password: '',
    username: newUserData.username,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    EMPTY_PASSWORD_MESSAGE,
    'password',
  );
});
