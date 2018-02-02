import httpProxy from 'http-proxy';


function createProxy( target ) {
  const proxy = httpProxy.createProxyServer();

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
