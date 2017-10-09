import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class Profile extends Component {

  constructor(props) {
    super(props);

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
            <p>{this.props.totalCost}</p>
            <p>{this.props.totalGain}</p>
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

