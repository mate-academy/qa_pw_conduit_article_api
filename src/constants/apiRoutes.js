export const ROOT = 'api';

export const ROUTES = {
  user: `${ROOT}/user`,
  users: {
    index: `${ROOT}/users`,
    login: `${ROOT}/users/login`,
  },
  profiles: username => ({
    index: `${ROOT}/profiles/${username}`,
    follow: `${ROOT}/profiles/${username}/follow`,
  }),
  articles: Object.assign(
    articleSlug => ({
      read: `${ROOT}/articles/${articleSlug}`,
    }),
    { index: `${ROOT}/articles` },
  ),
};
