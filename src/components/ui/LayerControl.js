import React from "react";
import PropTypes from "prop-types";
import "./LayerControl.css";

function LayerControl({ layers, setLayers }) {
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
    <div className="layer-control-container">
      <h2>Map Layers</h2>
      {layers.map((layer, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => toggleLayerVisibility(index)}
              aria-labelledby={`layer-name-${index}`}
            />
            <span id={`layer-name-${index}`}>{layer.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

LayerControl.propTypes = {
  layers: PropTypes.array.isRequired,
  setLayers: PropTypes.func.isRequired,
};

export default LayerControl;
