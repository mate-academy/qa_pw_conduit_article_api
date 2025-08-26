import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';


test(
  'Create article by unauthorized user',
  async ({ newArticle,  userRequestWithoutToken }) => {

    const articleApi = new ArticleApi(userRequestWithoutToken);
    const response = await articleApi.createArticle(newArticle);

    await articleApi.assertUnauthorizedResponseCode(response);
});
