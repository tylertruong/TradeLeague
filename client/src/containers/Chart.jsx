import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryBrushContainer } from 'victory';
import { connect } from 'react-redux';

class Chart extends React.Component {

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    if (Object.keys(this.props.stock).length === 0) {
      return <div></div>;
    }

    const chartStyle = { parent: {minWidth: '100%', marginLeft: '5%'}};
    let stockKeys = Object.keys(this.props.stock.series);

    return (
      <div>
        <VictoryChart width={1000} height={450} scale={{x: 'time'}} style={chartStyle}
          containerComponent={
            <VictoryZoomContainer responsive={false}
              dimension="x"
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
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


