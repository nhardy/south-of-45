// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import { shallow } from 'enzyme';
import { identity, noop } from 'lodash-es';

import type { ReduxStore } from 'app/flowTypes';
import type { StubsType } from '../flowTypes';


export function createStubComponent(displayName: string) {
  // eslint-disable-next-line react/prefer-stateless-function
  return class StubComponent extends Component {
    props: {
      children: Element<*>,
    };

    static displayName = displayName;

    render() {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  };
}

export function stubStyles(classNames: string[]): { [className: string]: string} {
  return classNames.reduce((styles, className) => ({
    ...styles,
    [className]: `${className}-class`,
  }), {});
}

export const stubDecoratorWithArgs = () => identity;
export const stubDecorator = stubDecoratorWithArgs();

export const stubReactRedux = {
  'react-redux': {
    connect: stubDecoratorWithArgs,
  },
};

type MapStateToPropsType = (state: {}, ownProps?: {}) => any;
type ActionCreatorsType = {
  [action: string]: Function,
};
type MapDispatchToPropsType = ActionCreatorsType | (state: {}, ownProps?: {}) => ActionCreatorsType;
type ConnectDecoratorExpectationsType = (mapStateToProps: MapStateToPropsType, mapDispatchToProps: MapDispatchToPropsType) => void;

export function describeConnectDecorator(path: string, stubs: StubsType = {}, expectations: ConnectDecoratorExpectationsType) {
  let mapStateToPropsExtracted;
  let mapDispatchToPropsExtracted;

  const connectDecorator = (mapStateToProps?: ?MapStateToPropsType, mapDispatchToProps?: ?MapDispatchToPropsType) => {
    mapStateToPropsExtracted = mapStateToProps || noop;
    mapDispatchToPropsExtracted = mapDispatchToProps || {};
    return createStubComponent(path);
  };

  const StubComponent = proxyquire(path, {
    ...stubs,
    'react-redux': connectDecorator,
  });

  shallow(<StubComponent />);

  describe('[connect decorator]', () => {
    expectations(mapStateToPropsExtracted, mapDispatchToPropsExtracted);
  });
}

type AsyncProp<T> = {
  key?: string,
  promise: ({ store: ReduxStore, helpers: any }) => Promise<T>,
};
type AsyncPropsType = Array<AsyncProp<any>>;
type AsyncConnectDecoratorExpectationsType = (asyncProps: AsyncPropsType) => void;

export function describeAsyncConnectDecorator(path: string, stubs: StubsType = {}, expectations: AsyncConnectDecoratorExpectationsType) {
  let asyncPropsExtracted;

  const asyncConnectDecorator = (asyncProps: AsyncPropsType) => {
    asyncPropsExtracted = asyncProps;
  };

  const StubComponent = proxyquire(path, {
    ...stubs,
    'redux-connect': {
      asyncConnect: asyncConnectDecorator,
    },
  });

  shallow(<StubComponent />);

  describe('[asyncConnect decorator]', () => {
    expectations(asyncPropsExtracted);
  });
}
