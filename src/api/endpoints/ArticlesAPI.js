import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, token = null) {
    return await this.step(`Create article: ${articleData.title}`, async () => {
      const headers = token
        ? { ...this._headers, Authorization: `Token ${token}` }
        : this._headers;

      return await this.request.post(ROUTES.articles().create, {
        headers,
        data: { article: articleData },
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Get article by slug: ${slug}`, async () => {
      return await this.request.get(ROUTES.articles(slug).bySlug, {
        headers: this._headers,
      });
    });
  }

  async getArticles(params = {}) {
    return await this.step(`Get all articles`, async () => {
      return await this.request.get(ROUTES.articles().index, {
        headers: this._headers,
        params,
      });
    });
  }

  async updateArticle(slug, updatedData, token) {
    return await this.step(`Update article: ${slug}`, async () => {
      const headers = { ...this._headers, Authorization: `Token ${token}` };
      return await this.request.put(ROUTES.articles(slug).update, {
        headers,
        data: { article: updatedData },
      });
    });
  }

  async deleteArticle(slug, token) {
    return await this.step(`Delete article: ${slug}`, async () => {
      const headers = { ...this._headers, Authorization: `Token ${token}` };
      return await this.request.delete(ROUTES.articles(slug).delete, {
        headers,
      });
    });
  }

  async assertTitle(response, title) {
    await this.step(`Assert article title is '${title}'`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.title).toBe(title);
    });
  }

  async assertDescription(response, description) {
    await this.step(
      `Assert article description is '${description}'`,
      async () => {
        const body = await this.parseBody(response);
        expect(body.article.description).toBe(description);
      },
    );
  }

  async assertBody(response, bodyText) {
    await this.step(`Assert article body is '${bodyText}'`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.body).toBe(bodyText);
    });
  }

  async assertTags(response, tags = []) {
    await this.step(`Assert article tags are '${tags}'`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.tagList).toEqual(tags);
    });
  }

  async assertSlugExists(response) {
    await this.step(`Assert article slug exists`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.slug).toBeTruthy();
    });
  }
}