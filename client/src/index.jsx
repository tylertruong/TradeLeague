import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

import { Divider, Dimmer, Header, Icon } from 'semantic-ui-react';
import StockList from './containers/StockList.jsx';
import StockFeed from './containers/StockFeed.jsx';
import Chart from './containers/Chart.jsx';
import Summary from './components/Summary.jsx';
import ProgressBar from './components/ProgressBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    setTimeout(this.handleClose.bind(this), 150000);
  }

  handleOpen() {
    this.setState({ active: true });
  }
  handleClose() {
    this.setState({ active: false });
  } 
  render () {
    return (
      <div>
        <Summary />
        <Chart /> 
        <ProgressBar />
        <StockList />
        <Divider />
        <StockFeed />

        <Dimmer
          active={this.state.active}
          onClickOutside={this.handleClose.bind(this)}
          page
        >
          <Header as='h2' icon inverted>
            <Icon name='heart' />
            Times Up!
            <Header.Subheader>Markets Closed.</Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    );
  }
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('app'));