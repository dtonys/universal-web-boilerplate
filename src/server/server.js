import 'fetch-everywhere';
import colors from 'colors/safe';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfigFactory from '../../webpack/webpack.client.config';
import serverConfigFactory from '../../webpack/webpack.server.config';
import dotenv from 'dotenv';
import path from 'path';
import createProxy from 'server/apiProxy';


const DEV = process.env.NODE_ENV !== 'production';

function setupWebackDevMiddleware(app) {
  const clientConfig = clientConfigFactory('development');
  const serverConfig = serverConfigFactory('development');
  const multiCompiler = webpack([ clientConfig, serverConfig ]);

  const clientCompiler = multiCompiler.compilers[0];
  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));

  return new Promise((resolve /* ,reject */) => {
    multiCompiler.hooks.done.tap('done', resolve);
  });
}

async function setupWebpack( app ) {
  const clientConfig = clientConfigFactory('development');
  const publicPath = clientConfig.output.publicPath;
  const outputPath = clientConfig.output.path;
  if ( DEV ) {
    await setupWebackDevMiddleware(app);
  }
  else {
    const clientStats = require('../client/stats.json');
    const serverRender = require('../server/main.js').default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats, outputPath }));
  }
}

function handleErrorMiddleware( err, req, res, next ) {
  // NOTE: Add additional handling for errors here
  console.log(err); // eslint-disable-line no-console
  // Pass to express' default error handler, which will return
  // `Internal Server Error` when `process.env.NODE_ENV === production` and
  // a stack trace otherwise
  next(err);
}

function handleUncaughtErrors() {
  process.on('uncaughtException', ( error ) => {
    // NOTE: Add additional handling for uncaught exceptions here
    console.log('uncaughtException'); // eslint-disable-line no-console
    console.log(error); // eslint-disable-line no-console
    process.exit(1);
  });
  // NOTE: Treat promise rejections the same as an uncaught error,
  // as both can be invoked by a JS error
  process.on('unhandledRejection', ( error ) => {
    // NOTE: Add handling for uncaught rejections here
    console.log('unhandledRejection'); // eslint-disable-line no-console
    console.log(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

function startServer( app ) {
  return new Promise((resolve, reject) => {
    app.listen(process.env.SERVER_PORT, (err) => {
      if ( err ) {
        console.log(err); // eslint-disable-line no-console
        reject(err);
      }
      handleUncaughtErrors();
      console.log(colors.black.bold('⚫⚫')); // eslint-disable-line no-console
      console.log(colors.black.bold(`⚫⚫ Web server listening on port ${process.env.SERVER_PORT}...`)); // eslint-disable-line no-console
      console.log(colors.black.bold('⚫⚫\n')); // eslint-disable-line no-console
    });
  });
}

function loadEnv() {
  dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
  });

  if ( !process.env.SERVER_PORT ) {
    console.log('SERVER_PORT not set in .env file, defaulting to 3000'); // eslint-disable-line no-console
    process.env.SERVER_PORT = 3000;
  }

  if ( !process.env.API_URL ) {
    console.log('API_URL not set in .env file'); // eslint-disable-line no-console
  }
}

async function pingApi() {
  // Ping API Server
  const response = await fetch( process.env.API_URL );
  if ( response && response.ok ) {
    console.log(colors.black.bold('⚫⚫')); // eslint-disable-line no-console
    console.log(colors.black.bold(`⚫⚫ Connected to API server at ${process.env.API_URL}`)); // eslint-disable-line no-console
    console.log(colors.black.bold('⚫⚫\n')); // eslint-disable-line no-console
  }
  else {
    throw new Error(`Cannot ping API server at ${process.env.API_URL}. Status: ${response.status}`);
  }
}

async function bootstrap() {
  let offlineMode = false;
  loadEnv();

  try {
    await pingApi();
  }
  catch ( error ) {
    console.log(colors.red.bold('🔴🔴')); // eslint-disable-line no-console
    console.log(colors.red.bold('🔴🔴 API not configured, proceeding with offline mode')); // eslint-disable-line no-console
    console.log(colors.red.bold('🔴🔴\n')); // eslint-disable-line no-console
    offlineMode = true;
  }

  const app = express();

  // middleware
  app.use( express.static('public') );
  app.all('/favicon.*', (req, res) => {
    res.status(404).end();
  });
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hidePoweredBy());
  app.use(compression());
  app.use(cookieParser());

  app.use(handleErrorMiddleware);

  // Send dummy JSON response if offline
  if ( offlineMode ) {
    app.all('/api/*', (req, res) => res.send({}));
  }
  // Proxy to API
  app.all('/api/*', createProxy( process.env.API_URL ));

  await setupWebpack(app);
  await startServer(app);
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });

