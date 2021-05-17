import React, { useState } from "react";
import BarChart from "./basic-barchart";

const GoodsChart = () => {
  const [chartOptions, setChartOptions] = useState({});

  return (
    <div>
      <BarChart
        title="Wareneingänge"
        color="darkblue"
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
        flipped={true}
      />
    </div>
  );
};

export default GoodsChart;
