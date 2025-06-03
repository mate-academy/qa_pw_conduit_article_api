import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test.use({articleTagsNumber: 1});

test('Create article with all fields', async ({ userRequests, newArticleData }) => {
  const articleApi  = new ArticlesApi(userRequests[0]);
  const reponse = await articleApi.createArticle(newArticleData);
  await articleApi.assertSuccessResponseCode(reponse);
  await articleApi.assertArticleResponseToHaveRequiredFields(reponse);
});