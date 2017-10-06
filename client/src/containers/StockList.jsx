import React from 'react';
import StockListEntry from './StockListEntry.jsx';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectStock, getPortfolio } from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';



class StockList extends React.Component {

  constructor(props) {
    super(props);

    this.sellStock = this.sellStock.bind(this);
  }

  componentDidMount() {
    this.props.getPortfolio();
  }

  sellStock(value) {
    const request = axios.post('/stock/sell', {
      stock: this.processSellStock(value)
    });

    request
      .then(this.props.getPortfolio);
  }
  
  processSellStock (value) {
    let stock = value;
    for (let i = 0; i < this.props.stock.length; i++) {
      if (this.props.stock[i].symbol === stock.symbol) {
        stock.refresh = this.props.stock[i].refresh;
        stock.close = this.props.stock[i].series[stock.refresh]['4. close'];
      }
    } 
    return stock;
  }

  updatePortfolioStock (stock) {
    for (let i = 0; i < this.props.stocks.length; i++) {
      if (stock.symbol === this.props.stocks[i].symbol) {
        stock.name = this.props.stocks[i].name;
        stock.series = this.props.stocks[i].series;
        return stock;
      }
    }
  }

  render() {
    if (!this.props.portfolio) {
      return <div></div>;
    }

    return (
      <Grid centered>
        {this.props.portfolio.map(stock => {
          return <StockListEntry key={stock.symbol} onTitleClick={this.props.selectStock} onStockClick={this.sellStock} stock={this.updatePortfolioStock(stock)} />;
        })}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    portfolio: state.portfolio
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectStock, getPortfolio }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(StockList);