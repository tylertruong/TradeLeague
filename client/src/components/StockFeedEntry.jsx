import React, { Component } from 'react';
import {Grid, Segment, Header, Icon} from 'semantic-ui-react';
import StockChart from './StockChart.jsx';
import {Input, Button} from 'semantic-ui-react';


class StockFeedEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  onInputChange(event) {
    this.setState({quantity: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onStockClick(this.props.stock, this.state.quantity);
    this.setState({ quantity: 0 });
  }

  render() {
    if (!this.props.stock) {
      return <div></div>;
    }

    return (
      <Grid.Column mobile={12} tablet={6} computer={5}>
        <Segment >
          <Header as='h4' onClick={() => this.props.onTitleClick(this.props.stock)} >{this.props.stock.name}</Header> 
          Symbol: {this.props.stock.symbol} <br></br>
          Open: {this.props.stock.series[this.props.stock.refresh]['1. open']} <br></br>
          Close: {this.props.stock.series[this.props.stock.refresh]['4. close']} <br></br>
          Volume: {this.props.stock.series[this.props.stock.refresh]['5. volume']} <br></br>
          Last Refreshed: {this.props.stock.refresh} <br></br>
          <StockChart stock={this.props.stock} /><br></br>
          <div >
            <form onSubmit={this.onFormSubmit}>
              <Input type="number" value={this.state.quantity} onChange={this.onInputChange} /><Button type="submit">Buy</Button>
            </form>
          </div>
        </Segment>
      </Grid.Column>
    );
  }
}

export default StockFeedEntry;

