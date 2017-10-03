import React from 'react';
import {Grid, Segment, Header, Icon} from 'semantic-ui-react';
let StockListEntry = (props) => {
  return (
    <Grid.Column mobile={12} tablet={6} computer={5}>
      <Segment>
        <Header as='h2'>{props.stock.name}</Header>
        Find: {props.stock.find} <br></br>
        Price: {props.stock.price} <br></br>
        <img src='./stock-history.png' width='100%' height='100%'></img><br></br>
        <div style={{float: 'right'}}>
          <Icon name='checkmark' size='large' /> <Icon name='remove' size='large' onClick={() => props.onStockListClick(props.stock)} />
        </div>
        <br></br>
      </Segment>
    </Grid.Column>

  );
};

export default StockListEntry;