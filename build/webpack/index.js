import nodemon from 'nodemon';
import webpack from 'webpack';
import httpolyglot from 'httpolyglot';
import pq from 'proxyquire';

import config from '../../config';
import webpackFactory from './factory';


pq.noCallThru();
const WebpackDevServer = pq('webpack-dev-server', {
  spdy: httpolyglot, // Swap out 'spdy' with 'httpolyglot' for HTTP/HTTPS on same PORT
});

export function webpackProd() {
  return new Promise((resolve) => {
    webpack([
      webpackFactory({ production: true, client: false }),
      webpackFactory({ production: true, client: true }),
    ], (error, stats) => {
      if (error) throw error;

      console.log('[webpack-prod]', stats.toString({
        colors: true,
        chunkModules: false,
      }));

      resolve();
    });
  });
}

export function webpackClientDev() {
  return new Promise((resolve) => {
    let running = false;

    const webpackConfig = webpackFactory({
      production: false,
      client: true,
      writeManifestCallback: () => {
        if (!running) {
          running = true;
          resolve();
        }
      },
    });

    const server = new WebpackDevServer(webpack(webpackConfig), {
      contentBase: '/',
      hot: true,
      historyApiFallback: true,
      proxy: {
        '**': `http://localhost:${config.port + 1}/`,
      },
      disableHostCheck: true,
      staticOptions: {},
      quiet: false,
      noInfo: false,
      lazy: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true,
      },
      https: true,
      publicPath: '/static/',
      stats: {
        colors: true,
        chunkModules: false,
      },
    });

    server.listen(config.port, '0.0.0.0', (error) => {
      if (error) throw error;
      console.log('[webpack-dev-server]', 'Webpack Dev Server is now up');
    });
  });
}

export function webpackServerDev() {
  return new Promise((resolve) => {
    let running = false;

    const compiler = webpack(
      webpackFactory({ production: false, client: false }),
    );

    compiler.watch({
      aggregateTimeout: 300,
      poll: true,
    }, (error, stats) => {
      if (error) throw error;

      console.log('[webpack-client-dev]', stats.toString({
        colors: true,
        chunkModules: false,
      }));

      nodemon.restart();

      if (!running) {
        running = true;
        resolve();
      }
    });
  });
}
