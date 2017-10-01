import React from 'react';
import {Segment, Header, Icon} from 'semantic-ui-react';

let StockFeedEntry = (props) => {
  return (
    <Segment>
      <Header as='h2'>{props.stock.name}</Header> <br></br>
      Find: {props.stock.find} <br></br>
      Price: {props.stock.price} <br></br>
      <img src='./stock-history.png' width='100%' height='100%'></img><br></br>
      <div style={{float: 'right'}}>
        <Icon name='checkmark' size='large' onClick={() => props.onStockFeedClick(props.stock)} /> <Icon name='remove' size='large' />
      </div>
    </Segment>
  );
};

export default StockFeedEntry;
