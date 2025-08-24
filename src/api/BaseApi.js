import { expect } from '@playwright/test';
import { testStep } from '../common/helpers/pw';
import {
  SUCCESS_CODE,
  CREATED_CODE,
  NO_CONTENT_CODE,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NOT_FOUND,
} from '../constants/responseCodes';

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

  async parseIdFromBody(response) {
    const body = await this.parseBody(response);

    return body.id;
  }

  async assertResponseCode(response, code) {
    await this.step(`Assert the code ${code} is returned`, async () => {
      expect(this.parseStatus(response)).toEqual(code);
    });
  }

  async assertSuccessResponseCode(response, method = 'OK') {
    await this.step(`Assert successful response code`, async () => {
      const status = this.parseStatus(response);

      let expectedCode;
      switch (method.toUpperCase()) {
        case 'GET':
          expectedCode = SUCCESS_CODE;
          break;
        case 'POST':
          expectedCode = [SUCCESS_CODE, CREATED_CODE];
          break;
        case 'DELETE':
          expectedCode = NO_CONTENT_CODE;
          break;
        default:
          expectedCode = [SUCCESS_CODE, CREATED_CODE, NO_CONTENT_CODE];
      }

      if (Array.isArray(expectedCode)) {
        expect(expectedCode).toContain(status);
      } else {
        expect(status).toBe(expectedCode);
      }
    });
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

  async assertErrorMessageInResponseBody(response, message, key) {
    await this.step(
      `Assert response body contains error message ${key}:${message}`,
      async () => {
        const body = await this.parseBody(response);

        expect(`${key}:${body.errors[key]}`).toEqual(message);
      },
    );
  }
}
