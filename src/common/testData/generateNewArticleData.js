import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger, tagNumber = 0) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(4),
    body: faker.lorem.sentences(2),
    tagList: tags.length > 0 ? tags : [],
  };

  logger.debug(`Generated new article data: ${JSON.stringify(article)}`);

  return article;
}
