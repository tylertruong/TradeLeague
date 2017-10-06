import { combineReducers } from 'redux';
import StocksReducer from './StocksReducer';
import ActiveStock from './ActiveStock';
import PorfolioReducer from './PortfolioReducer';

const rootReducer = combineReducers({
  stocks: StocksReducer,
  activeStock: ActiveStock,
  portfolio: PortfolioReducer
});

export default rootReducer;