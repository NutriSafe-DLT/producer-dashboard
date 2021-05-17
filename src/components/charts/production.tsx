import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ProductionChart = () => {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "area",
    },
    title: {
      text: "Produktionsprozesse",
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    series: [{ data: [3, 4, 2, 6] }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category);
            },
          },
        },
        showInLegend: false,
      },
    },
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ProductionChart;
