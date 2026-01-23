import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData) {
    return await this.step(`Create new article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Get article by slug: ${slug}`, async () => {
      return await this.request.get(ROUTES.articles.bySlug(slug), {
        headers: this._headers,
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);
    return body.article.slug;
  }

  async assertTitleHasCorrectValue(response, title) {
    await this.step(`Assert article title is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(`Assert article description is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.description).toBe(description);
    });
  }

  async assertBodyHasCorrectValue(response, bodyText) {
    await this.step(`Assert article body is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.body).toBe(bodyText);
    });
  }

  async assertTagListHasCorrectValue(response, tagList) {
    await this.step(`Assert article tagList is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.tagList).toEqual(tagList);
    });
  }

  async assertAuthorUsernameHasCorrectValue(response, username) {
    await this.step(`Assert article author username is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.author.username).toBe(username);
    });
  }

  async assertSlugIsNotEmpty(response) {
    await this.step(`Assert article slug is not empty`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.slug).toBeTruthy();
      expect(body.article.slug.length).toBeGreaterThan(0);
    });
  }
}
