import { useEffect } from "react";
import * as echarts from "echarts";
import { useChartData } from "../../hooks/useChartData";
import "./PieChartComponent.css";

const PieChartComponent = ({ isVisible }) => {
  const data = useChartData(isVisible);

  useEffect(() => {
    if (isVisible && data.length > 0) {
      const chartDom = document.getElementById("echart");
      const myChart = echarts.init(chartDom);

      const customOrder = ["P", "UP", "UR", "O", "U", "OU", "OS"];
      const sortedData = data.sort(
        (a, b) => customOrder.indexOf(a.name) - customOrder.indexOf(b.name)
      );

      myChart.setOption({
        tooltip: { trigger: "item" },
        legend: { top: "5%", left: "center" },
        series: [
          {
            name: "Counts",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: 360,
            avoidLabelOverlap: false,
            label: { show: false, position: "center" },
            emphasis: {
              label: { show: true, fontSize: "40", fontWeight: "bold" },
            },
            labelLine: { show: false },
            data: sortedData,
          },
        ],
      });
    }
  }, [data, isVisible]);

  return isVisible ? <div id="echart"></div> : null;
};

export default PieChartComponent;
