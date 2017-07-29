import React, { Component } from 'react';
import geojson2svg from 'geojson2svg';

import data from './geojson';


/* eslint-disable react/no-array-index-key */

const converter = geojson2svg({
  viewportSize: { width: 640, height: 480 },
  mapExtent: {
    left: 1346000,
    right: 1425420,
    bottom: 4896560,
    top: 4987950,
  },
  output: 'path',
});

type Props = {};
type DefaultProps = {};
type State = {};

export default class GeoMap extends Component<Props, DefaultProps, State> {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <svg viewBox="0 0 640 480">
          {data.features.map((feature, index) => (
            <path key={index} d={converter.convert(feature.geometry)} strokeWidth="1" fill="#f8b617" stroke="#fff" />
          ))}
        </svg>
      </div>
    );
  }
}
