// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import Breakout from 'app/components/Breakout';
import ClickthroughMaps from 'app/components/ClickthroughMaps';
import cargillPng from 'app/assets/images/maps/cargill4.png';
import styles from './styles.styl';


const TITLE = 'Home';
const DESCRIPTION = [
  'South of 45 - A Visual Essay.',
].join(' ');

const HomeView = () => (
  <SpecialLayout className={styles.root}>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={makeTitle(TITLE)} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={config.twitter.handle} />
      <meta name="twitter:title" content={makeTitle(TITLE)} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Helmet>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column}>
        <h1>Introduction</h1>
        <p>
          On this website we will show you analysis to answer questions
          {' '}
          about quality of life in Dunedin regarding housing
        </p>
        <ClickthroughMaps maps={{
          cargill: cargillPng,
        }} />
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column}>
        <h1>Question 1</h1>
        <h1>Analysis</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate ex sed luctus porta.
          {' '}
          Etiam vitae pharetra dui. Maecenas consectetur, lorem vitae luctus finibus, massa neque rhoncus enim,
          {' '}
          quis bibendum eros metus et elit. Donec in mauris sed mi semper blandit nec congue urna. Cras blandit consequat turpis,
        </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column}>
        <h1>Question 2</h1>
        <h1>Analysis</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate ex sed luctus porta.
          {' '}
          Etiam vitae pharetra dui. Maecenas consectetur, lorem vitae luctus finibus, massa neque rhoncus enim,
          {' '}
          quis bibendum eros metus et elit. Donec in mauris sed mi semper blandit nec congue urna. Cras blandit consequat turpis,
        </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column}>
        <h1>Question 3</h1>
        <h1>Analysis</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate ex sed luctus porta.
          {' '}
          Etiam vitae pharetra dui. Maecenas consectetur, lorem vitae luctus finibus, massa neque rhoncus enim,
          {' '}
          quis bibendum eros metus et elit. Donec in mauris sed mi semper blandit nec congue urna. Cras blandit consequat turpis,
        </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column}>
        <h1>Question 4</h1>
        <h1>Analysis</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate ex sed luctus porta.
          {' '}
          Etiam vitae pharetra dui. Maecenas consectetur, lorem vitae luctus finibus, massa neque rhoncus enim,
          {' '}
          quis bibendum eros metus et elit. Donec in mauris sed mi semper blandit nec congue urna. Cras blandit consequat turpis,
        </p>
      </article>
    </Breakout>
  </SpecialLayout>
);

export default HomeView;
