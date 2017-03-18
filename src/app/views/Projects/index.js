import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { get, orderBy } from 'lodash-es';

import config from 'app/config';
import { setRouteError } from 'app/actions/routeError';
import { getReposByUsername } from 'app/actions/github';
import DefaultLayout from 'app/layouts/Default';
import GitHubRepo from 'app/components/GitHub/Repo';

import styles from './styles.styl';


@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      const loaded = () => get(getState().github.reposByUsername, [config.github.username, 'owner', 'loaded'], false);

      if (loaded()) return;

      await dispatch(getReposByUsername(config.github.username));

      if (!loaded()) {
        dispatch(setRouteError({ status: 500 }));
        return;
      }
    },
  },
])
@connect(state => ({
  repos: orderBy(state.github.reposByUsername[config.github.username].owner.value.filter(({ fork }) => !fork), ['pushed_at'], ['desc']),
}))
export default class ProjectsView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  };

  render() {
    const { repos } = this.props;

    return (
      <DefaultLayout className={styles.root}>
        <Helmet title={`Projects | ${config.siteName}`} />
        <h1 className={styles.heading}>Projects</h1>
        <h2 className={styles.subheading}>GitHub</h2>
        <ul>
          {repos.map(repo => (
            <li key={repo.id} className={styles.repo}>
              <GitHubRepo key={repo.id} repo={repo} />
            </li>
          ))}
        </ul>
      </DefaultLayout>
    );
  }
}
