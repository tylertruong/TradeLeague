import axios from 'axios';

export const STOCK_SELECTED = 'STOCK_SELECTED';
export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const FETCH_STOCKS = 'FETCH_STOCKS';

export const selectStock = (stock) => {
  return {
    type: STOCK_SELECTED,
    payload: stock
  };
};

export const getPortfolio = () => {
  const request = axios.get('/portfolio/send-all');

  return {
    type: GET_PORTFOLIO,
    payload: request
  };
};

export const fetchStocks = () => {
  const request = axios.get('/stock/send-all');

  return {
    type: FETCH_STOCKS,
    payload: request
  };
};

  