import React from 'react';
import {Grid, Segment, Header, Icon} from 'semantic-ui-react';
import StockChart from './StockChart.jsx';

let StockListEntry = (props) => {
  if (!props.stock) {
    return <div></div>;
  }
  return (
    <Grid.Column mobile={12} tablet={6} computer={5}>
      <Segment>
        <Header as='h4' onClick={() => props.onTitleClick(props.stock)} >{props.stock.name}</Header> 
        Symbol: {props.stock.symbol} <br></br>
        Net Gain: {props.stock.net_gain} <br></br>
        Number of Shares: {props.stock.number_of_shares} <br></br>
        Total Cost: {props.stock.total_cost} <br></br>
        Last Event: {props.stock.time_of_last_event} <br></br>
        <StockChart stock={props.stock} /><br></br>
        <div style={{float: 'right'}}>
          <Icon name='checkmark' size='large' onClick={() => props.onStockClick(props.stock)} /> 
        </div>
        <br></br>
      </Segment>
    </Grid.Column>
  );
};

export default StockListEntry;

