import express from 'express';

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

function startServer( app ) {
  return new Promise((resolve, reject) => {
    app.listen(3010, (err) => {
      if ( err ) {
        console.log(err); // eslint-disable-line no-console
        reject(err);
      }
      console.log(`Server listening on port ${3010} !\n`); // eslint-disable-line no-console
    });
  });
}

async function bootstrap() {
  const app = express();
  app.use( express.static('public') );
  // app.get('/', (req, res) => {
  //   res.send('ok');
  // });

  const clientConfig = clientConfigFactory('development');
  const publicPath = clientConfig.output.publicPath;
  const outputPath = clientConfig.output.path;
  if ( DEV ) {
    await setupWebackDevMiddleware(app);
    await startServer(app);
  }
  else {
    const clientStats = require('../client/stats.json');
    const serverRender = require('../server/main.js').default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats, outputPath }));
    await startServer(app);
  }
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });

