// @flow

import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.styl';

const Icon = ({ name, className, ...props }: { name: string, className?: string }) => {
  let Svg;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    Svg = require(`app/assets/images/icons/${name}.icon.svg`).default;
  } catch (e) {
    Svg = null;
  }

  return Svg && (
    <Svg className={cx(styles.root, className)} {...props} />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
