import React from 'react';
import Summary from './Summary.jsx';
import {Grid, Segment, Header} from 'semantic-ui-react';

class StockFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <Grid.Column floated='right' mobile={12} tablet={6} computer={5}>
        <Segment>
          <Header as='h2'>Summary</Header>
          Upside:  3%<br></br>
          Capital:  $1.03<br></br>
          Invested: 100%<br></br>
          Clock: 28.25<br></br>
          <img src='./stock-history.png' width='100%' height='100%'></img><br></br>
          <br></br>
        </Segment>
      </Grid.Column>
    );
  }
}

export default StockFeed;