import {plg} from "../../js/base/const.js";
// Class definition
var fun = function () {
  // Shared variables
  let redData;
  let chartObject = [];

  // Private functions

  const renderApexChart = (element, data, uKey) => {
    redData = Option_charts.createDataset(data);

    // data loading into chart
    const profile = {
      chart: {
        type  : 'area',
        height: 400
      },

      color: {
        base: 'Classic10',
      },

      tooltip: {
        style: [14, 400]
      }
    };
    const method = {
      chart     : plg.apexChart.method.sim,
      legend    : plg.apexChart.method.min,
      colors    : plg.apexChart.method.sim,
      grid      : plg.apexChart.method.adv,
      tooltip   : plg.apexChart.method.sim,
      states    : plg.apexChart.method.min,
      fill      : plg.apexChart.method.min,
      xaxis     : plg.apexChart.method.adv,
      yaxis     : plg.apexChart.method.adv,
      strock    : plg.apexChart.method.min,
      dataLabels: plg.apexChart.method.min,
    };

    let chartOpt = Option_charts.getProperty('options');
    let chartDft = Option_charts.getProperty('default');
    for (const chartOptKey in chartOpt) {
      redData[chartOptKey] = Option_charts.buildingOptions(
        chartOptKey,
        method[chartOptKey] ?? plg.apexChart.method.min,
        profile[chartOptKey] ?? chartDft[chartOptKey]);
    }

    // console.log(redData);
    chartObject[uKey] = plg_apexChart.$_manual(element, redData);

    return chartObject[uKey];
  }

  const updateApexChart = (chart, data) => {
    plg_apexChart.$_update(chart, data, plg.apexChart.update.options);
    return true;
  }

  // Public methods
  return {
    apexChart: function (element, data, key, chart = false) {
      return chart === false ? renderApexChart(element, data, key) : updateApexChart(chart, data);
    }
  };
};

const ext_render_chart = fun();
export default ext_render_chart;