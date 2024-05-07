import LayerControl from "./LayerControl";
import ChartDataDisplay from "./ChartDataDisplay";

function Sidebar({ layers, setLayers, chartData }) {
  return (
    <div style={{ width: "25vw", height: "100vh", overflow: "auto" }}>
      <LayerControl layers={layers} setLayers={setLayers} />
      <ChartDataDisplay chartData={chartData} />
    </div>
  );
}

export default Sidebar;
