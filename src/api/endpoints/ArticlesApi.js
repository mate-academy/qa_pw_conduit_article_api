import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData) {
    return await this.step(`Create article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Get article by slug`, async () => {
      return await this.request.get(`${ROUTES.articles.index}/${slug}`, {
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

  async assertBodyHasCorrectValue(response, text) {
    await this.step(`Assert response body has correct body`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.body).toBe(text);
    });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(`Assert response body has correct description`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.description).toBe(description);
    });
  }

  async assertTagListHasCorrectValue(response, tags) {
    await this.step(`Assert response body has correct tags`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.tagList).toEqual(tags);
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }
}
