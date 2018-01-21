import httpProxy from 'http-proxy';


function createProxy( target ) {
  const proxy = httpProxy.createProxyServer();

  return (req, res, next) => {
    proxy.web(req, res, { target }, ( error ) => {
      next(error);
    });
  };
}

export default createProxy;
