import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './BarChartComponent.css'

const BarChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      chartInstance.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.name),
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.map(item => ({ value: item.value, name: item.name })),
          type: 'bar'
        }]
      });
    }
  }, [data]);

  return <div id='barChart' ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default BarChartComponent;
