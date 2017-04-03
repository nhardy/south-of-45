// @flow
const BASE_URL = 'https://api.github.com';

export const GITHUB_GET_REPOS_BY_USERNAME_REQUEST = 'GITHUB_GET_REPOS_BY_USERNAME_REQUEST';
export const GITHUB_GET_REPOS_BY_USERNAME_SUCCESS = 'GITHUB_GET_REPOS_BY_USERNAME_SUCCESS';
export const GITHUB_GET_REPOS_BY_USERNAME_FAILURE = 'GITHUB_GET_REPOS_BY_USERNAME_FAILURE';

type ReposByUserNameParams = {
  type?: 'all' | 'owner' | 'member',
  sort?: 'created' | 'updated' | 'pushed' | 'full_name',
  direction?: 'asc' | 'desc',
};

export function getReposByUsername(username: string, { type = 'owner', sort = 'full_name', direction }: ReposByUserNameParams = {}) {
  const params = { type, sort, direction };

  return {
    types: [GITHUB_GET_REPOS_BY_USERNAME_REQUEST, GITHUB_GET_REPOS_BY_USERNAME_SUCCESS, GITHUB_GET_REPOS_BY_USERNAME_FAILURE],
    endpoint: {
      url: `${BASE_URL}/users/${username}/repos`,
      query: params,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    },
    username,
    params,
  };
}
