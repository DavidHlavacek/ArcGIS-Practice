import MapViewComponent from "./MapViewComponent";
import Sidebar from "../ui/Sidebar";
import { useMap } from "../../hooks/useMap";
import "./MapApp.css";
import "../ui/Sidebar.css";

function MapApp() {
  const { layers, setLayers, chartData } = useMap();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="main-view-container">
        <MapViewComponent isVisible={layers.length > 0 && layers[0].visible} />
      </div>
      <div className="sidebar-container">
        <Sidebar layers={layers} setLayers={setLayers} chartData={chartData} />
      </div>
    </div>
  );
}

export default MapApp;
