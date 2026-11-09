import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { test } from '../../_fixtures/fixtures';

const emptyFields = [
    { name: 'title', value: '' },
    { name: 'description', value: '' },
    { name: 'body', value: '' },
    { name: 'tagList', value: [] },
];

function createArticleWithEmptyField(field, logger) {
    const articleData = generateNewArticleData(logger);
    return {
        title: articleData.title,
        description: articleData.description,
        body: articleData.text,
        tagList: articleData.tags,
        [field.name]: field.value,
    };
}

async function assertResponseCode(articlesApi, response, field) {
    switch (field.name) {
        case 'tagList':
            await articlesApi.assertSuccessResponseCode(response);
            break;
        default:
            await articlesApi.assertUnprocessableEntityResponseCode(response);
            break;
    }
}

emptyFields.forEach(field => {
    test(`Create article with empty ${field.name} field`, async ({
        userRequests,
        logger,
    }) => {
        const articleDataWithEmptyField = createArticleWithEmptyField(field, logger);

        const articlesApi = new ArticlesApi(userRequests[0]);
        const response = await articlesApi.createArticle(
            articleDataWithEmptyField,
        );

        await assertResponseCode(articlesApi, response, field);
    });
});


emptyFields.forEach(field => {
    test(`Create article without ${field.name} field`, async ({
        userRequests,
        logger,
    }) => {
        const articleDataWithEmptyField = createArticleWithEmptyField(field, logger);
        delete articleDataWithEmptyField[field.name];

        const articlesApi = new ArticlesApi(userRequests[0]);
        const response = await articlesApi.createArticle(
            articleDataWithEmptyField,
        );

        await assertResponseCode(articlesApi, response, field);
    });
});