import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test.use({articleTagsNumber: 1});
const bodyValue = '';

test('Create article with empty body', async ({ userRequests, newArticleData }) => {
  newArticleData.body = bodyValue;
  const articleApi  = new ArticlesApi(userRequests[0]);
  const reponse = await articleApi.createArticle(newArticleData);
  await articleApi.assertSuccessResponseCode(reponse);
  await articleApi.assertArticleResponseToHaveRequiredFields(reponse);
  await articleApi.assertArticleBodyValue(reponse, bodyValue);
});