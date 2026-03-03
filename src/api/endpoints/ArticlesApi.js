import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, token) {
    return await this.step(`Create new article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: {
          article: {
            title: articleData.title,
            description: articleData.description,
            body: articleData.text,
            tagList: articleData.tags,
          },
        },
        headers: {
          ...this._headers,
          authorization: `Token ${token}`,
        },
      });
    });
  }

  async createArticleUnauthorized(articleData) {
    return await this.step(`Create article as unauthorized user`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: {
          article: {
            title: articleData.title,
            description: articleData.description,
            body: articleData.text,
            tagList: articleData.tags,
          },
        },
        headers: this._headers,
      });
    });
  }

  async getArticle(slug, token = null) {
    return await this.step(`Get article by slug`, async () => {
      const headers = token
        ? { ...this._headers, authorization: `Token ${token}` }
        : this._headers;

      return await this.request.get(ROUTES.articles.bySlug(slug), {
        headers,
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async assertTitleIsCorrect(response, title) {
    await this.step(`Assert article title is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionIsCorrect(response, description) {
    await this.step(`Assert article description is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.description).toBe(description);
    });
  }

  async assertBodyIsCorrect(response, text) {
    await this.step(`Assert article body is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.body).toBe(text);
    });
  }

  async assertTagListIsCorrect(response, tags) {
    await this.step(`Assert article tagList is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.tagList).toEqual(tags);
    });
  }

  async assertAuthorUsernameIsCorrect(response, username) {
    await this.step(`Assert article author username is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.username).toBe(username);
    });
  }

  async assertErrorMessageInResponseBody(response, message) {
    await this.step(`Assert response body contains error message`, async () => {
      const body = await this.parseBody(response);

      expect(JSON.stringify(body)).toContain(message);
    });
  }
}
