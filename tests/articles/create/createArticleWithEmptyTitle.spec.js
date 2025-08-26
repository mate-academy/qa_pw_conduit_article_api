import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  'Create article with empty title',
  async ({ articleWithEmptyTitle,  userRequests}) => {
    const userRequest = await userRequests[0];
    const articleApi = new ArticleApi(userRequest);
    const response = await articleApi.createArticle(articleWithEmptyTitle);

    await articleApi.assertUnprocessableEntityResponseCode(response);

});
