import Express from 'express';
import bodyParser from 'body-parser';

import contactHandler from 'server/api/handlers/contact';


const apiServer = new Express();

apiServer.post('/contact', bodyParser.json(), contactHandler);

apiServer.use((req, res, next) => {
  const error = new Error(`Resource for '${req.url}' not found`);
  error.status = 404;
  next(error);
});

apiServer.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  let { status } = err;
  if (!status) status = 500;

  res.status(status);
  res.send({
    status,
    message: err.message || 'An unknown error occurred',
  });
});

export default apiServer;
