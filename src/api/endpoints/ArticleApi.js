import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticleApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }


async createArticle(article){
return await this.step(`Create new article`, async () => {
  return await this.request.post(ROUTES.articles.index, {
    headers: this._headers,
    data: {
      article: article,
    },
  });
  });
}

setHeader(key, value) {
  this._headers[key] = value;
}

async getArticle(slug){
  return await this.step(`Get article by slug`, async () => {
    return await this.request.get(ROUTES.articles.slug(slug), {
      headers: this._headers,
    });
  });
}

async usernameHasCorrectValue(response, username) {
  await this.step(`Assert response body has correct username`, async () => {
    const body = await this.parseBody(response);

    expect(body.article.author.username).toBe(username);
  }); 

}

async assertTitleHasCorrectValue(response, title) {
  await this.step(`Assert response body has correct title`, async () => {
    const body = await this.parseBody(response);

    expect(body.article.title).toBe(title);
  }); 

}

async assertDescriptionHasCorrectValue(response, description) {
  await this.step(`Assert response body has correct description`, async () => {
    const body = await this.parseBody(response);
    
    expect(body.article.description).toBe(description);
  }); 

}
async assertBodyHasCorrectValue(response, bodyContent) {
  await this.step(`Assert response body has correct body content`, async () => {
    const body = await this.parseBody(response);
    
    expect(body.article.body).toBe(bodyContent);
  }); 

}

async assertTagListHasCorrectValue(response, tagList) {
  await this.step(`Assert response body has correct tagList`, async () => {
    const body = await this.parseBody(response);
    
    expect(body.article.tagList).toEqual(tagList);
  });
}

async assertFavoriteCountIsVisible(response, count) {
  await this.step(`Assert response body has correct favoriteCount`, async () => {
    const body = await this.parseBody(response);
    
    expect(body.article.favoritesCount).toBe(count);
  });

}
}