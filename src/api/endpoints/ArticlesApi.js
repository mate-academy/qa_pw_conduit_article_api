import { expect } from "allure-playwright";
import { ROUTES } from "../../constants/apiRoutes";
import { BaseAPI } from "../BaseApi";

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async readArticle(slug) {
    return await this.step(`Read article with slug: ${slug}`, async () => {
      return await this.request.get(`${ROUTES.articles}/${slug}`, {
        headers: {
          ...this._headers,
        },
      });
    });
  }

  async assertArticleBodyValue(response, expectedValue) {
    await this.step(`Assert body value is ${expectedValue}`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.body).toEqual(expectedValue);
    });
  }

  async assertArticleTagListValue(response, expectedValue) {
    await this.step(`Assert tagList value is ${expectedValue}`, async () => {
      const body = await this.parseBody(response);
      expect(body.article.tagList).toEqual(expectedValue);
    });
  }

  async assertArticleResponseToHaveRequiredFields(response) {
    const body = await this.parseBody(response);
    await this.step(`Assert article response has required fields`, async () => {
      expect(body).toHaveProperty('article');
      for (const field in postArticleResponse.article) {
        expect(body.article).toHaveProperty(field);
      }
    });
  }

  async getArticleSlugFromResponse(response) {
    return await this.step(`Get article slug from response`, async () => {
      const body = await this.parseBody(response);
      expect(body.article).toHaveProperty('slug');
      return body.article.slug;
    });
  }


  async createArticle(articleData) {
      return await this.step(`Create article`, async () => {
        return await this.request.post(ROUTES.articles, {
          headers: {
            ...this._headers,
          },
          data: {
            "article": articleData,
          },
        });
      });
    }
}

const postArticleResponse = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: null,
      image: '',
      following: false
    }
  }
}
