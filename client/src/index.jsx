import React from 'react';
import ReactDOM from 'react-dom';
import StockList from './components/StockList.jsx';
import StockFeed from './components/StockFeed.jsx';
import SearchBar from './components/SearchBar.jsx';
import {Divider} from 'semantic-ui-react';
import $ from 'jquery';
import Chart from './components/Chart.jsx';
import Summary from './components/Summary.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStocks: [],
      allStocks: [],
      currentStock: {}
    };
  }

  componentDidMount() {
    this.fetch();
    setInterval(this.fetch, 30000);
  }

  fetch() {
    $.ajax({
      method: 'GET',
      url: '/stock/send-all',
      success: (data) => {
        this.setState({
          allStocks: data,
          currentStock: data[0]
        }, () => {
          this.getPortfolio();
        });
      }
    });
  }
  

  updatePortfolio(stocks) {
    let combo = stocks.map(stock => {
      for (let i = 0; i < this.state.allStocks.length; i++) {
        if (stock.symbol === this.state.allStocks[i].symbol) {
          stock.name = this.state.allStocks[i].name;
          stock.series = this.state.allStocks[i].series;
          return stock;
        }
      }
    });

    return combo; 

  }

  getPortfolio() {
    $.ajax({
      method: 'GET',
      url: '/portfolio/send-all',
      success: (data) => {
        this.setState({
          myStocks: this.updatePortfolio(data)
        });
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  onTitleClick(value) {
    this.setState({
      currentStock: value
    });
  }

  buyStock(value) {

    $.ajax({
      method: 'POST',
      url: '/stock/buy',
      data: {stock: value},
      success: (data) => {
        console.log('bought!');
        this.getPortfolio();
      },
      error: (data) => {
        console.log(data);
      }
    });

  }
  
  processSellStock(value) {
    let stock = value;
    
    for (let i = 0; i < this.state.allStocks.length; i++) {
      if (this.state.allStocks[i].symbol === stock.symbol) {
        stock.refresh = this.state.allStocks[i].refresh;
        stock.close = this.state.allStocks[i].series[stock.refresh]['4. close'];
      }
    } 
    return stock;
  }

  sellStock(value) {
    
    $.ajax({
      method: 'POST',
      url: '/stock/sell',
      data: {stock: this.processSellStock(value)},
      success: (data) => {
        console.log('sell!');
        this.getPortfolio();
      },
      error: (data) => {
        console.log(data);
      }
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
        <Chart stock={this.state.currentStock} /> 
        <StockList stocks={this.state.myStocks} onTitleClick={this.onTitleClick.bind(this)} onStockClick={this.sellStock.bind(this)} />
        <Divider />
        <StockFeed stocks={this.state.allStocks} onTitleClick={this.onTitleClick.bind(this)} onStockClick={this.buyStock.bind(this)} />
        <Summary />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));