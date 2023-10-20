import {plg} from "../base/const.js";

// Class definition
var fun = function () {
  // Shared variables


  // Private functions

  const render = (ele, opt) => {
    let chart = new ApexCharts(ele, opt);
    chart.render();
    return chart;
  }

  const re_render = (ele, opt) => {
    ele.innerHTML = '';
    let chart = new ApexCharts(ele, opt);
    sleep(100).then(function () {
      chart.render()
    })
  }

  /**
   * https://apexcharts.com/docs/methods/#updateSeries
   * @param chart
   * @param data
   */
  const update_series = (chart, data) => {
    // this having some issues with loading.
    return chart.updateSeries(data);
  }
  const update_options = (chart, options) => {
    return chart.updateOptions(options);
  }
  const append_data = (chart, data) => {
    // this has not tested yet
    return chart.appendData(data);
  }
  const show_series = (chart, seriesName) => {
    // this has not tested yet
    return chart.showSeries(seriesName);
  }
  const hide_series = (chart, seriesName) => {
    // this has not tested yet
    return chart.hideSeries(seriesName);
  }
  const reset_series = (chart, data) => {
    // this has not tested yet
    const [sUpdate, sReset] = [data[0] ?? true, data[1] ?? true]
    return chart.resetSeries(sUpdate, sReset);
  }
  const destroyChart = (chart, none) => {
    chart.destroy();
  }
  const downloadPDF = (chart) => {
    var dataURL = chart.dataURI().then(({
                                          imgURI,
                                          blob
                                        }) => {
      const {jsPDF} = window.jspdf
      const pdf = new jsPDF();
      pdf.addImage(imgURI, 'PNG', 0, 0);
      pdf.save("pdf-chart.pdf");
    })
  }
  const _manual = (element, options, method) => {
    switch (method) {
      case plg.apexChart.init.render:
        // render fresh chart
        return render(element, options);

      case plg.apexChart.init.reload:
        // render already loaded chart
        return re_render(element, options);
    }
  }

  const _update = (element, options, method) => {
    switch (method) {
      case plg.apexChart.update.series:
        return update_series(element, options);

      case plg.apexChart.update.options:
        return update_options(element, options);

      case plg.apexChart.update.append:
        return append_data(element, options);

      case plg.apexChart.update.show:
        return show_series(element, options);

      case plg.apexChart.update.hide:
        return hide_series(element, options);

      case plg.apexChart.update.reset:
        return reset_series(element, options);

    }
  }

  // Public methods
  return {
    $_page: function () {
      // nothing much to call directly.
    },

    /**
     * this init and render the chart.
     * @param element
     * @param options
     * @param method default is 'render'
     * @returns {*|void}
     * @constructor
     */
    $_manual: function (element, options, method = plg.apexChart.init.render) {
      return _manual(element, options, method);
    },

    /**
     * this function changes the chart options as same object.
     * @param chart apexchart object of called chart
     * @param data data or option for change the chart
     * @param method default is options
     * @returns {*}
     * @constructor
     */
    $_update: function (chart, data, method = plg.apexChart.update.options) {
      return _update(chart, data, method);
    }
  };
};

const plg_apexChart = fun();
export default plg_apexChart;