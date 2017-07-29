// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import Breakout from 'app/components/Breakout';
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
      <section className={styles.column}>
        <p>Placeholder</p>
      </section>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <section className={styles.column}>
        <p>Placeholder</p>
      </section>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <section className={styles.column}>
        <p>Placeholder</p>
      </section>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <section className={styles.column}>
        <p>Placeholder</p>
      </section>
    </Breakout>
  </SpecialLayout>
);

export default HomeView;
