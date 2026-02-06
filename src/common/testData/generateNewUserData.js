import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const uniqueSuffix = `${faker.number.int({ min: 10000, max: 99999 })}${faker.string.alpha({ length: 6, casing: 'lower' })}`;
  const safeUsername = `user${uniqueSuffix}`.toLowerCase();

  const user = {
    username: safeUsername,
    email: faker.internet.email({
      firstName,
      lastName,
      provider: 'example.com',
    }).toLowerCase(),
    password: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
