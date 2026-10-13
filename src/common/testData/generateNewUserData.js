import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    username: `${firstName}_${lastName}`.replaceAll(`'`, '').toLowerCase(),
    email: `${firstName}_${faker.internet.email()}`.toLowerCase(),
    password: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}

export function generateNonExistingUsername() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const username = `${firstName}_${lastName}`.replaceAll(`'`, '').toLowerCase();
  const nonExistingUsername = `non_existing_${username}_${faker.string.numeric(5)}`;

  return nonExistingUsername;
}
