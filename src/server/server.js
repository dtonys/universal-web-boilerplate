import express from 'express';

// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
// import clientConfig from '../../webpack/client.dev';
// import serverConfig from '../../webpack/server.dev';

const app = express();

// if ( process.env.NODE_ENV !== 'production' ) {

// }
// else {

// }

app.use( express.static('public') );
app.get('/', (req, res) => {
  res.send('ok');
});

app.listen(3000, () => {
  console.log(`Server listening on port ${3000} !\n`); // eslint-disable-line no-console
});
