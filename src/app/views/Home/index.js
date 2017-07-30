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
          On this website we will show you analysis to answer various questions
          {' '}
          including quality of life, transport, safety, and housing
        </p>
        <ClickthroughMaps
          maps={{
            cargill: cargillPng,
          }}
        />
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column} id="Heating">
        <h1>How affordable is heating for different parts of Dunedin?</h1>
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
      <article className={styles.column} id="Safety">
        <h1>How safe do people feel in Dunedin compared to the crime rate?</h1>
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
      <article className={styles.column} id="Transport">
        <h1>How accessible is public transport in different parts of Dunedin?</h1>
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
      <article className={styles.column} id="Quality">
        <h1>How does quality of life vary throughout Dunedin?</h1>
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
      <section className={styles.column} id="Data">
        <h1>Data sources</h1>
        <ul>
          <li>
            <a
              href="http://www.stats.govt.nz/browse_for_stats/Maps_and_geography/Geographic-areas/geographic-area-files.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Statistics New Zealand, Census map data
            </a>
          </li>
          <li>
            <a
              href="http://www.stats.govt.nz/Census/2013-census/data-tables/meshblock-dataset.aspx"
              target="_blank" rel="noopener noreferrer"
            >
              Statistics New Zealand, Census responses
            </a>
          </li>
          <li>
            <a
              href="https://github.com/kamal-hothi/nz_burglary_data"
              target="_blank" rel="noopener noreferrer"
            >
              Burglary data from New Zealand Police
            </a>
          </li>
          <li>
            <a
              href=" http://www.mbie.govt.nz/info-services/sectors-industries/energy/energy-data-modelling/statistics/prices/electricity-prices"
              target="_blank" rel="noopener noreferrer"
            >
              Quarterly Survey of Domestic Electricity Prices to 15 May 2017 [XLSX 256KB]
              {' '}
              from Ministry of Business, Innovation, and Enterprise
            </a>
          </li>
          <li>
            <a
              href="http://www.otago.ac.nz/wellington/departments/publichealth/research/hirp/otago020194.html"
              target="_blank" rel="noopener noreferrer"
            >
              Otago University, New Zealand Deprivation Index
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Phil-Wheeler/govhack-dunedin/tree/master/data"
              target="_blank" rel="noopener noreferrer"
            >
              Dunedin City Council, Quality of Life Survey Result
            </a>
          </li>
        </ul>
      </section>
    </Breakout>
  </SpecialLayout>
);

export default HomeView;
