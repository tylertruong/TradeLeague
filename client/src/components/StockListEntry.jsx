import React, { Component } from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import StockChart from './StockChart.jsx';
import { Input, Button } from 'semantic-ui-react';

class StockListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  onInputChange(event) {
    this.setState({ quantity: event.target.value });
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
          <h4 onClick={() => this.props.onTitleClick(this.props.stock)} >{this.props.stock.name}</h4> 
          Symbol: {this.props.stock.symbol} <br></br>
          Net Gain: {this.props.stock.net_gain} <br></br>
          Number of Shares: {this.props.stock.number_of_shares} <br></br>
          Total Cost: {this.props.stock.total_cost} <br></br>
          Last Event: {this.props.stock.time_of_last_event} <br></br>
          <StockChart stock={this.props.stock} /><br></br>
          <div>
            <form onSubmit={this.onFormSubmit}>
              <Input type="number" min="0" max={this.props.stock.number_of_shares} value={this.state.quantity} onChange={this.onInputChange} /><Button type="submit">Sell</Button>
            </form>
          </div>
        </Segment>
      </Grid.Column>
    );
  }
}

export default StockListEntry;

