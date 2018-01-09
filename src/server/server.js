import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfigFactory from '../../webpack/webpack.client.config';
import serverConfigFactory from '../../webpack/webpack.server.config';

const DEV = process.env.NODE_ENV !== 'production';
const app = express();
app.use( express.static('public') );
// app.get('/', (req, res) => {
//   res.send('ok');
// });

const clientConfig = clientConfigFactory('development');
const serverConfig = serverConfigFactory('development');
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
if ( DEV ) {
  const multiCompiler = webpack([ clientConfig, serverConfig ]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler, {
    // keeps serverRender updated with arg: { clientStats, outputPath }
    serverRendererOptions: {
      outputPath: clientConfig.output.publicPath,
    },
  }));
}
else {
  const clientStats = require('../build/client/stats.json');
  const serverRender = require('../build/server/main.js').default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3010, () => {
  console.log(`Server listening on port ${3010} !\n`); // eslint-disable-line no-console
});
