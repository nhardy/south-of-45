// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import Breakout from 'app/components/Breakout';
import ClickthroughMaps from 'app/components/ClickthroughMaps';
import cargillBurglariesPng from 'app/assets/images/maps/cargill-burglaries.png';
import cargillHeatingPng from 'app/assets/images/maps/cargill-heating.png';
import cargillDeprivationPng from 'app/assets/images/maps/cargill-deprivation.png';
import cargillTransportPng from 'app/assets/images/maps/cargill-transport.png';
import eastcoastBurglariesPng from 'app/assets/images/maps/eastcoast-burglaries.png';
import eastcoastHeatingPng from 'app/assets/images/maps/eastcoast-heating.png';
import eastcoastDeprivationPng from 'app/assets/images/maps/eastcoast-deprivation.png';
import eastcoastTransportPng from 'app/assets/images/maps/eastcoast-transport.png';
import hillsBurglariesPng from 'app/assets/images/maps/hills-burglaries.png';
import hillsHeatingPng from 'app/assets/images/maps/hills-heating.png';
import hillsDeprivationPng from 'app/assets/images/maps/hills-deprivation.png';
import hillsTransportPng from 'app/assets/images/maps/hills-transport.png';
import mosgieltaieriBurglariesPng from 'app/assets/images/maps/mosgieltaieri-burglaries.png';
import mosgieltaieriHeatingPng from 'app/assets/images/maps/mosgieltaieri-heating.png';
import mosgieltaieriDeprivationPng from 'app/assets/images/maps/mosgieltaieri-deprivation.png';
import mosgieltaieriTransportPng from 'app/assets/images/maps/mosgieltaieri-transport.png';
import saddlehillBurglariesPng from 'app/assets/images/maps/saddlehill-burglaries.png';
import saddlehillHeatingPng from 'app/assets/images/maps/saddlehill-heating.png';
import saddlehillDeprivationPng from 'app/assets/images/maps/saddlehill-deprivation.png';
import saddlehillTransportPng from 'app/assets/images/maps/saddlehill-transport.png';
import southdunedinBurglariesPng from 'app/assets/images/maps/southdunedin-burglaries.png';
import southdunedinHeatingPng from 'app/assets/images/maps/southdunedin-heating.png';
import southdunedinDeprivationPng from 'app/assets/images/maps/southdunedin-deprivation.png';
import southdunedinTransportPng from 'app/assets/images/maps/southdunedin-transport.png';
import burglariesPng from 'app/assets/images/graphs/burglaries.png';
import heatingPng from 'app/assets/images/graphs/heating.png';
import deprivationPng from 'app/assets/images/graphs/deprivation.png';
import transportPng from 'app/assets/images/graphs/transport.png';
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
          including council influence, transport, safety, and housing
          {' '}
          These graphs and data provide insight that the council can use
           {' '}
          to address a number of different issues that face Dunedin.
        </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column} id="Heating">
        <div className={styles.content}>
          <div className={styles.left}>
            <ClickthroughMaps
              maps={{
                cargill: cargillHeatingPng,
                saddle: saddlehillHeatingPng,
                mostaieri: mosgieltaieriHeatingPng,
                waikpen: eastcoastHeatingPng,
                southd: southdunedinHeatingPng,
                hills: hillsHeatingPng,
              }}
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.question}>How affordable is heating for different parts of Dunedin?</h1>
            <img className={styles.graph} src={heatingPng} alt="Graph" />
          </div>
        </div>
        <br></br>
        <h1>Analysis</h1>
        <p>
          This graph means that for most suburbs, their ability to pay for heating
          {' '}
           is tied to their household income. <br></br>This graph shows that there are a significant
          {' '}
          number of households that struggle to heat their homes leading to negative health consequences.
          The hills region is an anomaly, because it reports large numbers of people unable to heat their
          home despite good household median income. This may reflect differences in the physical constuctions of
          houses in this part of Dunedin.
        </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column} id="Safety">
        <div className={styles.content}>
          <div className={styles.left}>
            <ClickthroughMaps
              maps={{
                cargill: cargillBurglariesPng,
                saddle: saddlehillBurglariesPng,
                mostaieri: mosgieltaieriBurglariesPng,
                waikpen: eastcoastBurglariesPng,
                southd: southdunedinBurglariesPng,
                hills: hillsBurglariesPng,
              }}
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.question}>How safe do people feel in Dunedin compared to the number of burglaries?</h1>
            <img className={styles.graph} src={burglariesPng} alt="Graph" />
          </div>
        </div>
        <h1>Analysis</h1>
        <p>
         There are two "Dunedins." Well off areas with low levels of burglaries whose citizens feel safe,
         and poorer areas have high levels of burglaries whose citizens feel less safe.
          </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column} id="Transport">
        <div className={styles.content}>
          <div className={styles.left}>
            <ClickthroughMaps
              maps={{
                cargill: cargillTransportPng,
                saddle: saddlehillTransportPng,
                mostaieri: mosgieltaieriTransportPng,
                waikpen: eastcoastTransportPng,
                southd: southdunedinTransportPng,
                hills: hillsTransportPng,
              }}
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.question}>How accessible is public transport in different parts of Dunedin?</h1>
            <img className={styles.graph} src={transportPng} alt="Graph" />
          </div>
        </div>
        <h1>Analysis</h1>
        <p>
         Public transport within urban Dunedin is more accessible than rural Dunedin. However, it is viewed as being
         less accessible in poorer areas that can less afford cars.
         This may be due to the increasing dependency on public transport in poorer areas.
          </p>
      </article>
    </Breakout>
    <Breakout outerClassName={styles.sectionOuter} innerClassName={styles.sectionInner}>
      <article className={styles.column} id="Quality">
        <div className={styles.content}>
          <div className={styles.left}>
            <ClickthroughMaps
              maps={{
                cargill: cargillDeprivationPng,
                saddle: saddlehillDeprivationPng,
                mostaieri: mosgieltaieriDeprivationPng,
                waikpen: eastcoastDeprivationPng,
                southd: southdunedinDeprivationPng,
                hills: hillsDeprivationPng,
              }}
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.question}>How much influence do citizens feel they have over council
            according to the deprevation index?</h1>
            <img className={styles.graph} src={deprivationPng} alt="Graph" />
          </div>
        </div>
        <h1>Analysis</h1>
        <p>
          There is a primary effect that shows that the closer you live to the University, the more influence citizens
          {' '}
          feel they have on council. We can see that the more rural areas feel that they
          {' '}
          have little influence compared to more urban areas.
        </p>
        <p>
          There is a secondary effect that as deprivation increases, the level of influence citizens feel they have
          {' '}
          on council decisions decreases.
        </p>
        <p>
          The Saddle Hill region is anomalous in this dataset because it feels it has much less influence than its demographics
          {' '}
          or distance expects.
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
          <li>
            <a
              href="https://cliflo.niwa.co.nz"
              target="_blank" rel="noopener noreferrer"
            >
            NIWA Climate Database
            </a>
          </li>
        </ul>
      </section>
    </Breakout>
  </SpecialLayout>
);

export default HomeView;
