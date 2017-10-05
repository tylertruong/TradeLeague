import React from 'react';
import StockFeedEntry from './StockFeedEntry.jsx';
import {Grid} from 'semantic-ui-react';

class StockFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Grid centered>
        {this.props.stocks.map(stock => {
          return <StockFeedEntry key={stock.name} onTitleClick={this.props.onTitleClick} onStockClick={this.props.onStockClick} stock={stock} />;
        })}   
      </Grid>
    );
  }
}

export default StockFeed;