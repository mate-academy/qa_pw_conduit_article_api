import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import {test} from '../../_fixtures/fixtures';

test('Create article by unauthorized', async ({ userRequests, newArticleData, articlesApi }) => {
  const reponse = await articlesApi.createArticle(newArticleData);
  await articlesApi.assertUnauthorizedResponseCode(reponse);
});