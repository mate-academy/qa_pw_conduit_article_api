import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test.use({articleTagsNumber: 1});
const titleValue = '';

test('Create article with empty title', async ({ userRequests, newArticleData }) => {
  newArticleData.title = titleValue;
  const articleApi  = new ArticlesApi(userRequests[0]);
  const reponse = await articleApi.createArticle(newArticleData);
  await articleApi.assertUnprocessableEntityResponseCode(reponse);
});