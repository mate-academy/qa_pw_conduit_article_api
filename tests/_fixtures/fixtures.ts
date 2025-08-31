import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as usersApiTest } from './fixturesUsersApi';
import { test as profilesApiTest } from './fixturesProfilesApi';
import { test as fixturesArticleTest } from './fixturesArticle';

export const test = mergeTests(usersApiTest, genericTest, profilesApiTest, fixturesArticleTest);

