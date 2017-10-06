import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryBrushContainer } from 'victory';
import { connect } from 'react-redux';

class Chart extends Component {

  render() {
    let stockKeys = [];
    if (this.props.stock && Object.keys(this.props.stock).length !== 0) {
      stockKeys = Object.keys(this.props.stock.series).reverse();
    }

    const chartStyle = { parent: {minWidth: '100%', marginLeft: '2%', marginRight: '10%'}};

    return (
      <div>
        <h3>{this.props.stock ? this.props.stock.name : 'Graph'}</h3>
        <VictoryChart width={1000} height={450} scale={{x: 'time'}} style={chartStyle}>
          <VictoryLine
            style={{
              data: {stroke: 'tomato'}
            }}
            data={
              stockKeys.map(key => {
                return {x: new Date(key), y: this.props.stock.series[key]['4. close'] };
              })
            }
          />
        </VictoryChart>
      </div>
    );
     
  }
}

const mapStateToProps = (state) => {
  return {
    stock: state.activeStock
  };
};

export default connect(mapStateToProps)(Chart);

