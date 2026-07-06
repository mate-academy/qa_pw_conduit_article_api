import { test } from '../../../tests/_fixtures/fixtures';

test(`Create article with empty body`, async ({ 
articleApi,
usersApi,
registeredUser,
newArticleData,
 }) => {


const loginResponse = await usersApi.loginUser(registeredUser);
await usersApi.assertSuccessResponseCode(loginResponse);


const token = await usersApi.parseTokenFromBody(loginResponse);
articleApi.setHeader('authorization', `Token ${token}`);

const articlewithEmptyBody = {
  ...newArticleData,
  body: ' ',
};

const response2 = await articleApi.createArticle(articlewithEmptyBody);


await articleApi.assertSuccessResponseCode(response2);
await articleApi.assertTitleHasCorrectValue(response2, articlewithEmptyBody.title);
await articleApi.assertDescriptionHasCorrectValue(response2, articlewithEmptyBody.description);
await articleApi.assertBodyHasCorrectValue(response2, articlewithEmptyBody.body);
await articleApi.assertTagListHasCorrectValue(response2, articlewithEmptyBody.tagList);


})