export const ROOT = 'api';

export const ROUTES = {
  articles: {
    create: `${ROOT}/articles`,
    slug: slug => `${ROOT}/articles/${slug}`,
  },
  user: `${ROOT}/user`,
  users: {
    index: `${ROOT}/users`,
    login: `${ROOT}/users/login`,
  },
  profiles: username => ({
    index: `${ROOT}/profiles/${username}`,
    follow: `${ROOT}/profiles/${username}/follow`,
  }),
};
