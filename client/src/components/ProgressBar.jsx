import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';


class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 100
    };
    setInterval(this.decrement.bind(this), 1500);
  }
  
  decrement() {
    this.setState({
      percent: this.state.percent - 1
    });
  }

  render() {
    return (
      <div className="progress-bar">
        <h3 className="time">Time Left</h3>
        <Progress percent={this.state.percent} indicating />
      </div>
    );
  }
}

export default ProgressBar;