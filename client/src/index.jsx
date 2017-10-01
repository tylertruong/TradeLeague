import React from 'react';
import ReactDOM from 'react-dom';
import StockList from './components/StockList.jsx';
import StockFeed from './components/StockFeed.jsx';
import SearchBar from './components/SearchBar.jsx';
import {Divider} from 'semantic-ui-react';
import $ from 'jquery';

 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStocks: [],
      allStocks: []
    };
    this.fetch();
  }

  fetch() {
    $.ajax({
      method: 'GET',
      url: '/stocks',
      success: (data) => {
        console.log(data);
        this.setState({
          allStocks: data
        });
      }
    });
  }
  
  sendCurrentStocks() {
    $.ajax({
      method: 'POST',
      url: '/stocks',
      data: {stocks: this.state.myStocks},
      success: (data) => {
        console.log('made it!');
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  onStockFeedClick(value) {
    let myStocks = this.state.myStocks.slice();
    myStocks.push(value);
   
    let allStocks = this.state.allStocks.slice();
    for (let i = 0; i < allStocks.length; i++) {
      if (allStocks[i].name === value.name) {
        allStocks.splice(i, 1);
      }
    }

    this.setState({
      myStocks: myStocks,
      allStocks: allStocks
    });
  }

  onStockListClick(value) {
    let myStocks = this.state.myStocks.slice();
    for (let i = 0; i < myStocks.length; i++) {
      if (myStocks[i].name === value.name) {
        myStocks.splice(i, 1);
      }
    }
    this.setState({
      myStocks: myStocks
    });
  }

  searchStocks(term) {
    console.log('Sent this to the server:', term);
    $.ajax({
      method: 'GET',
      url: `/stocks?term=${term}`,
      success: (data) => {
        console.log(data);
      }
    });
  }

  render () {
    return (
      <div>
        <SearchBar searchStocks={this.searchStocks} />
        <StockList stocks={this.state.myStocks} onStockListClick={this.onStockListClick.bind(this)} />
        <Divider />
        <StockFeed stocks={this.state.allStocks} onStockFeedClick={this.onStockFeedClick.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));