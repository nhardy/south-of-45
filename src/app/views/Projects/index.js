import React, { Component, PropTypes } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { get, orderBy } from 'lodash-es';

import config from 'app/config';
import { setRouteError } from 'app/actions/routeError';
import { getReposByUsername } from 'app/actions/github';
import { makeAbsoluteUrl, makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import GitHubRepo from 'app/components/GitHub/Repo';
import developerProfileImg from 'app/assets/images/developer-profile.jpg';

import styles from './styles.styl';


const TITLE = 'Projects';
const DESCRIPTION = [
  'Projects worked on by Sydney-based student and developer, Nathan Hardy.',
  'Take a look through a list of GitHub repos and other projects.',
].join(' ');

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
        <Helmet>
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:title" content={makeTitle(TITLE)} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={makeAbsoluteUrl(developerProfileImg)} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={config.twitter.handle} />
          <meta name="twitter:title" content={makeTitle(TITLE)} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content={makeAbsoluteUrl(developerProfileImg)} />
        </Helmet>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.text}>
          I have worked as professionally as part of a team on a variety of web applications and services in use by the general public.
          {' '}
          These include the APIs and public website of
          {' '}
          <a href="https://www.9now.com.au/" target="_blank" rel="noopener noreferrer">9Now</a>,
          {' '}
          Channel 9&apos;s live streaming and video-on-demand platform, as well as the
          {' '}
          <a href="https://www.appliancesonline.com.au" target="_blank" rel="noopener noreferrer">Appliances Online website</a>.
        </p>
        <h2 className={styles.subheading}>GitHub</h2>
        <p className={styles.text}>
          Below are a list of projects that I have created and published to GitHub;
        </p>
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
