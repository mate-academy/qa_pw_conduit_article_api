import { BaseAPI } from '../BaseApi';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/articles';
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(article) {
    return await this.step(`Create article`, async () => {
      const { title, description, text, tags } = article;

      return await this.request.post(this._endpoint, {
        data: { article: { title, description, body: text, tagList: tags } },
        headers: this._headers,
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Read article`, async () => {
      return await this.request.get(`${this._endpoint}/${slug}`, {
        headers: this._headers,
      });
    });
  }

  async parseSlugFromBody(response) {
    const body = await this.parseBody(response);

    return body.article.slug;
  }
}
