import React from 'react';
import {VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryBrushContainer} from 'victory';


class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    if (this.props.stock.series) {
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
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default Chart;

/*

   <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={1000} height={100} scale={{x: 'time'}} style={chartStyle}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                dimension='x'
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={
                stockKeys.map(key => {
                  return new Date(key);
                })
              }
              tickFormat={(x) => new Date(x).getFullYear()}
            />
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


          */
