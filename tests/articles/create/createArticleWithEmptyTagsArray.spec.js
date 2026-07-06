import { test } from '../../../tests/_fixtures/fixtures';

test(`Create article with empty tags array`, async ({ 
articleApi,
usersApi,
registeredUser,
newArticleData,
 }) => {


const loginResponse = await usersApi.loginUser(registeredUser);
await usersApi.assertSuccessResponseCode(loginResponse);


const token = await usersApi.parseTokenFromBody(loginResponse);
articleApi.setHeader('authorization', `Token ${token}`);

const articlewithEmptyTagsArray = {
  ...newArticleData,
  tagList: [],
};

const response2 = await articleApi.createArticle(articlewithEmptyTagsArray);


await articleApi.assertSuccessResponseCode(response2);
await articleApi.assertTitleHasCorrectValue(response2, articlewithEmptyTagsArray.title);
await articleApi.assertDescriptionHasCorrectValue(response2, articlewithEmptyTagsArray.description);
await articleApi.assertBodyHasCorrectValue(response2, articlewithEmptyTagsArray.body);
await articleApi.assertTagListHasCorrectValue(response2, articlewithEmptyTagsArray.tagList);


})