// @flow

import path from 'path';
import { addPath } from 'app-module-path';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import pq from 'proxyquire';

import './setupJsDom';
import type { StubsType } from './flowTypes';


addPath(path.resolve(__dirname, '..', 'src'));
addPath(path.resolve(__dirname, '.'));

global.expect = chai.expect;
global.sinon = sinon;

chai.use(chaiEnzyme());

global.proxyquire = (modulePath: string, stubs: StubsType = {}) => {
  pq.noCallThru();
  return pq(modulePath, stubs);
};

global.__SERVER__ = true;
global.__CLIENT__ = false;
global.__DEVELOPMENT__ = false;

require('./setupJsDom'); // eslint-disable-line import/no-commonjs

