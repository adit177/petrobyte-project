// Class definition

var fun = function () {

  // Shared variables


  // Private functions
  const render = (tableEle, options) => {
    return $(tableEle).DataTable(options);
  }

  const re_render = (ele, opt) => {
    //
  }

  const search = (table, data) => {
    table.search(data.target.value).draw();
  }
  const filter = (table, data) => {

    const a = data.target.value;

    table.search(a).draw();
  }
  const reset = (table, data) => {
    return table.search('').draw();
  }

  const show_series = (chart, data) => {
    // this has not tested yet
    return chart.showSeries(data);
  }
  const hide_series = (chart, data) => {
    // this has not tested yet
    return chart.hideSeries(data);
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

  }
  const _manual = (element, options, method) => {
    switch (method) {
      case 'new':
        // render fresh chart
        return render(element, options);

      case 'renew':
        // render already loaded chart
        return re_render(element, options);
    }
  }

  const _update = (element, options, method) => {
    switch (method) {
      case 'series':
        return update_series(element, options);
      case 'options':
        return update_options(element, options);
      case 'append':
        return append_data(element, options);
      case 'show':
        return show_series(element, options);
      case 'hide':
        return hide_series(element, options);
      case 'reset':
        return reset_series(element, options);
    }
  }

  const _run = (element, options, method) => {
    switch (method) {
      case 'series':
        return update_series(element, options);
      case 'options':
        return update_options(element, options);
      case 'append':
        return append_data(element, options);
      case 'show':
        return show_series(element, options);
      case 'hide':
        return hide_series(element, options);
      case 'reset':
        return reset_series(element, options);
    }
  }

  // Public methods
  return {
    $_page  : function () {
      // nothing much to call directly.
    },
    $_manual: function (element, options, method) {
      return _manual(element, options, method);
    },
    $_run   : function (table, data, method) {
      return _run(table, data, method);
    },
    $_update: function (table, data, method) {
      return _update(table, data, method);
    }

  };
};

const plg_dataTables = fun();
export default plg_dataTables;