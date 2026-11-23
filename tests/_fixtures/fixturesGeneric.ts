import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

type GenericFixtures = {
  usersNumber: number;
  contextsNumber: number;
  infoTestLog: string;
  addAllureTestHierarchy: string;
};

type GenericWorkerFixtures = {
  logger: Logger;
};

export const test = base.extend<GenericFixtures, GenericWorkerFixtures>({
  usersNumber: [1, { option: true }],
  contextsNumber: [1, { option: true }],

  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file.replace(/\\/g, '/');
      const indexOfTestSubfolderStart = fileName.indexOf('/tests/') + 7;
      const testFileName = fileName.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${testFileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${testFileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        testInfo.file,
        logger,
      );

      if (parentSuite) {
        await allure.parentSuite(parentSuite);
      }

      if (suite) {
        await allure.suite(suite);
      }

      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarchy');
    },
    { scope: 'test', auto: true },
  ],
});
