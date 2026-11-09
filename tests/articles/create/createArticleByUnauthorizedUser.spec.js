import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({ articlesApi, logger }) => {
  const articleData = generateNewArticleData(logger, 2);

  const response = await articlesApi.createArticle({
    title: articleData.title,
    description: articleData.description,
    body: articleData.text,
    tagList: articleData.tags,
  });

  await articlesApi.assertUnauthorizedResponseCode(response);
});
