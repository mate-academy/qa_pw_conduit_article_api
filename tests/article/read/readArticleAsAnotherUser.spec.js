import { test, expect } from '../../_fixtures/fixtures';

let slug;

test.use({ usersNumber: 2 });

test(`Create the Article and Read it by another user`, async ({
  articlesApi,
  newArticleWithoutTags,
  registeredUsers,
}) => {
  await articlesApi.step('Create new Article', async () => {
    const user1 = registeredUsers[0];
    const response = await articlesApi.createArticle(
      newArticleWithoutTags,
      user1.token,
    );

    await articlesApi.assertSuccessResponseCode(response);
    slug = await articlesApi.parseSlug(response);
  });

  await articlesApi.step('Read Article by Another user', async () => {
    const user1 = registeredUsers[0];
    const user2 = registeredUsers[1];

    const response = await articlesApi.getArticle(slug, user2.token);

    await articlesApi.assertSuccessResponseCode(response);
    await articlesApi.assertTitleCorrect(response, newArticleWithoutTags.title);
    await articlesApi.assertDescriptionCorrect(
      response,
      newArticleWithoutTags.description,
    );
    await articlesApi.assertBodyCorrect(response, newArticleWithoutTags.body);
    await articlesApi.assertTagListCorrect(
      response,
      newArticleWithoutTags.tagList,
    );
    await articlesApi.assertAuthorCorrect(response, user1.username);
  });
});
