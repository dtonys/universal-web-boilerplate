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
    const appString = ReactDOM.renderToString(<App />);
    const chunkNames = flushChunkNames();
    const flushed = flushChunks(clientStats, { chunkNames });
    const { js, styles, cssHash } = flushed;

    const htmlString = createHtml({
      js,
      styles,
      cssHash,
      appString,
    });
    return res.send(htmlString);
  };
}

export default createServerRenderMiddleware;

