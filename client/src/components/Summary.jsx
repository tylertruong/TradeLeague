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
        Upside:  3%<br></br>
        Capital:  $1.03<br></br>
        Invested: 100%<br></br>
        Clock: 28.25<br></br>
      </Segment>
    );
  }
}

export default Summary;