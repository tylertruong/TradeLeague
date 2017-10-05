const axios = require('axios');
require('./config/config.js');

let fetchAll = (symbol) => {
  return axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: '1min',
      datatype: 'json',
      apikey: STOCK_API_KEY
    }
  });
};

module.exports = {
  fetchAll
};
