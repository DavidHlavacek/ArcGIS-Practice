import { useState, useEffect } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Sketch from '@arcgis/core/widgets/Sketch';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Legend from '@arcgis/core/widgets/Legend';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import { layersConfig } from '../utils/mapLayers';

export const useMap = () => {
  const [view, setView] = useState(null);
  const [layers, setLayers] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const map = new Map({ basemap: "arcgis-topographic" });
    const mapView = new MapView({
      container: "mapViewDiv",
      map: map,
      center: [19.699, 48.669],
      zoom: 8,
      spatialReference: { wkid: 3857 },
    });

    const sketchLayer = new GraphicsLayer();
    const highlightLayer = new GraphicsLayer(); // Layer for highlighting features
    map.addMany([sketchLayer, highlightLayer]); // Add both layers to the map

    const sketch = new Sketch({
      view: mapView,
      layer: sketchLayer,
      creationMode: "update"
    });
    mapView.ui.add(sketch, "top-right");

    const featureLayers = layersConfig.map(config => {
      const layer = new FeatureLayer({
        url: config.url,
        title: config.name,
        visible: false
      });
      map.add(layer);
      return { layer, name: config.name, visible: layer.visible };
    });

    sketch.on("create", function(event) {
      if (event.state === "complete") {
        performQuery(event.graphic.geometry);
      }
    });

    const performQuery = (geometry) => {
        const query = featureLayers[1].layer.createQuery();
        query.geometry = geometry;
        query.spatialRelationship = "intersects";
        query.returnGeometry = true;
        query.outFields = ["*"];
    
        featureLayers[1].layer.queryFeatures(query).then(function(results) {
            if (results.features.length > 0) {
                // Tally occurrences of each REGISTER type
                const counts = results.features.reduce((acc, feat) => {
                    const registerValue = feat.attributes.REGISTER;
                    if (acc[registerValue]) {
                        acc[registerValue]++;
                    } else {
                        acc[registerValue] = 1;
                    }
                    return acc;
                }, {});
    
                // Map to the labels for visualization
                const labels = {
                    A: "Pravdepodobná environmentálna záťaž",
                    B: "Environmentálna záťaž",
                    C: "Sanovaná/rekultivovaná lokalita",
                    AC: "Pravdepodobná environmentálna záťaž aj sanovaná/rekultivovaná lokalita",
                    BC: "Environmentálna záťaž aj sanovaná/rekultivovaná lokalita",
                    D: "Environmentálna záťaž vyradená z registrov"
                };
    
                const data = Object.keys(counts).map(key => ({
                    name: labels[key] || key, // Fallback to key if label not found
                    value: counts[key]  
                }));
                setChartData(data);
                setSelectedFeatures(results.features);
                highlightFeatures(results.features);
            } else {
                console.log("No features found in the selected area.");
                setChartData([]); // Clear previous data
            }

            mapView.goTo({
                target: geometry.extent.expand(1.8)  // Adjust the factor to set the desired zoom level
            }).catch(function(error) {
                console.error("Error when zooming to the polygon: ", error);
            });
        });
    };

    const highlightFeatures = (features) => {
      highlightLayer.removeAll(); // Clear previous highlights
      const highlightSymbol = {
        type: "simple-marker", // Use a simple marker symbol for points
        color: [255, 255, 0, 0.7], // Red color
        outline: { color: [255, 255, 255], width: 1.5 }
      };

      features.forEach((feature) => {
        const graphic = new Graphic({
          geometry: feature.geometry,
          symbol: highlightSymbol
        });
        highlightLayer.add(graphic); // Add to the highlight layer
      });
    };

    // Add the Legend and ScaleBar widgets
    mapView.ui.add(new Legend({
      view: mapView,
      layerInfos: featureLayers.map(layer => ({ layer: layer.layer, title: layer.name })),
    }), "bottom-right");

    mapView.ui.add(new ScaleBar({
      view: mapView,
      unit: "metric",
    }), "bottom-left");

    setLayers(featureLayers);
    setView(mapView);
  }, []);

  return { view, layers, setLayers, selectedFeatures, chartData };
};
