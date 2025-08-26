import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 1})

test(
  'Read existing article by unauthorized user',
  async ({ newArticle,  userRequestWithoutToken, userRequests}) => {
    const articleApi1 = new ArticleApi(userRequests[0]);
    const articleApi2 = new ArticleApi(userRequestWithoutToken);

    const responseOfCreateArticle = await articleApi1.createArticle(newArticle);
    await articleApi2.assertSuccessResponseCode(responseOfCreateArticle);

    const slugName = await articleApi1.getArticleSlug(responseOfCreateArticle)
    const responseOfReadArticle = await articleApi2.readArticle(slugName);

    await articleApi2.assertSuccessResponseCode(responseOfReadArticle);

    await articleApi2.assertArticleHasFieldValue(
        responseOfCreateArticle,
        'title',
        newArticle.title,
    );
    await articleApi2.assertArticleHasFieldValue(
        responseOfCreateArticle,
        'description',
        newArticle.description,
    );
    await articleApi2.assertArticleHasFieldValue(
        responseOfCreateArticle,
        'body',
        newArticle.body,
    );
    await articleApi2.assertArticleHasFieldValue(
        responseOfCreateArticle,
        'tagList',
        newArticle.tagList,
    );
});
