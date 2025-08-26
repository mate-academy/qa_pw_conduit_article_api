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

    await articleApi.assertSuccessResponseCode(response);
    await articleApi.assertArticleHasFieldValue(
      response,
      'title',
      articleWithEmptyTitle.title,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'description',
      articleWithEmptyTitle.description,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'body',
      articleWithEmptyTitle.body,
    );
    await articleApi.assertArticleHasFieldValue(response, 'tagList', []);
});
