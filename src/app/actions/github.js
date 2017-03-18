const BASE_URL = 'https://api.github.com';

export const GITHUB_GET_REPOS_BY_USERNAME_REQUEST = 'GITHUB_GET_REPOS_BY_USERNAME_REQUEST';
export const GITHUB_GET_REPOS_BY_USERNAME_SUCCESS = 'GITHUB_GET_REPOS_BY_USERNAME_SUCCESS';
export const GITHUB_GET_REPOS_BY_USERNAME_FAILURE = 'GITHUB_GET_REPOS_BY_USERNAME_FAILURE';

export function getReposByUsername(username, { type = 'owner', sort = 'full_name', direction } = {}) {
  const params = { type, sort, direction };

  return {
    types: [GITHUB_GET_REPOS_BY_USERNAME_REQUEST, GITHUB_GET_REPOS_BY_USERNAME_SUCCESS, GITHUB_GET_REPOS_BY_USERNAME_FAILURE],
    endpoint: {
      url: `${BASE_URL}/users/${username}/repos`,
      query: params,
    },
    username,
    params,
  };
}
