import { useState, useEffect } from "react";

export const useChartData = (isVisible) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isVisible) return;

    const fetchData = async () => {
      const queryUrl = "https://gis.geology.sk/arcgis/rest/services/Geofond/skladky_vect/MapServer/0/query";
      const response = await fetch(queryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          where: "1=1",
          outFields: "*",
          outStatistics: JSON.stringify([{ statisticType: "count", onStatisticField: "stavskladkyaplikacia", outStatisticFieldName: "count" }]),
          groupByFieldsForStatistics: "stavskladkyaplikacia",
          f: "json",
        }),
      });
      const json = await response.json();
      setData(json.features.map(feature => ({
        name: feature.attributes.stavskladkyaplikacia,
        value: feature.attributes.count,
      })));
    };

    fetchData();
  }, [isVisible]);

  return data;
};
