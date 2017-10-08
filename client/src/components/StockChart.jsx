import React from 'react';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';


class StockChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const chartStyle = { parent: {minWidth: '100%'}};
    let stockKeys = Object.keys(this.props.stock.series).reverse();
    return (
      <div>
        <VictoryChart width={1000} height={500} scale={{x: 'time'}} theme={VictoryTheme.material} style={chartStyle}
        >
          <VictoryLine
            style={{
              data: {stroke: 'tomato'}
            }}

            data={    
              stockKeys.map(key => {
                return {x: new Date(key), y: Number(this.props.stock.series[key]['4. close']) };
              })
            }
          />

        </VictoryChart>


      </div>
    );
  }
}

export default StockChart;