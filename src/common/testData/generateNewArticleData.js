import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger, tagNumber = 0) {
  const tagList = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(4),
    body: faker.lorem.sentences(2),
    tagList,
  };

  logger.debug(`Generated new article data: ${JSON.stringify(article)}`);

  return article;
}
