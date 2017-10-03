import React from 'react';
import StockListEntry from './StockListEntry.jsx';
import {Grid} from 'semantic-ui-react';
import Summary from './Summary.jsx';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Grid centered>
        <Summary />
        {this.props.stocks.map(stock => {
          return <StockListEntry key={stock.name} onStockListClick={this.props.onStockListClick} stock={stock} />;
        })}
      </Grid>
    );
  }
}

export default StockList;