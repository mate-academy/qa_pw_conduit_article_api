import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  registeredUsers,
  userRequests,
  logger,
}) => {
  const articleData = generateNewArticleData(logger, 2);
  const article = {
    title: articleData.title,
    description: articleData.description,
    body: articleData.text,
    tagList: articleData.tags,
  };
  const user1Api = new ArticlesApi(userRequests[0]);
  const createdArticle = await user1Api.createArticle(article);

  await user1Api.assertSuccessResponseCode(createdArticle);
  const slug = await user1Api.parseSlugFromBody(createdArticle);

  const user2Api = new ArticlesApi(userRequests[1]);
  const response = await user2Api.getArticle(slug);

  await user2Api.assertSuccessResponseCode(response);
  await user2Api.assertTitleHasCorrectValue(response, article.title);
  await user2Api.assertDescriptionHasCorrectValue(
    response,
    article.description,
  );
  await user2Api.assertBodyHasCorrectValue(response, article.body);
  await user2Api.assertTagListHasCorrectValue(response, article.tagList);
  await user2Api.assertAuthorUsernameHasCorrectValue(
    response,
    registeredUsers[0].username,
  );
});
