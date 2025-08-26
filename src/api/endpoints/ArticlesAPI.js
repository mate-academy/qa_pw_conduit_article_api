import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';
import { expect } from '@playwright/test';

export class ArticleApi extends BaseAPI {
  constructor (request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData) {
    return await this.step('Create article', async () => {
      console.log(ROUTES.articles().index);
      return await this.request.post(
        ROUTES.articles().index, {
          data: { article: articleData },
        }
      );
    });
  }

  async readArticle(articleName) {
    return await this.step('Create article', async () =>{
      return await this.request.get(ROUTES.articles(articleName).read);
    });
  }

  async assertArticleHasFieldValue(response, fieldName, fieldValue) {
    await this.step(`Assert article has fieldName ${fieldName}`, async (
      ) => {
        const body = await this.parseBody(response);
        expect(body.article[fieldName]).toEqual(fieldValue);
      });
  }

  async getArticleSlug(response) {
    return await this.step('Get article slug from article response',
      async () => {
        const body = await this.parseBody(response);
        return await body.article.slug;
    });
  }
}
