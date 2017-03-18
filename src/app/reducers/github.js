import { get } from 'lodash-es';

import config from 'app/config';
import {
  GITHUB_GET_REPOS_BY_USERNAME_REQUEST,
  GITHUB_GET_REPOS_BY_USERNAME_SUCCESS,
  GITHUB_GET_REPOS_BY_USERNAME_FAILURE,
} from 'app/actions/github';

// Note: this is being included to reduce the amount of data stored
// This should probably be moved out of here
function repoTransformer({ id, name, fork, pushed_at, html_url, description, language, stargazers_count }) {
  return { id, name, fork, pushed_at, html_url, description, language, stargazers_count };
}

const initialState = {
  reposByUsername: {},
};

export default function githubReducer(state = initialState, action) {
  switch (action.type) {
    case GITHUB_GET_REPOS_BY_USERNAME_REQUEST:
      return {
        ...state,
        reposByUsername: {
          ...state.reposByUsername,
          [action.username]: {
            ...state.reposByUsername[action.username],
            [action.params.type]: {
              ...get(state.reposByUsername[action.username], [action.params.type]),
              loading: true,
              value: null,
              error: null,
            },
          },
        },
      };

    case GITHUB_GET_REPOS_BY_USERNAME_SUCCESS:
      return {
        ...state,
        reposByUsername: {
          ...state.reposByUsername,
          [action.username]: {
            ...state.reposByUsername[action.username],
            [action.params.type]: {
              ...get(state.reposByUsername[action.username], [action.params.type]),
              loading: false,
              loaded: true,
              value: action.response.filter(({ id }) => !config.github.excludedRepos.includes(id)).map(repoTransformer),
              error: null,
            },
          },
        },
      };

    case GITHUB_GET_REPOS_BY_USERNAME_FAILURE:
      return {
        ...state,
        reposByUsername: {
          ...state.reposByUsername,
          [action.username]: {
            ...state.reposByUsername[action.username],
            [action.params.type]: {
              ...get(state.reposByUsername[action.username], [action.params.type]),
              loading: false,
              error: action.error,
            },
          },
        },
      };

    default:
      return state;
  }
}
