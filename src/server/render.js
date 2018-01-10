// NOTE: This is the entry point for the server render
import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from 'components/App/App';


function createHtml({
  js,
  styles,
  cssHash,
  appString,
}) {

  const dllScript = process.env.NODE_ENV !== 'production' ?
    '<script type=\'text/javascript\' src=\'/static/vendorDll.js\'></script>' :
    '';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title> universal-web-boilerplate </title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="/css/materialize.min.css" />
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

function createServerRenderMiddleware({ clientStats }) {
  return async (req, res, next) => {
    let appString = null;
    try {
      appString = ReactDOM.renderToString(<App path={req.path} />);
    }
    catch ( err ) {
      console.log('ReactDOM.renderToString error'); // eslint-disable-line no-console
      console.log(err); // eslint-disable-line no-console
      next(err);
      return;
    }

    const chunkNames = flushChunkNames();
    const flushed = flushChunks(clientStats, { chunkNames });
    const { js, styles, cssHash } = flushed;

    const htmlString = createHtml({
      js,
      styles,
      cssHash,
      appString,
    });
    res.send(htmlString);
  };
}

export default createServerRenderMiddleware;

