import Express from 'express';

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
  res.redirect(301, 'https://github.com/nhardy');
});

app.get('/govhack', (req, res) => {
  res.redirect(302, 'https://youtu.be/3ne1Qaaas3g');
});

app.get('/linkedin', (req, res) => {
  res.redirect(302, 'https://au.linkedin.com/in/nathan-hardy-263488b2');
});

// Serve API Requests
app.use('/api', apiServer);

// Serve using the React App
app.use(mainMiddleware);
app.use(errorMiddleware);

let port = config.port;
if (__DEVELOPMENT__) port += 1;

app.listen(port);
