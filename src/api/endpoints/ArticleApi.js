import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticleApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createNewArticle(articleData) {
    return await this.step(`Create new article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }

  async readArticle(articleSlug) {
    return await this.step(`Read article`, async () => {
      return await this.request.get(ROUTES.articles(articleSlug).read, {
        headers: this._headers,
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async assertTitleHasCorrectValue(response, title) {
    await this.step(`Assert response body has correct title`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(
      `Assert response body has correct description`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.description).toBe(description);
      },
    );
  }

  async assertBodyHasCorrectValue(response, bodyContent) {
    await this.step(
      `Assert response body has correct body content`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.body).toBe(bodyContent);
      },
    );
  }
}
