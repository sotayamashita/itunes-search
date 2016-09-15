'use strict';
const got = require('got');

module.exports = (query, opts) => {
  const options = Object.assign({
    country: 'us',
  }, opts);

  if (typeof query !== 'string') {
    return Promise.reject(new TypeError(`Expected a \`string\`, got \`${typeof query}\``));
  }

  let params = '';
  Object.keys(options).forEach((key) => {
    if (params !== '') {
      params += '&';
    }
    params += `${key}=${encodeURIComponent(options[key])}`;
  });

  let url = `https://itunes.apple.com/search?term=${query}&`;
  url += params;

  return got(encodeURI(url)).then(response => response.body);
};
