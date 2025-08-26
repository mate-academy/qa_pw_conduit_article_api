import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import {ArticleApi} from '../../../src/api/endpoints/ArticlesAPI';
import { test } from '../../_fixtures/fixtures';

test.use({usersNumber: 2})

test(
  'Read article created by user1 as authorized user2',
  async ({ newArticle,  userRequests}) => {
    const articleApi1 = new ArticleApi(userRequests[0]);
    const articleApi2 = new ArticleApi(userRequests[1]);

    const responseOfCreateArticle = await articleApi1.createArticle(newArticle);
    await articleApi2.assertSuccessResponseCode(responseOfCreateArticle);

    const slugName = await articleApi1.getArticleSlug(responseOfCreateArticle)
    const responseOfReadArticle = await articleApi2.readArticle(slugName);

    await articleApi2.assertSuccessResponseCode(responseOfReadArticle);
    await articleApi2.assertArticleHasFieldValue(
        responseOfReadArticle,
        'title',
        newArticle.title,
    );
    await articleApi2.assertArticleHasFieldValue(
      responseOfReadArticle,
        'description',
        newArticle.description,
    );
    await articleApi2.assertArticleHasFieldValue(
        responseOfReadArticle,
        'body',
        newArticle.body,
    );
    await articleApi2.assertArticleHasFieldValue(
        responseOfReadArticle,
        'tagList',
        newArticle.tagList,
    );
});
