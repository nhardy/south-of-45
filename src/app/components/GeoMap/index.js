// @flow

/* eslint-disable react/prop-types, react/no-array-index-key */

import React, { Component } from 'react';
import geojson2svg from 'geojson2svg';
import { groupBy } from 'lodash-es';

import styles from './styles.styl';


type Props = {
  data: {},
};

type State = {};

export default class GeoMap extends Component<Props, void, State> {
  componentDidMount() {

  }

  onClick = (region: string) => {
    console.log('Region:', region, 'clicked.');
  };

  render() {
    const { data } = this.props;
    const converter = geojson2svg({
      viewportSize: {
        height: 480,
        width: 480,
      },
      mapExtent: {
        left: 1346000,
        right: 1425420,
        bottom: 4896000,
        top: 4987950,
      },
      output: 'path',
    });
    const regions = Object.entries(groupBy(data.features, 'properties.dn_ql'));

    return (
      <div className={styles.root}>
        <svg className={styles.map} viewBox="0 0 480 480">
          <defs>
            {regions.map(([region]) => (
              <filter key={region} id={`${region}-outline`}>
                <feMorphology operator="dilate" in="SourceAlpha" radius={1} />
                <feComposite in="SourceGraphic" />
              </filter>
            ))}
          </defs>
          {regions.map(([region, features]) => (
            <g key={region} className={styles.region} filter={`url(#${region}-outline)`} onClick={() => this.onClick(region)}>
              {features.map((feature, index) => (
                <path key={index} d={converter.convert(feature.geometry)} />
              ))}
            </g>
          ))}
        </svg>
      </div>
    );
  }
}
