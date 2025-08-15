import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async getArticle(token = null) {
    return await this.step(`Get article for a user`, async () => {
      return await this.request.get(ROUTES.articles, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async createNewArticle(articleData) {
    return await this.step(`Create new article`, async () => {
      return await this.request.post(ROUTES.articles, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }

  async assertTitleHasCorrectValue(response, title) {
    await this.step(`Assert response body has correct title`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(`Assert response body has correct description`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.description).toBe(description);
    });
  }

  async assertBodyHasCorrectValue(response, bodyy) {
    await this.step(`Assert response body has correct body`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.bodyy).toBe(bodyy);
    });
  }

  async assertTagListHasCorrectValue(response, tagList) {
    await this.step(`Assert response body has correct tagList`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.tagList).toStrictEqual(tagList);
    });
  }

}
