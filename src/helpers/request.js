import lodashGet from 'lodash/get';
import querystring from 'querystring';


function getPath( req, url, query ) {
  const queryString = query ? ('?' + querystring.stringify(query)) : '';
  // NOTE: Use full url if it starts with http
  if ( /http/.test(url) ) {
    return url + queryString;
  }
  const basePath = req ? (`${req.protocol}://${req.get('host')}`) : '';
  return basePath + url + queryString;
}

const makeRequest = (req) => (url, options = {}) => {
  const path = getPath(req, url, options.query);
  const fetchOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  if ( options.body && typeof options.body === 'object' ) {
    fetchOptions.body = JSON.stringify(options.body);
  }
  if ( req && lodashGet(req, 'headers.cookie') ) {
    fetchOptions.headers['cookie'] = req.headers.cookie;
  }

  let responseStatus;
  let responseOk;
  return fetch(path, fetchOptions)
    .then((response) => {
      responseOk = response.ok;
      responseStatus = response.status;
      return response.json();
    })
    .then((body) => {
      if ( !responseOk ) {
        return Promise.reject({
          ...body,
          status: responseStatus,
        });
      }
      return body;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default makeRequest;

