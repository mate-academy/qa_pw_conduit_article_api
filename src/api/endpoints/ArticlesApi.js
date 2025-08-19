import { BaseAPI } from '../BaseApi';
import { expect } from '@playwright/test';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(article, token = null) {
    return await this.step(`Create article`, async () => {
      const headers = {
        ...this._headers,
      };
      if (token !== null) {
        headers.authorization = `Token ${token}`;
      }
      return await this.request.post(ROUTES.articles.index, {
        headers,
        data: article,
      });
    });
  }

  async readArticle(slug, token = null) {
    return await this.step(`Read article`, async () => {
      const headers = {
        ...this._headers,
      };
      if (token !== null) {
        headers.authorization = `Token ${token}`;
      }
      return await this.request.get(ROUTES.articles.read(slug), {
        headers,
      });
    });
  }

  async assertTitleHasCorrectTitle(response, titleName) {
    await this.step(`Assert response body has correct title`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(titleName);
    });
  }

  async assertTagsNumberIsCorrect(response, tagsNumber) {
    await this.step(`Assert response has correct tags number`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.tagList.length).toBe(tagsNumber);
    });
  }
}
