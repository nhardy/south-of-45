// @flow

/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import GeoMap from 'app/components/GeoMap';
import dunedinGeoJson from 'app/assets/data/dunedin.geojson';
import styles from './styles.styl';


type Props = {
  maps: {
    [region: string]: string,
  },
};

type State = {
  isOverlayHidden: boolean,
  overlaySrc: ?string,
};

export default class ClickthroughMap extends Component<void, Props, State> {
  state = {
    isOverlayHidden: true,
    overlaySrc: null,
  };

  onSelectRegion = (region: string) => {
    this.setState({
      isOverlayHidden: false,
      overlaySrc: this.props.maps[region],
    });
  };

  onCloseOverlay = () => {
    this.setState({
      isOverlayHidden: true,
      overlaySrc: null,
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={cx(styles.main, { [styles.background]: !this.state.isOverlayHidden })}>
          <GeoMap data={dunedinGeoJson} onClickRegion={this.onSelectRegion} />
        </div>
        <div className={cx(styles.overlay, { [styles.hidden]: this.state.isOverlayHidden })}>
          <div className={styles.inner}>
            <button className={styles.close} onClick={this.onCloseOverlay}>
              <FontAwesome className="fa-close" />
            </button>
            <div className={styles.wrapper}>
              <img className={styles.image} src={this.state.overlaySrc} alt="Map" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
