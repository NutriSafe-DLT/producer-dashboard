import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ProductionChart = () => {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      inverted: true
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "Pasteurisierte Milch",
        "Gallerte",
        "Rohmilch",
        "Sterilmilch",
        "Rahm",
        "Quark",
        "Schnittlauch",
        "Nusskernmischung",
        'Getrocknete Tomaten',
        'Meersalz'
      ],
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    series: [{ data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category);
            },
          },
        },
        showInLegend: false
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
