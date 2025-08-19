import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by one user as authorized as another`, async ({
  createdArticleData,
  articlesApi,
  registeredUsers,
}) => {
  const user1 = registeredUsers[0];
  const user2 = registeredUsers[1];

  const response = await articlesApi.createArticle(
    { article: createdArticleData },
    user1.token,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectTitle(
    response,
    createdArticleData.title,
  );

  const {
    article: { slug },
  } = await response.json();
  const readResponse = await articlesApi.readArticle(slug, user2.token);
  await articlesApi.assertSuccessResponseCode(readResponse);
});
