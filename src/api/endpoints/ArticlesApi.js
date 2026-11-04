import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request, userId) {
    super(request, userId);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, token) {
    return await this.step(`Create article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }
  async getArticle(slug) {
    return await this.step(`Read Article`, async () => {
      return await this.request.get(ROUTES.articles.bySlug(slug), {});
    });
  }
  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }
  async assertAuthornameHasCorrectValue(response, authorname) {
    await this.step(`Assert response body has correct authorname`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.username).toBe(authorname);
    });
  }

  async assertResponseBodyContainsSlug(response) {
    await this.step(`Assert response body contains slug`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.slug.length > 1).toBe(true);
    });
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
  async assertFollowingFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in 'following' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.following).toBe(value);
      },
    );
  }
  async assertFollowingHasValueFalse(response) {
    await this.assertFollowingFieldHasValue(response, false);
  }
  async assertFollowingHasValueTrue(response) {
    await this.assertFollowingFieldHasValue(response, true);
  }
}
