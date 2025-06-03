import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test.use({usersNumber: 2});

let user1Request;
let user2Request; 
let user2ArticlesApi;
let user1ArticlesApi;
let user1ArticleSlug;

test.beforeEach(async ({userRequests, newArticleData}) => {
  user1Request = userRequests[0];
  user2Request = userRequests[1];
  user1ArticlesApi = new ArticlesApi(user1Request);
  user2ArticlesApi = new ArticlesApi(user2Request);
  
  const response = await user1ArticlesApi.createArticle(newArticleData);
  user1ArticleSlug = await user1ArticlesApi.getArticleSlugFromResponse(response);
});

test('Read artile created by user1 as authorized user2', async ({articlesApi}) => {
  const response = await user2ArticlesApi.readArticle(user1ArticleSlug);
  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertArticleResponseToHaveRequiredFields(response);
});