// @ flow

import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import styles from './styles.styl';


const TITLE = 'GovHack';
const DESCRIPTION = [
  'Experiences and Projects of GovHack 2016 and 2017.',
  'See GitHub projects, YouTube videos and more.',
].join('\n');

const GovHackView = () => (
  <DefaultLayout className={styles.root}>
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
    <h1><a href="https://www.govhack.org/" target="_blank" rel="noopener noreferrer">GovHack</a></h1>
    <h2><a href="https://www.twitter.com/GovHackNZ" target="_blank" rel="noopener noreferrer">GovHackNZ</a> 2017</h2>
    <p>
      As part of my time abroad in New Zealand, I am participating in
      {' '}
      <a href="https://www.twitter.com/GovHackNZ" target="_blank" rel="noopener noreferrer">GovHackNZ</a>
      {' '}
      2017.
    </p>
    <h2><a href="https://www.twitter.com/GovHackSydney" target="_blank" rel="noopener noreferrer">GovHackSydney</a> 2016</h2>
    <p>
      As part of GovHack 2016, our team submitted a
      {' '}
      <a href="https://youtu.be/3ne1Qaaas3g" target="_blank" rel="noopener noreferrer">video pitch</a>.
    </p>
  </DefaultLayout>
);

export default GovHackView;
