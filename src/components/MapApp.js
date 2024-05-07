import React from 'react';
import { useMap } from '../hooks/useMap';
import EChartsComponent from './EchartsComponent';
import BarChartComponent from './BarChartComponent';

function MapApp() {
  const { layers, setLayers, chartData } = useMap("mapViewDiv");

  const toggleLayerVisibility = (index) => {
    const newLayers = layers.map((layer, idx) => {
      if (idx === index) {
        layer.visible = !layer.visible;
        layer.layer.visible = layer.visible;
      }
      return layer;
    });
    setLayers(newLayers);
  };

  return (
    <div>
      <div id="mapViewDiv" style={{ width: "75vw", height: "100vh", float: "left", position: "relative" }}>
        {layers[0]?.visible && <EChartsComponent isVisible={layers[0].visible} />}
      </div>
      <div style={{ width: "25vw", height: "100vh", float: "right", overflow: "auto" }}>
        <h2>Map Layers</h2>
        {layers.map((layer, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => toggleLayerVisibility(index)}
              />
              {layer.name}
            </label>
          </div>
        ))}
        {/* Display BarChartComponent if there's data */}
        {chartData.length > 0 && (
          <div>
            <h2>Data Analysis</h2>
            <BarChartComponent data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MapApp;
