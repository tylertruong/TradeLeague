import React from 'react';
import {Segment, Header} from 'semantic-ui-react';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <Segment>
        <Header as='h2'>Summary</Header>
        Upside:  3%   Capital:  $1.03  Invested: 100%  Clock: 28.25
      </Segment>
    );
  }
}

export default Summary;