import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Accordion, Icon } from 'semantic-ui-react';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  makeStocks(stock, index) {
    const { activeIndex } = this.state;

    return (
      <div>
        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick.bind(this)}>
          <Icon name='dropdown' />
          {stock.symbol}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <p>
           Net Gain: {this.props.portfolio.net_gain} <br />
           Number of Shares: {this.props.portfolio.number_of_shares} <br />
           Position Exposure: {this.props.portfolio.total_cost} <br />
           Last Trade Time: {this.props.portfolio.time_of_last_event} <br />
          </p>
        </Accordion.Content>
      </div>
    );
  }

  render() {
    if (this.props.portfolio.length === 0) {
      return <div></div>;
    }
    return (
      <Modal trigger={<Button>Profile</Button>}>
        <Modal.Header>{this.props.portfolio[0].trader}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Profile Statistics</Header>
            <p>Total Cost: {this.props.totalCost}</p>
            <p>Total Gain: {this.props.totalGain}</p>
            <Accordion fluid styled>
              {this.props.portfolio.map((stock, index) => this.makeStocks(stock, index))}
            </Accordion>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
     
  }
}

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps)(Profile);

