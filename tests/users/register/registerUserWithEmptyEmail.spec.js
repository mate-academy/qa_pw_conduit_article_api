import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Register user with empty email', async ({ usersApi, newUserData }) => {
  const response = await usersApi.registerNewUser({
    email: '',
    password: newUserData.password,
    username: newUserData.username,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_MESSAGE,
    'email',
  );
});
