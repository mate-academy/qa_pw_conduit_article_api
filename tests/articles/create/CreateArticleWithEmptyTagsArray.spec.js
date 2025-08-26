import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  'Create article with empty tags array',
  async ({ articleWithoutTags,  userRequests}) => {
    const userRequest = await userRequests[0];
    const articleApi = new ArticleApi(userRequest);
    const response = await articleApi.createArticle(articleWithoutTags);

    await articleApi.assertSuccessResponseCode(response);
    await articleApi.assertArticleHasFieldValue(
      response,
      'title',
      articleWithoutTags.title,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'description',
      articleWithoutTags.description,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'body',
      articleWithoutTags.body,
    );
    await articleApi.assertArticleHasFieldValue(
      response,
      'tagList',
      [],
    );

});
