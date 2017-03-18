import Express from 'express';

import config from 'app/config';
import apiServer from 'server/api';
import mainMiddleware from 'server/middleware/main';
import errorMiddleware from 'server/middleware/error';

import faviconIco from '!!buffer-loader!app/assets/images/favicon.ico'; // eslint-disable-line


const app = new Express();

app.get('/favicon.ico', (req, res) => {
  res.set('Content-Type', 'image/vnd.microsoft.icon');
  res.send(faviconIco);
});

// Serve static files
app.use('/dist', Express.static('dist'));

app.get('/github', (req, res) => {
  res.redirect(301, 'https://github.com/nhardy');
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
