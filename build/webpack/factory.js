import fs from 'fs';
import path from 'path';

import { identity, noop } from 'lodash-es';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import {
  BannerPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
  optimize,
  ProvidePlugin,
} from 'webpack';

import packageJson from '../../package.json';
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

const postcssOptions = {
  plugins() {
    return [
      autoprefixer({ browsers: ['last 2 versions'] }),
    ];
  },
};

const stylusLoaders = ({ production, client }) => {
  const options = {
    importLoaders: 2,
    modules: true,
    localIdentName: '[path][name]--[local]--[hash:base64:5]',
  };
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options,
          },
          {
            loader: 'postcss-loader',
            options: postcssOptions,
          },
          {
            loader: 'stylus-loader',
          },
        ],
      }) : [
        {
          loader: 'style-loader',
          options: { singleton: true },
        },
        {
          loader: 'css-loader',
          options,
        },
        {
          loader: 'postcss-loader',
          options: postcssOptions,
        },
        {
          loader: 'stylus-loader',
        },
      ];
  }
  return [
    {
      loader: 'css-loader/locals',
      options,
    },
    {
      loader: 'postcss-loader',
      options: postcssOptions,
    },
    {
      loader: 'stylus-loader',
    },
  ];
};

const cssLoaders = ({ production, client }) => {
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        use: 'css-loader',
      }) : [
        {
          loader: 'style-loader',
          options: { singleton: true },
        },
        {
          loader: 'css-loader',
        },
      ];
  }
  return [
    {
      loader: 'css-loader/locals',
    },
  ];
};

export default function webpackFactory({ production = false, client = false, writeManifestCallback = noop }) {
  return {
    stats: {
      children: false,
    },

    entry: client ? {
      head: [
        path.resolve(__dirname, '..', '..', 'src', 'client', 'head.js'),
      ],
      vendor: [
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'src', 'app', 'shims', 'index.js'),
        'react',
      ],
      bundle: [
        !production && 'webpack-dev-server/client?/',
        !production && 'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
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
        ? `[name]-[${production ? 'chunkhash' : 'hash'}:6].js`
        : '[name].js',
      path: path.resolve(__dirname, '..', '..', 'dist'),
      publicPath: '/static/',
    },

    target: client ? 'web' : 'node',

    externals: [!client && nodeExternals({
      whitelist: [/\.css$/, /lodash-es/],
    })].filter(identity),

    devtool: !production || !client
      ? 'inline-source-map'
      : 'hidden-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, '..', '..', 'src'),
          ],
          use: [
            !production && {
              loader: 'react-hot-loader/webpack',
            },
            {
              loader: 'babel-loader',
              options: babelrc,
            },
          ].filter(identity),
        },
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, '..', '..', 'node_modules', 'lodash-es'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['es2015', { modules: false }]],
              },
            },
          ],
        },
        {
          test: /\.styl$/,
          use: stylusLoaders({ production, client }),
        },
        {
          test: /\.css$/,
          use: cssLoaders({ production, client }),
        },
        {
          test: /\.(?:jpe?g|png|woff2?|eot|ttf)(?:\?.*$|$)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5120,
                name: '[name]-[hash:6].[ext]',
              },
            },
          ],
        },
        {
          test: /^[^.]+(?!\.icon)\.svg$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5120,
                name: '[name]-[hash:6].[ext]',
              },
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeTitle: true }],
              },
            },
          ],
        },
        {
          test: /\.icon\.svg$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelrc,
            },
            {
              loader: 'react-svg-loader',
              options: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          ],
        },
        {
          test: /\.txt$/,
          use: [
            {
              loader: 'text-loader',
            },
          ],
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        __CLIENT__: client,
        __DEVELOPMENT__: !production,
        __SERVER__: !client,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
        'process.env.RECAPTCHA_SITEKEY': JSON.stringify(process.env.RECAPTCHA_SITEKEY),
        'process.env.ANALYTICS_TRACKING_ID': JSON.stringify(process.env.ANALYTICS_TRACKING_ID),
        'process.env.PROJECT_HOMEPAGE': JSON.stringify(packageJson.homepage),
      }),
      !client && new DefinePlugin({
        'process.env.CONTACT_EMAIL': JSON.stringify(process.env.CONTACT_EMAIL),
        'process.env.RECAPTCHA_SECRET': JSON.stringify(process.env.RECAPTCHA_SECRET),
      }),
      new ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
      new NoEmitOnErrorsPlugin(),
      !production && new HotModuleReplacementPlugin(),
      !production && new NamedModulesPlugin(),
      client && new optimize.CommonsChunkPlugin({
        name: 'runtime',
        chunks: ['vendor'],
        minChunks: Infinity,
      }),
      client && new optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['bundle'],
        minChunks(module) { // eslint-disable-line no-unused-vars
          return false;
          // return module.context && module.context.includes('react');
        },
      }),
      client && production && new ExtractTextPlugin({
        filename: '[name]-[contenthash:6].css',
        allChunks: true,
      }),
      !client && !production && new BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      production && new LoaderOptionsPlugin({
        minimize: true,
      }),
      client && production && new optimize.UglifyJsPlugin({
        sourceMap: true,
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
