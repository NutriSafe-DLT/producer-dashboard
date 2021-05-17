import Highcharts, { color } from "highcharts";

var hcolors: string[] = [];

if (typeof Highcharts === "object") {
  hcolors = Highcharts.getOptions().colors;
}

export default hcolors;
