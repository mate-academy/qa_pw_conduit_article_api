import { test } from '../../../tests/_fixtures/fixtures';

test(`Create article with all fields`, async ({ 
articleApi,
usersApi,
registeredUser,
newArticleData,
 }) => {


const loginResponse = await usersApi.loginUser(registeredUser);
await usersApi.assertSuccessResponseCode(loginResponse);

const token = await usersApi.parseTokenFromBody(loginResponse);
articleApi.setHeader('authorization', `Token ${token}`);

const response2 = await articleApi.createArticle(newArticleData);
await articleApi.assertSuccessResponseCode(response2);
await articleApi.assertTitleHasCorrectValue(response2, newArticleData.title);
await articleApi.assertDescriptionHasCorrectValue(response2, newArticleData.description);
await articleApi.assertBodyHasCorrectValue(response2, newArticleData.body);
await articleApi.assertTagListHasCorrectValue(response2, newArticleData.tagList);


})