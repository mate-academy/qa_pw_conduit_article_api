import { test } from '../../../tests/_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({ 
articleApi,
usersApi,
registeredUser,
newArticleData,
 }) => {


const loginResponse = await usersApi.loginUser(registeredUser);
await usersApi.assertSuccessResponseCode(loginResponse);


const response2 = await articleApi.createArticle(newArticleData);

await articleApi.assertUnauthorizedResponseCode(response2);


})