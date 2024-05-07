import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
import "./BarChartComponent.css";

const BarChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const renderChart = () => {
      if (!chartRef.current) return;
      const chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name),
          axisLabel: {
            interval: 0,
            rotate: 35,
            formatter: (value) =>
              value.length > 15 ? `${value.slice(0, 15)}...` : value,
          },
        },
        yAxis: { type: "value" },
        series: [
          {
            data: data.map((item) => ({ value: item.value, name: item.name })),
            type: "bar",
          },
        ],
      });
    };

    if (data.length > 0) renderChart();
  }, [data]);

  return (
    <div
      id="barChart"
      ref={chartRef}
      style={{
        width: "100%",
        height: "400px",
        ariaLabel: "Bar Chart Displaying Data",
      }}
    ></div>
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChartComponent;
