import PieChartComponent from "../charts/PieChartComponent";
// import { useMap } from "../../hooks/useMap";

function MapViewComponent({ isVisible }) {
//   const { view } = useMap();

  return (
    <div id="mapViewDiv" style={{ width: "100%", height: "100%" }}>
      {isVisible && <PieChartComponent isVisible={isVisible} />}
    </div>
  );
}

export default MapViewComponent;
