import { expect } from '@playwright/test';
import { testStep } from '../common/helpers/pw';
import {
  SUCCESS_CODE,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from '../constants/responceCodes';

export class BaseAPI {
  _endpoint;
  _headers;

  constructor(request) {
    this.request = request;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  parseStatus(response) {
    return response.status();
  }

  async parseBody(response) {
    return await response.json();
  }

  async parseText(response) {
    return await response.text();
  }

  async parseIdFromBody(response) {
    const body = await this.parseBody(response);

    return body.id;
  }

  async assertResponseCode(response, code) {
    await this.step(`Assert the code ${code} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(code);
    });
  }

  async assertSuccessResponseCode(response) {
    await this.assertResponseCode(response, SUCCESS_CODE);
  }

  async assertInternalServerErrorResponseCode(response) {
    await this.assertResponseCode(response, INTERNAL_SERVER_ERROR);
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.assertResponseCode(response, UNPROCESSABLE_ENTITY);
  }

  async assertUnauthorizedResponseCode(response) {
    await this.assertResponseCode(response, UNAUTHORIZED);
  }

  async assertNotFoundResponseCode(response) {
    await this.assertResponseCode(response, NOT_FOUND);
  }

  async assertBodyIsNotEmpty(response) {
    await this.step(`Assert response body is not empty`, async () => {
      const body = await this.parseBody(response);

      expect(body).not.toBe([]);
    });
  }

  async assertErrorMessageInJSONResponseBody(response, message, key = null) {
    await this.step(
      `Assert response body contains error message ${key ? `${key}:` : ''}${message}`,
      async () => {
        const body = await this.parseBody(response);

        if (key) {
          // Если key передан, проверяем конкретное поле в errors
          expect(body.errors[key]).toEqual(message);
        } else {
          // Если key не передан, проверяем общее сообщение об ошибке
          expect(body.message || body.error).toEqual(message);
        }
      },
    );
  }

  async assertTextResponseContains(response, message) {
    await this.step(`Assert response text contains: ${message}`, async () => {
      const text = await this.parseText(response);
      expect(text).toContain(message);
    });
  }
}
