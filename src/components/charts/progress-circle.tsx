import React, { useState } from "react";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import hcolors from "../../highcharts-colors";

if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

type GaugeProps = {
  title: string;
  subtitle: string;
  percentage: number;
};

const ProgressCircle = ({ title, subtitle, percentage }: GaugeProps) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: "solidgauge",
    },

    title: {
      text: title,
    },

    tooltip: {
      enabled: false,
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          y: -50,
          borderWidth: 0,
          backgroundColor: "none",
          useHTML: true,
          shadow: false,
          style: {
            fontSize: "16px",
          },
          formatter: function () {
            return (
              '<span style="font-size:2em;color:' +
              hcolors[0] +
              ';font-weight:bold;">' +
              percentage +
              "%" +
              '</span><br/><span style="font-size:1em;color:' +
              hcolors[1] +
              ';font-weight:bold;">' +
              subtitle +
              "</span>"
            );
          },
        },
      },
    },

    series: [
      {
        name: title,
        type: "solidgauge",
        borderColor: hcolors[1],
        data: [
          {
            color: hcolors[0],
            radius: "110%",
            innerRadius: "90%",
            y: percentage,
          },
        ],
      },
    ],
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ProgressCircle;
