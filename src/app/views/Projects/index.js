import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
import Breakout from 'app/components/Breakout';
import Slider from 'app/components/Slider';
import SlidingStages from 'app/components/SlidingStages';
import developerProfileImg from 'app/assets/images/developer-profile.jpg';
import websiteImg from 'app/assets/images/portfolio/website.png';
import utsHelpsLoginImg from 'app/assets/images/portfolio/uts-helps-login.png';
import utsHelpsSessionImg from 'app/assets/images/portfolio/uts-helps-session.png';
import stickiesLoginImg from 'app/assets/images/portfolio/stickies-login.png';
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
    })).isRequired,
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
        <SlidingStages>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nunc nibh. Nullam bibendum augue vel maximus porta. In sodales cursus mi, sed posuere ex ullamcorper feugiat. Vestibulum malesuada eu augue id bibendum. Nam blandit at dolor laoreet porta. Aliquam fringilla risus enim, sit amet volutpat risus consequat a. Duis vel justo ut turpis bibendum mattis non placerat nisi. Sed enim elit, venenatis blandit commodo ac, dapibus quis felis. Donec sit amet tristique metus, sit amet sodales orci. Sed varius augue in lacus mollis, gravida tincidunt velit mattis. Nulla consequat auctor porttitor. Suspendisse potenti. Vestibulum commodo vulputate purus, et consectetur ex malesuada in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
          <div>
            <p>
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum lorem mi, rutrum nec venenatis a, gravida id turpis. Morbi sollicitudin efficitur ipsum semper accumsan. Curabitur varius neque sed suscipit posuere. Nullam sed elit at risus hendrerit tincidunt nec ut ex. Donec eget ante tincidunt diam consectetur cursus. Donec elementum risus nisi, non porta leo vehicula eget. Pellentesque efficitur faucibus condimentum. Nullam et dignissim nulla. Praesent eget orci orci. Etiam suscipit pulvinar lectus, vitae vestibulum massa dignissim a.
            </p>
          </div>
          <div>
            <p>
              Morbi aliquam finibus velit, sed porta est suscipit a. Nam sit amet commodo ex. Donec mollis varius rutrum. Fusce quis nibh at leo dictum posuere et in erat. Morbi ac mi pharetra, sollicitudin est eget, lobortis nibh. Curabitur lacinia mattis magna. Nulla eu diam rutrum, mollis leo non, porta lorem. Donec semper, quam quis bibendum laoreet, arcu enim maximus lorem, a elementum purus diam nec est. Duis accumsan dolor odio, in congue leo viverra non. Maecenas egestas auctor est, quis pulvinar libero facilisis sed. Maecenas eget malesuada mauris, commodo rhoncus orci. Donec suscipit vehicula felis, vitae aliquet purus.
            </p>
          </div>
        </SlidingStages>
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
        <ul className={styles.repos}>
          {repos.map(repo => (
            <li key={repo.id} className={styles.repo}>
              <GitHubRepo key={repo.id} repo={repo} />
            </li>
          ))}
        </ul>
        <h2 className={styles.subheading}>Snapshot Portfolio</h2>
        <Breakout>
          <Slider autoplay>
            <img className={styles.slide} src={websiteImg} alt="This website" />
            <img className={styles.slide} src={utsHelpsLoginImg} alt="UTS: HELPS Booking System - Login" />
            <img className={styles.slide} src={utsHelpsSessionImg} alt="UTS: HELPS Booking System - Session Information" />
            <img className={styles.slide} src={stickiesLoginImg} alt="Stickies - Login" />
          </Slider>
        </Breakout>
        <p className={styles.text}>
          The above slider is a <abbr title="Work In Progress">WIP</abbr> that has been created for use in a University assignment.
          {' '}
          Its design is not yet complete, and will be improved for the purposes of this site at a later date.
          {' '}
          The images feature a number of different responsive design website projects that I have worked on,
          {' '}
          including a number of University projects.
        </p>
      </DefaultLayout>
    );
  }
}
