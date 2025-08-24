import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, token) {
    return await this.step(`Create new Article`, async () => {
      const headers = { ...this._headers };
      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.request.post(ROUTES.articles().index, {
        data: { article: articleData },
        headers,
      });
    });
  }

  async editArticle(articleData, slug, token) {
    return await this.step(`Update the Article`, async () => {
      const headers = { ...this._headers };
      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.request.put(ROUTES.articles(slug).certain, {
        data: { article: articleData },
        headers,
      });
    });
  }

  async getArticle(slug, token) {
    return await this.step(`Read the Article`, async () => {
      const headers = { ...this._headers };
      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.request.get(ROUTES.articles(slug).certain, {
        headers,
      });
    });
  }

  async deleteArticle(slug, token = null) {
    return await this.step(`Delete the Article`, async () => {
      const headers = { ...this._headers };
      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.request.delete(ROUTES.articles(slug).certain, {
        headers,
      });
    });
  }

  async parseSlug(response) {
    const body = await this.parseBody(response);
    await this.step(`Assert article contains 'slug'`, async () => {
      expect(body.article.slug.length > 1).toBe(true);
    });
    return body.article.slug;
  }

  async assertTitleCorrect(response, title) {
    await this.step(`Assert article has correct Title`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionCorrect(response, description) {
    await this.step(`Assert article has correct Description`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.description).toBe(description);
    });
  }

  async assertBodyCorrect(response, text) {
    await this.step(`Assert article has correct Body Text`, async () => {
      const resBody = await this.parseBody(response);

      expect(resBody.article.body).toBe(text);
    });
  }

  async assertTagListCorrect(response, tagList = []) {
    await this.step(`Assert article has correct Tags`, async () => {
      const body = await this.parseBody(response);
      const actualTagList = body.article.tagList;
      expect([...actualTagList].sort()).toEqual([...tagList].sort());
    });
  }

  async assertAuthorCorrect(response, username) {
    await this.step(`Assert article Author is correct`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.author.username).toBe(username);
    });
  }
}
