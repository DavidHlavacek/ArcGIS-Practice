import BarChartComponent from "../charts/BarChartComponent";
import "./ChartDataDisplay.css";

function ChartDataDisplay({ chartData }) {
  return <>{chartData.length > 0 && <BarChartComponent data={chartData} />}</>;
}

export default ChartDataDisplay;
