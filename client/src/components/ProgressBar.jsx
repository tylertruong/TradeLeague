import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';


class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0
    };
    setInterval(this.increment.bind(this), 1500);
  }
  
  increment() {
    this.setState({
      percent: this.state.percent + 1
    });
  }

  render() {
    return (
      <div>
        <Progress percent={this.state.percent} indicating />
      </div>
    );
  }
}

export default ProgressBar;