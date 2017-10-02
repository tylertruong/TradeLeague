import React from 'react';
import StockListEntry from './StockListEntry.jsx';
import {Grid} from 'semantic-ui-react';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            {this.props.stocks.map(stock => {
              return <StockListEntry key={stock.name} onStockListClick={this.props.onStockListClick} stock={stock} />;
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default StockList;