import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

const tagsNumberList = [0, 1, 5];

test.describe('Positive create Article scenarios', () => {
  for (const tagCount of tagsNumberList) {
    test(`Create article with ${tagCount} tags`, async ({
      articlesApi,
      logger,
      registeredUser,
    }) => {
      const newArticle = generateNewArticleData(logger, tagCount);
      const response = await articlesApi.createArticle(
        newArticle,
        registeredUser.token,
      );

      await articlesApi.assertSuccessResponseCode(response);

      await articlesApi.parseSlug(response);
      await articlesApi.assertTitleCorrect(response, newArticle.title);
      await articlesApi.assertDescriptionCorrect(
        response,
        newArticle.description,
      );
      await articlesApi.assertBodyCorrect(response, newArticle.body);
      await articlesApi.assertTagListCorrect(response, newArticle.tagList);
      await articlesApi.assertAuthorCorrect(response, registeredUser.username);
    });
  }
});
