// @flow

import React from 'react';
import cx from 'classnames';


const FontAwesome = ({ className }: { className: string }) => (
  <i className={cx('fa', className)} />
);

export default FontAwesome;
