import React, { useState } from "react";
import BarChart from "./basic-barchart";

const DeliveryChart = () => {
  const [chartOptions, setChartOptions] = useState({});

  return (
    <div>
      <BarChart
        title="Warenausgänge"
        color="lightgreen"
        xAxis={[
          "Pasteurisierte Milch",
          "Gallerte",
          "Rohmilch",
          "Sterilmilch",
          "Rahm",
          "Quark",
          "Schnittlauch",
          "Nusskernmischung",
          "Getrocknete Tomaten",
          "Meersalz",
        ]}
        yAxis={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]}
      />
    </div>
  );
};

export default DeliveryChart;
