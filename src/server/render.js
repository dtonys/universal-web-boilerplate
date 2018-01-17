// NOTE: This is the entry point for the server render
import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import createTheme from 'helpers/createTheme';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';
import App from 'components/App/App';


function createHtml({
  js,
  styles,
  cssHash,
  appString,
  muiCss,
}) {

  const dllScript = process.env.NODE_ENV !== 'production' ?
    '<script type="text/javascript" src="/static/vendorDll.js"></script>' :
    '';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title> universal-web-boilerplate </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style id="jss-server-side">${muiCss}</style>
        ${styles}
      </head>
      <body>
        <div id="root">${appString}</div>
        ${cssHash}
        ${dllScript}
        ${js}
      </body>
    </html>
  `;
}

function renderApp( path, sheetsRegistry ) {
  const generateClassName = createGenerateClassName();
  const theme = createTheme();
  const appRoot = (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Reboot />
        <App path={path} />
      </MuiThemeProvider>
    </JssProvider>
  );
  return appRoot;
}

function createServerRenderMiddleware({ clientStats }) {
  return async (req, res, next) => {
    let appString = null;
    const sheetsRegistry = new SheetsRegistry();
    try {
      appString = ReactDOM.renderToString(renderApp(req.path, sheetsRegistry));
    }
    catch ( err ) {
      console.log('ReactDOM.renderToString error'); // eslint-disable-line no-console
      console.log(err); // eslint-disable-line no-console
      next(err);
      return;
    }

    const muiCss = sheetsRegistry.toString();
    const chunkNames = flushChunkNames();
    const flushed = flushChunks(clientStats, { chunkNames });
    const { js, styles, cssHash } = flushed;

    const htmlString = createHtml({
      js,
      styles,
      cssHash,
      appString,
      muiCss,
    });
    res.send(htmlString);
  };
}

export default createServerRenderMiddleware;

