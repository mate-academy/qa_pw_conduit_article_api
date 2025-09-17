import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { request as pwRequest } from '@playwright/test';

test('Create article by unauthorized user', async () => {
  const noAuth = await pwRequest.newContext();
  try {
    const payload = {
      article: {
        title: `Unauthorized ${Date.now()}`,
        description: 'Should be 401',
        body: 'Some body',
        tagList: ['t1', 't2'],
      },
    };

    const res = await noAuth.post('/api/articles', { data: payload });
    expect([401, 403]).toContain(res.status());
  } finally {
    await noAuth.dispose();
  }
});
