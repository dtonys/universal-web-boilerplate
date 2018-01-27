import httpProxy from 'http-proxy';


function createProxy( target ) {
  const proxy = httpProxy.createProxyServer();

  // proxy.on('proxyRes', function (proxyRes, req, res) {
  //   console.log('RAW Headers from the target', JSON.stringify(proxyRes.headers, true, 2));
  //   console.log('RAW Body from the target', JSON.stringify(proxyRes.body, true, 2));
  // });

  return (req, res, next) => {
    proxy.web(req, res, {
      target,
      changeOrigin: true,
    }, ( error ) => {
      next(error);
    });
  };
}

export default createProxy;
