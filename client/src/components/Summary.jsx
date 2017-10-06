import React, { Component } from 'react';
import { Button, Menu, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Summary extends Component {

  findTotalGain() {
    let totalGain = 0;
    for (let i = 0; i < this.props.portfolio.length; i++) {
      totalGain += this.props.portfolio[i].net_gain;
    }
    return totalGain.toFixed(2);
  }

  findTotalCost() {
    let totalCost = 0;
    for (let i = 0; i < this.props.portfolio.length; i++) {
      totalCost += this.props.portfolio[i].total_cost;
    }
    return totalCost.toFixed(2);
  }

  render () {
    return (
      <Menu size='small'>
        <Menu.Item name='Trade League' />

        <Menu.Item name={`Total Gain ${this.findTotalGain()}`} />
        <Menu.Item name={`Total Cost ${this.findTotalCost()}`} />
        {this.props.portfolio.map(stock => {
          return <Menu.Item name={`${stock.symbol} ${stock.number_of_shares}`} />;
        })

        }

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item>
            <Button>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps)(Summary);

