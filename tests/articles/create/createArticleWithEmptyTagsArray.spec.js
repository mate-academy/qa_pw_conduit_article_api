import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test('Create article with empty tags array', async ({ userRequests, newArticleData }) => {
  const articleApi  = new ArticlesApi(userRequests[0]);
  const reponse = await articleApi.createArticle(newArticleData);
  await articleApi.assertSuccessResponseCode(reponse);
  await articleApi.assertArticleResponseToHaveRequiredFields(reponse);
  await articleApi.assertArticleTagListValue(reponse, []);
});