import React, { PropTypes } from 'react';
import cx from 'classnames';


const FontAwesome = ({ className }) => (
  <i className={cx('fa', className)} />
);

FontAwesome.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default FontAwesome;
