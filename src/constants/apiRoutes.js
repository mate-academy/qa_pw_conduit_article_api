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
  articles:{
    index: `${ROOT}/articles`,
    feed: `${ROOT}/articles/feed`,
    slug: slug => `${ROOT}/articles/${slug}`,
    favorite: slug => `${ROOT}/articles/${slug}/favorite`,
  }
};
