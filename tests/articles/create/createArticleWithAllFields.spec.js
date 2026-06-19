import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with all fields`, async ({ userRequests }) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const articleData = {
    title: 'Complete article',
    description: 'Article description',
    body: 'Article body',
    tagList: ['tag-one', 'tag-two'],
  };

  const response = await articlesApi.createArticle(articleData);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(response, articleData.title);
  await articlesApi.assertBodyHasCorrectValue(response, articleData.body);
  await articlesApi.assertDescriptionHasCorrectValue(
    response,
    articleData.description,
  );
  await articlesApi.assertTagListHasCorrectValue(response, articleData.tagList);
});
