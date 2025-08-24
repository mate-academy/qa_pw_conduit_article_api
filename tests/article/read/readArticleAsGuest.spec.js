import { test, expect } from '../../_fixtures/fixtures';

let slug;

test(`Create and Read Article as unauthorized user`, async ({
  articlesApi,
  newArticleWithoutTags,
  registeredUser,
}) => {
  await articlesApi.step('Create new Article', async () => {
    const response = await articlesApi.createArticle(
      newArticleWithoutTags,
      registeredUser.token,
    );

    await articlesApi.assertSuccessResponseCode(response);
    slug = await articlesApi.parseSlug(response);
  });

  await articlesApi.step(
    'Read existing Article by unauthorized user',
    async () => {
      const response = await articlesApi.getArticle(slug);

      await articlesApi.assertSuccessResponseCode(response);
      await articlesApi.assertTitleCorrect(
        response,
        newArticleWithoutTags.title,
      );
      await articlesApi.assertDescriptionCorrect(
        response,
        newArticleWithoutTags.description,
      );
      await articlesApi.assertBodyCorrect(response, newArticleWithoutTags.body);
      await articlesApi.assertTagListCorrect(
        response,
        newArticleWithoutTags.tagList,
      );
      await articlesApi.assertAuthorCorrect(response, registeredUser.username);
    },
  );
});
