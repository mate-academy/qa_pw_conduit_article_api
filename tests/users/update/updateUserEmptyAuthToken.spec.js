import { test } from '../../_fixtures/fixtures';

test(`Update user with empty auth token`, async ({
  registeredUser,
  usersApi,
}) => {
  registeredUser['bio'] = 'Updated bio for the user.';
  registeredUser['image'] = 'https://example.com/updateduser.jpg';
  registeredUser['token'] = '';

  const response = await usersApi.updateUser(registeredUser);

  await usersApi.assertUnauthorizedResponseCode(response);
});
