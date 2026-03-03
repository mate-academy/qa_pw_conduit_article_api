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
  articles: slug => ({
    index: `${ROOT}/articles`,
    create: `${ROOT}/articles`,
    bySlug: `${ROOT}/articles/${slug}`,
    update: `${ROOT}/articles/${slug}`,
    delete: `${ROOT}/articles/${slug}`,
    comments: `${ROOT}/articles/${slug}/comments`,
  }),
};
