import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  async createNewArticle(articleData) {
    return await this.step(`Create new article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Get article`, async () => {
      return await this.request.get(ROUTES.articles.bySlug(slug).read);
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async assertArticleHasCorrectValues(response, articleData) {
    await this.step(
      `Assert response body has correct article data`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.title).toBe(articleData.title);
        expect(body.article.description).toBe(articleData.description);
        expect(body.article.body).toBe(articleData.body);
        expect(body.article.tagList).toEqual(articleData.tagList);
      },
    );
  }
}
