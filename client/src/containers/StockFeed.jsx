import React, { Component } from 'react';
import StockFeedEntry from '../components/StockFeedEntry.jsx';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectStock, getPortfolio, fetchStocks } from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class StockFeed extends Component {

  constructor(props) {
    super(props);
    this.buyStock = this.buyStock.bind(this);
    this.props.fetchStocks();
    setInterval(this.props.fetchStocks, 15000);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  buyStock(value) {
    const request = axios.post('/stock/buy', {
      stock: value
    });

    request
      .then(this.props.getPortfolio);
  }

  render() {
    return (
      <Grid centered>
        {this.props.stocks.map(stock => {
          return <StockFeedEntry key={stock.name} onTitleClick={this.props.selectStock} onStockClick={this.buyStock} stock={stock} />;
        })}   
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectStock, getPortfolio, fetchStocks }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(StockFeed);