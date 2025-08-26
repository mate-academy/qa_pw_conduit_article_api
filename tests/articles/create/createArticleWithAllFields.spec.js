import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  'Create article with all fields',
  async ({ newArticle,  userRequests}) => {
    const userRequest = await userRequests[0];
    const articleApi = new ArticleApi(userRequest);
    const response = await articleApi.createArticle(newArticle);

    await articleApi.assertSuccessResponseCode(response);
    await articleApi.assertArticleHasFieldValue(
      response,
      'title',
      newArticle.title,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'description',
      newArticle.description,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'body',
      newArticle.body,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'tagList',
      newArticle.tagList,
    );

});
