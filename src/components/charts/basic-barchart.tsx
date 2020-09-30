import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

type BarChartProps = {
  title: string;
  color: string;
  flipped?: boolean;
  xAxis: string[];
  yAxis: number[];
};

const BarChart = ({
  title = "",
  color,
  flipped = false,
  xAxis = [],
  yAxis = [],
}: BarChartProps) => {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: xAxis,
    },
    yAxis: {
      reversed: flipped,
      min: 0,
      title: {
        text: "",
      },
    },
    series: [{ data: yAxis }],
    plotOptions: {
      series: {
        color: color,
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

export default BarChart;
