import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

import {Divider} from 'semantic-ui-react';
import $ from 'jquery';
import StockList from './containers/StockList.jsx';
import StockFeed from './containers/StockFeed.jsx';
import Chart from './containers/Chart.jsx';
import SearchBar from './components/SearchBar.jsx';
import Summary from './components/Summary.jsx';

class App extends Component {
  
  render () {
    return (
      <div>
        <Summary />
        <Chart /> 
        <StockList />
        <Divider />
        <StockFeed />
      </div>
    );
  }
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <App />
  </Provider>
  , document.getElementById('app'));