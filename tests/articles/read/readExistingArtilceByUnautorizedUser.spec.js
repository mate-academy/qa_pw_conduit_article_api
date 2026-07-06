import { test } from '../../../tests/_fixtures/fixtures';
import { ArticleApi } from '../../../src/api/endpoints/ArticleApi';
test(`Read existing article by unauthorized user`, async ({ 
registeredUsers,
  userRequests,
  articleApi,
  newArticleData,
  usersApi,
}) => {
    // Створюємо статтю від імені авторизованого користувача
  const loginResponse = await usersApi.loginUser(registeredUsers[0]);
  await usersApi.assertSuccessResponseCode(loginResponse);
  
  const token = await usersApi.parseTokenFromBody(loginResponse);
  articleApi.setHeader('authorization', `Token ${token}`);
  
  const createResponse = await articleApi.createArticle(newArticleData);
  await articleApi.assertSuccessResponseCode(createResponse);
  
  const createdArticleBody = await articleApi.parseBody(createResponse);
  const slug = createdArticleBody.article.slug;
  
  // Читаємо статтю без токена (неавторизований користувач)
  articleApi.setHeader('authorization', '');
  
  const readResponse = await articleApi.getArticle(slug);
  await articleApi.assertSuccessResponseCode(readResponse);
});
