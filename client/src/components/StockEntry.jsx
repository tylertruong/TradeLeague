import React from 'react';
import {Grid, Segment, Header, Icon} from 'semantic-ui-react';
import StockChart from './StockChart.jsx';

let StockEntry = (props) => {
  return (
    <Grid.Column mobile={12} tablet={6} computer={5}>
      <Segment>
        <Header as='h2' onClick={() => props.onTitleClick(props.stock)} >{props.stock.name}</Header> 
        Symbol: {props.stock.symbol} <br></br>
        Open: {props.stock.series[props.stock.refresh]['1. open']} <br></br>
        Close: {props.stock.series[props.stock.refresh]['4. close']} <br></br>
        Volume: {props.stock.series[props.stock.refresh]['5. volume']} <br></br>
        Last Refreshed: {props.stock.refresh} <br></br>
        <StockChart stock={props.stock} /><br></br>
        <div style={{float: 'right'}}>
          <Icon name='checkmark' size='large' onClick={() => props.onStockClick(props.stock)} /> <Icon name='remove' size='large' />
        </div>
        <br></br>
      </Segment>
    </Grid.Column>
  );
};

export default StockEntry;

/*
        Open: {props.stock[props.stock.refresh]['1. open']} <br></br>
        Close: {props.stock[props.stock.refresh]['4. close']} <br></br>
        Volume: {props.stock[props.stock.refresh]['5. volume']} <br></br>
*/