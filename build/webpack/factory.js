import fs from 'fs';
import path from 'path';

import { identity, noop } from 'lodash-es';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
import nodeExternals from 'webpack-node-externals';
import {
  BannerPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  NamedModulesPlugin,
  NoErrorsPlugin,
  optimize,
  ProvidePlugin,
} from 'webpack';

import WriteManifestPlugin from './plugins/WriteManifestPlugin';


const babelrc = (() => {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '.babelrc')));
  return {
    ...raw,
    babelrc: false,
    presets: [
      ['es2015', { modules: false }],
      ...raw.presets.filter(name => !name.includes('es2015')),
    ],
  };
})();

const stylusLoader = ({ production, client }) => {
  const query = {
    importLoaders: 2,
    modules: true,
    localIdentName: '[path][name]--[local]--[hash:base64:5]',
  };
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        loader: combineLoaders([
          {
            loader: 'css-loader',
            query,
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ]),
      }) : combineLoaders([
        { loader: 'style-loader', query: { singleton: true } },
        { loader: 'css-loader', query },
        { loader: 'postcss-loader' },
        { loader: 'stylus-loader' },
      ]);
  }
  return combineLoaders([
    {
      loader: 'css-loader/locals',
      query,
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'stylus-loader',
    },
  ]);
};

const cssLoader = ({ production, client }) => {
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        loader: 'css-loader',
      }) : combineLoaders([{ loader: 'style-loader', query: { singleton: true } }, { loader: 'css-loader' }]);
  }
  return 'css-loader/locals';
};

export default function webpackFactory({ production = false, client = false, writeManifestCallback = noop }) {
  return {
    stats: {
      children: false,
    },

    entry: client ? {
      bundle: [
        !production && 'webpack-dev-server/client?/',
        !production && 'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'src', 'client', 'index.js'),
      ].filter(identity),
    } : {
      server: [
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'src', 'server', 'index.js'),
      ],
    },

    output: {
      filename: client
        ? '[name]-[hash:6].js'
        : '[name].js',
      path: path.resolve(__dirname, '..', '..', 'dist'),
      publicPath: '/dist/',
    },

    target: client ? 'web' : 'node',

    externals: [!client && nodeExternals({
      whitelist: [/\.css$/, /lodash-es/],
    })].filter(identity),

    devtool: !production || !client
      ? 'cheap-module-inline-source-map'
      : 'hidden-source-map',

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            !production && {
              loader: 'react-hot-loader/webpack',
            },
            {
              loader: 'babel-loader',
              query: babelrc,
            },
          ].filter(identity),
        },
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, '..', '..', 'node_modules', 'lodash-es'),
          ],
          loader: 'babel-loader',
          query: {
            presets: [['es2015', {}]],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.styl$/,
          loader: stylusLoader({ production, client }),
        },
        {
          test: /\.css$/,
          loader: cssLoader({ production, client }),
        },
        {
          test: /\.(?:jpe?g|png|svg|woff2?|eot|ttf)(?:\?.*$|$)/,
          loader: 'url-loader',
          query: {
            limit: 5120,
            name: '[name]-[hash:6].[ext]',
          },
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        __CLIENT__: client,
        __DEVELOPMENT__: !production,
        __SERVER__: !client,
        'process.env.NODE_ENV': production ? JSON.stringify('production') : JSON.stringify('development'),
      }),
      new ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
      new NoErrorsPlugin(),
      !production && new HotModuleReplacementPlugin(),
      new LoaderOptionsPlugin({
        test: /\.(?:styl|css)$/,
        options: {
          context: __dirname,
          postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
        },
      }),
      !production && new NamedModulesPlugin(),
      client && production && new ExtractTextPlugin({
        filename: '[name]-[contenthash:6].css',
        allChunks: true,
      }),
      !client && !production && new BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      client && production && new optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      client && new WriteManifestPlugin({ client, callback: writeManifestCallback }),
    ].filter(identity),

    resolve: {
      extensions: ['.json', '.js', '.styl'],
      modules: [
        'src',
        'node_modules',
      ],
    },
  };
}
