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
    if (this.props.stocks) {
      return (
        <Grid centered>
          {this.props.stocks.map(stock => {
            return <StockListEntry key={stock.symbol} onTitleClick={this.props.onTitleClick} onStockClick={this.props.onStockClick} stock={stock} />;
          })}
        </Grid>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default StockList;