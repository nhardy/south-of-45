import React from 'react';
import { shallow } from 'enzyme';

import FontAwesome from 'app/components/FontAwesome';


describe('FontAwesome Component', () => {
  const className = 'test-class';
  let wrapper;

  before(() => {
    wrapper = shallow(<FontAwesome className={className} />);
  });

  it('should render an <i /> tag with correct classes', () => {
    expect(wrapper).to.contain(<i className={`fa ${className}`} aria-hidden="true" />);
  });

});
