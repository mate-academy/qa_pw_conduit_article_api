import { test } from '../../../tests/_fixtures/fixtures';

test(`Create article with empty title`, async ({ 
articleApi,
usersApi,
registeredUser,
newArticleData,
 }) => {


const loginResponse = await usersApi.loginUser(registeredUser);
await usersApi.assertSuccessResponseCode(loginResponse);


const token = await usersApi.parseTokenFromBody(loginResponse);
articleApi.setHeader('authorization', `Token ${token}`);

const articlewithEmptyTitle = {
  ...newArticleData,
  title: ' ',
};

const response2 = await articleApi.createArticle(articlewithEmptyTitle);


await articleApi.assertSuccessResponseCode(response2);
await articleApi.assertTitleHasCorrectValue(response2, articlewithEmptyTitle.title);
await articleApi.assertDescriptionHasCorrectValue(response2, articlewithEmptyTitle.description);
await articleApi.assertBodyHasCorrectValue(response2, articlewithEmptyTitle.body);
await articleApi.assertTagListHasCorrectValue(response2, articlewithEmptyTitle.tagList);


})