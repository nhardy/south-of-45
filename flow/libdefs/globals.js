// @flow

import type { StubsType } from '../../test/flowTypes';

declare var __DEVELOPMENT__: boolean;
declare var __SERVER__: boolean;
declare var __CLIENT__: boolean;

declare function proxyquire<T>(path: string, stubs?: StubsType): T;
