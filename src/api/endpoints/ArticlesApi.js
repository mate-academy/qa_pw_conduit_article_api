import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async createArticle(articleData) {
    return await this.step(`Create article`, async () => {
      return await this.request.post(ROUTES.articles.index, {
        data: { article: articleData },
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }

  async readArticle(slug) {
    return await this.step(`Read article`, async () => {
      return await this.request.get(ROUTES.articles.bySlug(slug));
    });
  }

  async assertArticlesFieldsMatch(response, expected) {
    await this.step(`Assert response body fields match expected`, async () => {
      const body = await this.parseBody(response);
      expect(body.article).toMatchObject({
        title: expected.title,
        description: expected.description,
        body: expected.body,
      });
    });
  }

  async assertTaglistFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in TagList`,
      async () => {
        const body = await this.parseBody(response);
        expect(body.article.tagList).toEqual(value);
      },
    );
  }

  async assertTagListIsEmpty(response) {
    await this.assertTaglistFieldHasValue(response, []);
  }
}
