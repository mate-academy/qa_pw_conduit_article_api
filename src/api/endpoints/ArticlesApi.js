import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, authorization) {
    return await this.step('Create new article', async () => {
      const headers = { ...this._headers };

      if (authorization !== undefined) {
        headers.authorization = authorization;
      }

      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers,
      });
    });
  }

  async getArticle(slug, authorization) {
    return await this.step('Get article by slug', async () => {
      const headers = { ...this._headers };

      if (authorization !== undefined) {
        headers.authorization = authorization;
      }

      return await this.request.get(ROUTES.articles.bySlug(slug), {
        headers,
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async assertArticleHasCorrectValues(response, articleData) {
    await this.step('Assert article has correct values', async () => {
      const body = await this.parseBody(response);
      const article = body.article;

      expect(article.title).toBe(articleData.title);
      expect(article.description).toBe(articleData.description);
      expect(article.body).toBe(articleData.body);
      expect(article.tagList).toEqual(
        expect.arrayContaining(articleData.tagList ?? []),
      );
      expect(article.tagList).toHaveLength((articleData.tagList ?? []).length);
      expect(article.slug).toBeTruthy();
    });
  }

  async assertArticleAuthor(response, username) {
    await this.step('Assert article author', async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.username).toBe(username);
    });
  }
}
