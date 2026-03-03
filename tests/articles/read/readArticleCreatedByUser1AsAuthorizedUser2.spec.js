import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test('Read existing article created by one user as antoher authorized user',
  async ({
    articlesApi,
    articleWithOneTag,
    registeredUsers,
    userRequests,
}) => {
  const user1 = registeredUsers[0];
  const user2Request = userRequests[1]
  const articlesApiUser2 = new articlesApi.constructor(user2Request);

  const createResponse = await articlesApi.createArticle(
    articleWithOneTag,
    user1.token
  );
  await articlesApi.assertSuccessResponseCode(createResponse);

  const createdArticle = await articlesApi.parseBody(createResponse);
  const slug = createdArticle.article.slug;

  const readResponse = await articlesApiUser2.getArticle(slug);
  await articlesApiUser2.assertSuccessResponseCode(readResponse);

  await articlesApiUser2.assertTitle(readResponse, articleWithOneTag.title);
  await articlesApiUser2.assertDescription(
    readResponse,
    articleWithOneTag.description
  );
  await articlesApiUser2.assertBody(readResponse, articleWithOneTag.body);
  await articlesApiUser2.assertTags(readResponse, articleWithOneTag.tagList);
  await articlesApiUser2.assertSlugExists(readResponse);
  });