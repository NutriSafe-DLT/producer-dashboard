import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const ExampleChart = () => {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: ["A", "B", "C"],
    },
    series: [{ data: [1, 2, 3] }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category);
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ExampleChart;
