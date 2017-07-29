import Express from 'express';
import http from 'http';

import config from 'app/config';
import apiServer from 'server/api';
import mainMiddleware from 'server/middleware/main';
import errorMiddleware from 'server/middleware/error';

import faviconIco from '!!buffer-loader!app/assets/images/favicon.ico'; // eslint-disable-line
import robotsTxt from 'app/assets/robots.txt';


const app = new Express();

app.get('/favicon.ico', (req, res) => {
  res.set('Content-Type', 'image/vnd.microsoft.icon');
  res.send(faviconIco);
});

app.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

app.use('/static', (req, res, next) => {
  if (['server.js', 'webpack-dump-client.json', 'webpackStats.json'].map(file => `/static/${file}`).includes(req.originalUrl)) {
    const error = new Error('File not found');
    error.status = 404;
    next(error);
  } else {
    next();
  }
});

// Serve static files
app.use('/static', Express.static('dist', {
  maxAge: '1y',
}));

app.get('/github', (req, res) => {
  res.redirect(301, 'https://github.com/nhardy/south-of-45');
});

// Serve API Requests
app.use('/api', apiServer);

// Serve using the React App
app.use(mainMiddleware);
app.use(errorMiddleware);

let server;
if (process.env.HTTPS_ORIGIN) {
  // For our local prod emulation mode, we use httpolyglot to run HTTP/HTTPS on the same port

  // eslint-disable-next-line global-require, import/no-unresolved
  const cert = require('./server.pem');
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  server = require('httpolyglot').createServer({
    key: cert,
    cert,
  }, app);
} else {
  server = http.createServer(app);
}

let port = config.port;
if (__DEVELOPMENT__) port += 1;

server.listen(port);
