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


const DEV = process.env.NODE_ENV !== 'production';

function setupWebackDevMiddleware(app) {
  const clientConfig = clientConfigFactory('development');
  const serverConfig = serverConfigFactory('development');
  const multiCompiler = webpack([ clientConfig, serverConfig ]);

  // HACK: Fix for repeated recompiles in dev mode
  // https://github.com/webpack/watchpack/issues/25#issuecomment-319292564
  multiCompiler.compilers.forEach(( compiler ) => {
    const timefix = 11000;
    compiler.plugin('watch-run', (watching, callback) => {
      watching.startTime += timefix;
      callback();
    });
    compiler.plugin('done', (stats) => {
      stats.startTime -= timefix;
    });
  });

  const clientCompiler = multiCompiler.compilers[0];
  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));

  return new Promise((resolve /* ,reject */) => {
    multiCompiler.plugin('done', resolve);
  });
}

async function serverSideRender( app ) {
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
    app.listen(3010, (err) => {
      if ( err ) {
        console.log(err); // eslint-disable-line no-console
        reject(err);
      }
      handleUncaughtErrors();
      console.log(`Server listening on port ${3010} !\n`); // eslint-disable-line no-console
    });
  });
}

async function bootstrap() {
  const app = express();

  // middleware
  app.use( express.static('public') );
  app.all('/favicon.*', (req, res) => {
    res.status(404).end();
  });
  if ( DEV ) {
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
  }
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hidePoweredBy());
  app.use(compression());
  app.use(cookieParser());

  app.use(handleErrorMiddleware);

  // TODO: Ensure cookie is accessible across domains.
  // TODO: Proxy to API

  await serverSideRender(app);
  await startServer(app);
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });

