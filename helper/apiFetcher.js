const axios = require('axios');

const fetchAll = (symbol) => {
  return axios.get('https://www.alphavantage.co/query', {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: '1min',
      datatype: 'json',
      apikey: process.env.STOCK_API_KEY
    }
  });
};

module.exports = {
  fetchAll
};
