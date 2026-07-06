import { test } from '../../../tests/_fixtures/fixtures';
import { ArticleApi } from '../../../src/api/endpoints/ArticleApi';


test.use({ usersNumber: 2 });

test(`Read article created by user1 authorized as user2`, async ({
  registeredUsers,
  userRequests,
  newArticleData,
}) => {
  const user1 = registeredUsers[0];
  const articleApiUser1 = new ArticleApi(userRequests[0]);
  const articleApiUser2 = new ArticleApi(userRequests[1]);

  const createArticleResponse = await articleApiUser1.createArticle(newArticleData);
  await articleApiUser1.assertSuccessResponseCode(createArticleResponse);

  const createdArticleBody = await articleApiUser1.parseBody(createArticleResponse);
  const slug = createdArticleBody.article.slug;

  const readArticleResponse = await articleApiUser2.getArticle(slug);
await articleApiUser2.assertSuccessResponseCode(readArticleResponse);

await articleApiUser2.assertTitleHasCorrectValue(readArticleResponse, newArticleData.title);
await articleApiUser2.assertDescriptionHasCorrectValue(readArticleResponse, newArticleData.description);
await articleApiUser2.assertBodyHasCorrectValue(readArticleResponse, newArticleData.body);
await articleApiUser2.assertTagListHasCorrectValue(readArticleResponse, newArticleData.tagList);
await articleApiUser2.usernameHasCorrectValue(readArticleResponse, user1.username);
});
