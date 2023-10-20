import chartsProfile from "../profiles/charts.js";
import {exT, rdR, CLS, STYLE, plg, deF, kws, Lyt, otR, sD, glob} from "../base/const.js"

// Class definition

const fun = function () {
  // https://apexcharts.com/docs/options/
  // Shared variables
  let $chart;
  const charType = ['line', 'area', 'bar', 'pie', 'radar', 'histogram', 'donut', 'radialBar', 'scatter', 'bubble', 'heatmap', 'candlestick'];
  const charOpt_arr = ['chart', 'legend', 'colors', 'grid', 'tooltip', 'states', 'fill', 'xaxis', 'yaxis', 'strock', 'dataLabels'];

  // this colors used to take direct shades.
  const colorShades = {
    minimal: {
      bs   : 'bootstrap',
      other: 'other',
      keen : 'keen'
    },
    simple : {
      tableau       : 'Tableau10',
      traffic       : 'Traffic9',
      classic       : 'Classic10',
      classic_medium: 'ClassicMedium10',
      setone        : 'SetOne9',
      settwo        : 'SetTwo8',
      gray          : 'Gray20'
    },
    advance: {none: 'None'}
  }
  // keyIndex of chart options
  const chartOptions = {
    chart      : 0,
    legend     : 1,
    colors     : 2,
    grid       : 3,
    tooltip    : 4,
    states     : 5,
    fill       : 6,
    xaxis      : 7,
    yaxis      : 8,
    strock     : 9,
    dataLabels : 10,
    plotOptions: 11,
  };

  const defaultMethods = {
    chart      : plg.apexChart.method.min,
    legend     : plg.apexChart.method.min,
    colors     : plg.apexChart.method.min,
    grid       : plg.apexChart.method.sim,
    tooltip    : plg.apexChart.method.sim,
    states     : plg.apexChart.method.sim,
    fill       : plg.apexChart.method.sim,
    xaxis      : plg.apexChart.method.sim,
    yaxis      : plg.apexChart.method.sim,
    strock     : plg.apexChart.method.sim,
    dataLabels : plg.apexChart.method.sim,
    plotOptions: plg.apexChart.method.min
  };

  /*
   defaultProfiles of each option has three object
   minimal: {},
   simple: {},
   advance: {},
   */
  const defaultProfiles = {
    // style: [fs, fw, fc]
    chart :
      {
        minimal:
          {
            type  : 'area',
            height: 400,
            stack : false,
          },
        simple :
          {
            type   : 'area',
            height : 400,
            stack  : false,
            toolbar: [true, true, false, true, true],
          },
        advance:
          {
            type   : 'area',
            height : 400,
            stack  : false,
            toolbar: [true, true, false, true, true],
            name   : 'petrobyte',
            animate: [true, 'easeinout', 1000],
          },
      },
    legend:
      {
        minimal:
          {
            status  : true,
            position: 'bottom',
            align   : 'center',
          },
        simple :
          {
            status  : true,
            position: 'bottom',
            align   : 'center',
            style   : ['16', 'bold'],
          },
        advance:
          {
            status  : true,
            position: 'bottom',
            align   : 'center',
            style   : ['16', 'bold'],
            // [width, height, strokeWidth, strokeColor, radius, offsetX, offsetY]
            marker: [12, 12, 0, '#fff', 12, 0, 0],
          },
      },
    // todo: CBC
    colors     :
      {
        minimal:
          {
            base: colorShades.minimal.bs
          },
        simple :
          {
            base: colorShades.simple.tableau
          },
        advance:
          {
            base: colorShades.advance.none
          }
      },
    grid       :
      {
        minimal:
          {
            status: true,
            color : 5,
            dash  : 4,
          },
        simple :
          {
            status  : true,
            color   : 5,
            dash    : 4,
            position: 'back', // front
            axis    : [false, true], // [x, y]
          },
        advance:
          {
            status  : true,
            color   : 5,
            dash    : 4,
            position: 'back', // front
            axis    : [false, true], // [x, y]
            padding : [5, 5, 5, 5]
          }
      },
    tooltip    :
      {
        minimal:
          {
            // [enabled, shared, followCursor, fillSeriesColor, highlightDataSeries]
            status: [true, true, true, false, true, true],
            // 'light', 'dark', false
            theme: 'light',
            style: [14, 500],
          },
        simple :
          {
            status: [true, true, true, false, true, true],
            theme : 'light',
            style : [14, 500],
            x     : [true, 'Date: '],
            y     : [true, '₹ ', ' Lakh']
          },
        advance:
          {
            status: [true, true, true, false, true, true],
            theme : 'light',
            style : [14, 500],
            x     : [true, 'Date: '],
            y     : [true, '₹ ', ' Lakh'],
            fixed : [false, 'topRight, 0, 0'],
          },
      },
    states     :
      {
        minimal:
          {
            normal: ['none', 0],
            hover : ['none', 0],
            active: [false, 'none', 0],
          },
        simple :
          {
            normal: ['none', 0],
            hover : ['lighten', 0],
            active: [true, 'darken', 0],
          },
        advance:
          {},
      },
    fill       :
      {
        minimal:
          {
            opacity: 0.9,
            type   : 'solid', // ['solid', 'gradient', 'pattern', 'image']
          },
        simple :
          {
            opacity: 0.9,
            type   : 'solid',
            // todo: add color
            //color: colors(ACT_m.o.sim, {base: colorShades.simple.gray}),
            gradient: []
          },
        advance: {
          opacity: 0.9,
          type   : 'solid',
          // todo: add color
          // color: colors(ACT_m.o.sim, {base: colorShades.simple.gray}),
          gradient: [],
        },
      },
    xaxis      :
      {
        minimal:
          {
            base : {
              type     : 'category',
              ticks    : undefined,
              placement: 'on',
              position : 'bottom'
            },
            label: {
              status: true,
              style : [12, 400, 15],
            },
          },
        simple :
          {},
        advance:
          {
            base   : {
              type     : 'category',
              ticks    : undefined,
              placement: 'on',
              position : 'bottom'
            },
            label  : {
              status: true,
              style : [12, 400, 15],
            },
            title  : {
              text  : undefined,
              offset: [0, 0],
              style : [12, 500, 10]
            },
            tooltip: {
              status: false,
              offset: [0, 0],
              style : [12,]
            }
          },
      },
    yaxis      :
      {
        minimal:
          {
            base: {
              status  : true,
              opposite: false,
              reversed: false,
              ticks   : undefined,
              nice    : true,
            },
          },
        simple :
          {
            base   : {
              status  : true,
              opposite: false,
              reversed: false,
              ticks   : undefined,
              nice    : true,
            },
            label  : {
              status: true,
              style : [12, 400, 12],
              offset: [0, 0, 0],
              format: ['', ' L']
            },
            title  : {
              text  : undefined,
              style : [12, 500, 12],
              offset: [0, 0, -90],
              format: ['', '']
            },
            tooltip: {
              status: true,
              offset: [0, 0], // x is used.
              style : [10]
            },
          },
        advance:
          {},
      },
    strock     :
      {
        minimal:
          {
            show : true,
            width: 4,
            curve: 'smooth',
          },
        simple :
          {},
        advance:
          {
            show : true,
            curve: ['smooth', 'straight', 'stepline'],
            width: 2,
            cap  : 'butt', // [butt, square, round]
            dash : 2,
          },
      },
    dataLabels :
      {
        minimal:
          {
            status: false,
          },
        simple :
          {
            status: true,
            format: ['', ''],
            offset: [0, 0, 'middle'],
          },
        advance:
          {
            status: true,
            format: ['', ''],
            offset: [0, 0, 'middle'],
            style : [12, 'bold', 0]
          },
      },
    plotOptions:
      {
        minimal:
          {
            radius: 5
          },
        simple :
          {
            radius: 5,
            width : 35,
            height: 70,
          },
        advance:
          {
            radius: 5,
            width : 35,
            height: 70,
          },
      }
  };


  // Private functions
  const chart = function (method, params) {
    const _chart_minimal = (type, height, stack) => {
      return {
        fontFamily: 'inherit',
        type      : type,
        stacked   : stack,
        height    : height,
        toolbar   : {
          show: false
        }
      }
    }
    const _chart_simple = (type, height, stack, toolbar) => {
      return {
        fontFamily: 'inherit',
        type      : type,
        stacked   : stack,
        height    : height,
        toolbar   : {
          show : toolbar[0],
          tools: {
            download   : '<i class="fs-2x bi bi-box-arrow-down"></i>',
            selection  : toolbar[1],
            zoom       : toolbar[2],
            zoomin     : toolbar[3] ? '<i class="fs-2x bi bi-zoom-in"></i>' : false,
            zoomout    : toolbar[4] ? '<i class="fs-2x bi bi-zoom-out"></i>' : false,
            reset      : false,
            pan        : false,
            customIcons: []
          },
        }
      }
    }
    const _chart_advance = (type, height, stack, toolbar, name, animate) => {
      return {
        fontFamily: 'inherit',
        type      : type,
        stacked   : stack,
        height    : height,
        toolbar   : {
          show  : toolbar[0],
          tools : {
            download   : '<i class="fs-2x bi bi-box-arrow-down"></i>',
            selection  : toolbar[1],
            zoom       : toolbar[2],
            zoomin     : toolbar[3] ? '<i class="fs-2x bi bi-zoom-in"></i>' : false,
            zoomout    : toolbar[4] ? '<i class="fs-2x bi bi-zoom-out"></i>' : false,
            reset      : false,
            pan        : false,
            customIcons: []
          },
          export: {
            csv: {filename: name},
            svg: {filename: name},
            png: {filename: name}
          },
        },
        animations: {
          enabled         : animate[0],
          easing          : animate[1],
          speed           : animate[2],
          animateGradually: {
            enabled: true,
            delay  : 100
          },
          dynamicAnimation: {
            enabled: true,
            speed  : 250
          }
        }
      }
    }

    let p = [];
    for (const chartKey in defaultProfiles.chart[method]) {
      p[chartKey] = params[chartKey] === undefined || params[chartKey].length === 0 ? defaultProfiles.chart[method][chartKey] : params[chartKey];
    }
    // calling matched function
    switch (method) {
      case plg.apexChart.method.min:
        return _chart_minimal(p.type, p.height, p.stack);

      case plg.apexChart.method.sim:
        return _chart_simple(p.type, p.height, p.stack, p.toolbar);

      case plg.apexChart.method.adv:
        return _chart_advance(p.type, p.height, p.stack, p.toolbar);
    }
  }

  const legend = function (method, params) {
    const _legend_minimal = (status, position, align) => {
      return {
        show           : status,
        position       : position,
        horizontalAlign: align,
        floating       : false,
      }
    }
    const _legend_simple = (status, position, align, style) => {
      return {
        show               : true,
        showForSingleSeries: false,
        showForNullSeries  : true,
        showForZeroSeries  : true,
        position           : position,
        horizontalAlign    : align,
        floating           : false,
        fontSize           : style[0] + 'px',
        fontFamily         : 'Helvetica, Arial',
        fontWeight         : style[1],
      }
    }
    const _legend_adv = (status, position, align, style, marker) => {
      return {
        show                 : true,
        showForSingleSeries  : false,
        showForNullSeries    : true,
        showForZeroSeries    : true,
        position             : position,
        horizontalAlign      : align,
        floating             : false,
        fontSize             : style[0] + 'px',
        fontFamily           : 'Helvetica, Arial',
        fontWeight           : style[1],
        formatter            : undefined,
        inverseOrder         : false,
        width                : undefined,
        height               : undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems    : [],
        offsetX              : 0,
        offsetY              : 0,
        labels               : {
          colors         : undefined,
          useSeriesColors: false
        },
        markers              : {
          width      : marker[0],
          height     : marker[1],
          strokeWidth: marker[2],
          strokeColor: marker[3],
          fillColors : undefined,
          radius     : marker[4],
          customHTML : undefined,
          onClick    : undefined,
          offsetX    : marker[5],
          offsetY    : marker[6]
        },
        itemMargin           : {
          horizontal: 5,
          vertical  : 0
        },
        onItemClick          : {
          toggleDataSeries: true
        },
        onItemHover          : {
          highlightDataSeries: true
        },
      }
    }

    // parameter initialized.
    let p = [];
    for (const legendKey in defaultProfiles.legend[method]) {
      p[legendKey] = params[legendKey] === undefined || params[legendKey].length === 0 ? defaultProfiles.legend[method][legendKey] : params[legendKey];
    }

    // calling matched function
    switch (method) {
      case plg.apexChart.method.min:
        return _legend_minimal(p.status, p.position, p.align);

      case plg.apexChart.method.sim:
        return _legend_simple(p.status, p.position, p.align, p.style);

      case plg.apexChart.method.adv:
        return _legend_adv(p.status, p.position, p.align, p.style, p.marker);
    }
  }

  const colors = function (method, params) {
    const _colors_minimal = (shades) => {
      // in-app colors
      switch (shades) {
        case 'bootstrap':
          return ['#0d6efd', '#6c757d', '#198754', '#0dcaf0', '#ffc107', '#dc3545', '#f8f9fa', '#212529'];
        case 'other':
          return ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14', '#ffc107', '#198754', '#20c997', '#0dcaf0', '#ffffff', '#6c757d', '#343a40'];
        case 'keen':
          return ['#4B5BA6', '#E4E6EF', '#75CC68', '#FF5D53', '#FFC700', '#7239EA', '#181C32', '#F7F9FD'];
      }
    }
    const _colors_simple = (shades) => {
      // chart.js colors
      // https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
      switch (shades) {
        case 'Tableau10':
          return ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'];
        case 'Traffic9':
          return ['#b60a1c', '#e39802', '#309143', '#e03531', '#f0bd27', '#51b364', '#ff684c', '#ffda66', '#8ace7e'];
        case 'Classic10':
          return ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
        case 'ClassicMedium10':
          return ['#729ece', '#ff9e4a', '#67bf5c', '#ed665d', '#ad8bc9', '#a8786e', '#ed97ca', '#a2a2a2', '#cdcc5d', '#6dccda'];
        case 'SetOne9':
          return ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'];
        case 'SetTwo8':
          return ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'];
        case 'Gray20':
          return ['#d5d5d5', '#cdcecd', '#c5c7c6', '#bcbfbe', '#b4b7b7', '#acb0b1', '#a4a9ab', '#9ca3a4', '#939c9e', '#8b9598', '#848e93', '#7c878d', '#758087', '#6e7a81', '#67737c', '#616c77', '#5b6570', '#555f6a', '#4f5864', '#49525e'];
      }
    }
    const _colors_advance = (shades) => {
      // customised colors
      //
    }

    let p = [];
    for (const colorKey in defaultProfiles.colors[method]) {
      p[colorKey] = params[colorKey] === undefined || params[colorKey].length === 0 ? defaultProfiles.colors[method][colorKey] : params[colorKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _colors_minimal(p.base);

      case plg.apexChart.method.sim:
        return _colors_simple(p.base);

      case plg.apexChart.method.adv:
        return _colors_advance(p.base);
    }
  }

  const grid = function (method, params) {
    const _grid_minimal = (status, color, dash) => {
      return {
        show           : status,
        borderColor    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[color],
        strokeDashArray: dash,
      }
    }

    const _grid_simple = (status, color, dash, position, axis) => {
      return {
        show           : status,
        borderColor    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[color],
        strokeDashArray: dash,
        position       : position,
        xaxis          : {
          lines: {
            show: axis[0],
          }
        },
        yaxis          : {
          lines: {
            show: axis[1],
          }
        },
      }
    }

    const _grid_advance = (status, color, dash, position, axis, padding) => {
      return {
        show           : status,
        borderColor    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[color],
        strokeDashArray: dash,
        position       : 'back',
        xaxis          : {
          lines: {
            show: axis[0]
          }
        },
        yaxis          : {
          lines: {
            show: axis[1]
          }
        },
        row            : {
          colors : undefined,
          opacity: 0.5
        },
        column         : {
          colors : undefined,
          opacity: 0.5
        },
        padding        : {
          top   : padding[0],
          right : padding[1],
          bottom: padding[2],
          left  : padding[3]
        },
      }
    }

    let p = [];
    for (const gridKey in defaultProfiles.grid[method]) {
      p[gridKey] = params[gridKey] === undefined || params[gridKey].length === 0 ? defaultProfiles.grid[method][gridKey] : params[gridKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _grid_minimal(p.status, p.color, p.dash);

      case plg.apexChart.method.sim:
        return _grid_simple(p.status, p.color, p.dash, p.position, p.axis);

      case plg.apexChart.method.adv:
        return _grid_advance(p.status, p.color, p.dash, p.position, p.axis, p.padding);
    }
  }

  const tooltip = function (method, params) {
    const _tooltip_minimal = (status, theme, style) => {
      return {
        enabled        : status[0],
        shared         : status[1],
        followCursor   : status[2],
        intersect      : false,
        inverseOrder   : false,
        fillSeriesColor: status[3],
        theme          : theme,
        style          : {
          fontSize  : style[0] + 'px',
          fontWeight: style[1],
          fontFamily: 'inherit'
        },
        onDatasetHover : {
          highlightDataSeries: status[4],
        },
      }
    }

    const _tooltip_simple = (status, theme, style, x, y) => {
      return {
        enabled        : status[0],
        shared         : status[1],
        followCursor   : status[2],
        intersect      : false,
        inverseOrder   : false,
        fillSeriesColor: status[3],
        theme          : theme,
        style          : {
          fontSize  : style[0] + 'px',
          fontWeight: style[1],
          fontFamily: 'inherit'
        },
        onDatasetHover : {
          highlightDataSeries: status[4],
        },
        x              : {
          show: x[0],
        },
        y              : {
          show     : y[0],
          formatter: function (val) {
            return y[1] + val + y[2];
          },
        },
        marker         : {show: status[5]},
      }
    }

    const _tooltip_advance = (status, theme, style, x, y, fixed) => {
      return {
        enabled        : status[0],
        shared         : status[1],
        followCursor   : status[2],
        intersect      : false,
        inverseOrder   : false,
        fillSeriesColor: status[3],
        theme          : theme,
        style          : {
          fontSize  : style[0] + 'px',
          fontWeight: style[1],
          fontFamily: 'inherit'
        },
        onDatasetHover : {
          highlightDataSeries: status[4],
        },
        x              : {
          show: x[0],
          // format: "DD MMM"
        },
        y              : {
          show     : y[0],
          formatter: function (val) {
            return y[1] + val + y[2];
          },
          title    : {
            formatter: (seriesName) => seriesName,
          },
        },
        marker         : {show: status[5]},
        items          : {display: 'flex',},
        fixed          : {
          enabled : fixed[0],
          position: fixed[1],
          offsetX : fixed[2],
          offsetY : fixed[3],
        },
      }
    }

    // parameter initialized.
    let p = [];
    for (const tooltipKey in defaultProfiles.tooltip[method]) {
      p[tooltipKey] = params[tooltipKey] === undefined || params[tooltipKey].length === 0 ? defaultProfiles.tooltip[method][tooltipKey] : params[tooltipKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _tooltip_minimal(p.status, p.theme, p.style);

      case plg.apexChart.method.sim:
        return _tooltip_simple(p.status, p.theme, p.style, p.x, p.y);

      case plg.apexChart.method.adv:
        return _tooltip_advance(p.status, p.theme, p.style, p.x, p.y, p.fixed);
    }
  }

  const states = function (method, params) {
    // https://apexcharts.com/docs/options/states/
    const _states_minimal = (normal, hover, active) => {
      return {
        normal: {
          filter: {
            type : normal[0],
            value: normal[1]
          }
        },
        hover : {
          filter: {
            type : hover[0],
            value: hover[1]
          }
        },
        active: {
          allowMultipleDataPointsSelection: active[0],
          filter                          : {
            type : active[1],
            value: active[2],
          }
        }
      };
    }
    const _states_simple = (normal, hover, active) => {
      return {
        normal: {
          filter: {
            type : normal[0],
            value: normal[1]
          }
        },
        hover : {
          filter: {
            type : hover[0],
            value: hover[1]
          }
        },
        active: {
          allowMultipleDataPointsSelection: active[0],
          filter                          : {
            type : active[1],
            value: active[2],
          }
        }
      }
    }

    // parameter initialized.
    let p = [];
    for (const statesKey in defaultProfiles.states[method]) {
      p[statesKey] = params[statesKey] === undefined || params[statesKey].length === 0 ? defaultProfiles.states[method][statesKey] : params[statesKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _states_minimal(p.normal, p.hover, p.active);

      case plg.apexChart.method.sim:
        return _states_simple(p.normal, p.hover, p.active);

      case plg.apexChart.method.adv:
        return _states_simple(p.normal, p.hover, p.active);
    }
  }

  const fill = function (method, params) {
    const _fill_minimal = (opacity, type) => {
      return {
        opacity: opacity,
        type   : type,
      };
    }
    const _fill_simple = (opacity, type, color, gradient) => {
      const _type = () => {
        switch (type) {
          case 'gradient':
            return {
              shade           : 'dark',
              type            : "horizontal",
              shadeIntensity  : 0.5,
              gradientToColors: undefined,
              inverseColors   : true,
              opacityFrom     : 1,
              opacityTo       : 1,
              stops           : [0, 50, 100],
              colorStops      : []
            }
          case 'image':
            return {
              src   : [],
              width : undefined,
              height: undefined
            }
          case 'pattern':
            return {
              style      : 'verticalLines',
              width      : 6,
              height     : 6,
              strokeWidth: 2,
            }
        }
      }
      return {
        colors  : colors(color[0], colorShades[color[0]][color[1]]),
        opacity : opacity,
        type    : type,
        gradient: _type(),
        image   : _type(),
        pattern : _type(),
      }
    }
    const _fill_advanced = (opacity, type, color, gradient) => {
      const _type = () => {
        switch (type) {
          case 'gradient':
            return {
              shade           : 'dark',
              type            : "horizontal",
              shadeIntensity  : 0.5,
              gradientToColors: undefined,
              inverseColors   : true,
              opacityFrom     : 1,
              opacityTo       : 1,
              stops           : [0, 50, 100],
              colorStops      : []
            }
          case 'image':
            return {
              src   : [],
              width : undefined,
              height: undefined
            }
          case 'pattern':
            return {
              style      : 'verticalLines',
              width      : 6,
              height     : 6,
              strokeWidth: 2,
            }
        }
      }
      return {
        colors  : [
          function ({
                      value,
                      seriesIndex,
                      w
                    }) {
            if (value < 55) {
              return '#7E36AF'
            }
            else if (value >= 55 && value < 80) {
              return '#164666'
            }
            else {
              return '#D9534F'
            }
          }
        ],
        opacity : opacity,
        type    : type,
        gradient: _type(),
        image   : _type(),
        pattern : _type(),
      }
    }

    let p = [];
    for (const fillKey in defaultProfiles.fill[method]) {
      p[fillKey] = params[fillKey] === undefined || params[fillKey].length === 0 ? defaultProfiles.fill[method][fillKey] : params[fillKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _fill_minimal(p.opacity, p.type);

      case plg.apexChart.method.sim:
        return _fill_simple(p.opacity, p.type, p.color, p.gradient);

      case plg.apexChart.method.adv:
        return _fill_advanced(p.opacity, p.type, p.color, p.gradient);
    }
  }

  const xaxis = function (method, params) {
    // https://apexcharts.com/docs/options/xaxis/
    const _xaxis_minimal = (base, label) => {
      return {
        type         : base.type,
        categories   : [],
        tickAmount   : base.ticks,
        tickPlacement: base.placement,
        axisBorder   : {
          show: false,
        },
        axisTicks    : {
          show: false
        },
        labels       : {
          show : label.status,
          style: {
            colors    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[label.style[2]],
            fontSize  : label.style[0] + 'px',
            fontWeight: label.style[1]
          }
        }
      };
    }

    const _xaxis_simple = () => {
      // TODO: @lokesh *may23.
      console.log('this is not initialized in charts options. switch to advance.')
    }
    const _xaxis_advance = (base, label, title, tooltip) => {
      return {
        type               : base.type, // category datetime numeric
        categories         : [],
        tickAmount         : base.ticks,
        tickPlacement      : base.placement, // [between, on]
        min                : undefined,
        max                : undefined,
        range              : undefined,
        floating           : false,
        decimalsInFloat    : undefined,
        overwriteCategories: undefined,
        position           : base.position,
        labels             : {
          show                 : label.status,
          rotate               : -45,
          rotateAlways         : false,
          hideOverlappingLabels: true,
          showDuplicates       : false,
          trim                 : false,
          minHeight            : undefined,
          maxHeight            : 120,
          style                : {
            colors    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[label.style[2]],
            fontSize  : label.style[0] + 'px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: label.style[1],
            cssClass  : 'apexcharts-xaxis-label',
          },
          offsetX              : 0,
          offsetY              : 0,
          format               : undefined,
          formatter            : undefined,
          datetimeUTC          : true,
          datetimeFormatter    : {
            year : 'yyyy',
            month: "MMM 'yy",
            day  : 'dd MMM',
            hour : 'HH:mm',
          },
        },
        group              : {
          groups: [],
          style : {
            colors    : [],
            fontSize  : '12px',
            fontWeight: 400,
            fontFamily: undefined,
            cssClass  : ''
          }
        },
        axisBorder         : {
          show   : true,
          color  : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[10],
          height : 1,
          width  : '100%',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks          : {
          show      : true,
          borderType: 'solid',
          color     : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[10],
          height    : 6,
          offsetX   : 0,
          offsetY   : 0
        },

        title     : {
          text   : title.text,
          offsetX: title.offset[0],
          offsetY: title.offset[1],
          style  : {
            color     : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[title.style[2]],
            fontSize  : title.style[0] + 'px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: title.style[1],
            cssClass  : 'apexcharts-xaxis-title',
          },
        },
        crosshairs: {
          show      : true,
          width     : 1,
          position  : 'back',
          opacity   : 0.9,
          stroke    : {
            color    : '#b6b6b6',
            width    : 0,
            dashArray: 0,
          },
          fill      : {
            type    : 'solid',
            color   : '#B1B9C4',
            gradient: {
              colorFrom  : '#D8E3F0',
              colorTo    : '#BED1E6',
              stops      : [0, 100],
              opacityFrom: 0.4,
              opacityTo  : 0.5,
            },
          },
          dropShadow: {
            enabled: false,
            top    : 0,
            left   : 0,
            blur   : 1,
            opacity: 0.4,
          },
        },
        tooltip   : {
          enabled  : tooltip.status,
          formatter: undefined,
          offsetY  : tooltip.offset[1],
          style    : {
            fontSize  : tooltip.style[0],
            fontWeight: tooltip.style[1],
            fontFamily: 'inherit',
          },
        },
      }
    }

    // parameter initialized.
    let p = [];
    for (const xaxisKey in defaultProfiles.xaxis[method]) {
      p[xaxisKey] = params[xaxisKey] === undefined || params[xaxisKey].length === 0 ? defaultProfiles.xaxis[method][xaxisKey] : params[xaxisKey];
    }
    // if this throw error then go with object keys loop method.

    switch (method) {
      case plg.apexChart.method.min:
        return _xaxis_minimal(p.base, p.label);

      case plg.apexChart.method.sim:
        return _xaxis_simple();

      case plg.apexChart.method.adv:
        return _xaxis_advance(p.base, p.label, p.title, p.tooltip);
    }
  }

  const yaxis = function (method, params) {
    const _yaxis_minimal = (base) => {
      return {
        show             : base.status,
        showAlways       : true,
        showForNullSeries: true,
        seriesName       : undefined,
        opposite         : base.opposite,
        reversed         : base.reversed,
        tickAmount       : base.ticks,
        min              : undefined,
        max              : undefined,
        forceNiceScale   : base.nice,
        floating         : false,
        decimalsInFloat  : undefined,
      };
    }

    const _yaxis_simple = (base, label, title, tooltip) => {
      return {
        show             : base.status,
        showAlways       : true,
        showForNullSeries: true,
        seriesName       : undefined,
        opposite         : base.opposite,
        reversed         : base.reversed,
        logarithmic      : false,
        logBase          : 10,
        tickAmount       : base.ticks,
        min              : undefined,
        max              : undefined,
        forceNiceScale   : base.nice,
        floating         : false,
        decimalsInFloat  : undefined,
        labels           : {
          show     : label.status,
          align    : 'right',
          minWidth : undefined,
          maxWidth : undefined,
          style    : {
            colors    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[label.style[2]],
            fontSize  : label.style[0] + 'px',
            fontFamily: 'inherit',
            fontWeight: label.style[1],
            cssClass  : 'apexcharts-yaxis-label',
          },
          offsetX  : label.offset[0],
          offsetY  : label.offset[1],
          rotate   : label.offset[2],
          formatter: (value) => { return label.format[0] + value + label.format[1] },
        },
        axisBorder       : {
          show   : true,
          color  : '#78909C',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks        : {
          show      : true,
          borderType: 'solid',
          color     : '#78909C',
          width     : 6,
          offsetX   : 0,
          offsetY   : 0
        },
        title            : {
          text   : title.text,
          offsetX: title.offset[0],
          offsetY: title.offset[1],
          rotate : title.offset[2],
          style  : {
            color     : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[title.style[2]],
            fontSize  : title.style[0] + 'px',
            fontFamily: 'inherit',
            fontWeight: title.style[1],
            cssClass  : 'apexcharts-yaxis-title',
          },
        },
        crosshairs       : {
          show    : true,
          width   : 1,
          position: 'back',
          opacity : 0.5,
          stroke  : {
            color    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[0],
            width    : 1,
            dashArray: 5,
          },
        },
        tooltip          : {
          enabled  : tooltip.status,
          formatter: undefined,
          offsetX  : tooltip.offset[0],
          style    : {
            fontSize  : tooltip.style[0] + 'px',
            fontFamily: 'inherit',
          },
        },
      }
    }
    const _yaxis_advance = (base, label, title, tooltip) => {
      // todo: @lokesh, *may23.
      return _yaxis_simple(base, label, title, tooltip);
    }

    let p = [];
    for (const yaxisKey in defaultProfiles.yaxis[method]) {
      p[yaxisKey] = params[yaxisKey] === undefined || params[yaxisKey].length === 0 ? defaultProfiles.yaxis[method][yaxisKey] : params[yaxisKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _yaxis_minimal(p.base);

      case plg.apexChart.method.sim:
        return _yaxis_simple(p.base, p.label, p.title, p.tooltip);

      case plg.apexChart.method.adv:
        return _yaxis_advance(p.base, p.label, p.title, p.tooltip);
    }
  }

  const strock = function (method, params) {
    const _strock_basic = (show, width) => {
      return {
        show  : show,
        width : width,
        colors: ['transparent'],
      };
    }
    const _strock_simple = (show, width, curve) => {
      return {
        show  : show,
        width : width,
        curve : curve,
        colors: ['transparent'],
      }
    }
    const _strock_advance = (show, width, curve, cap, dash) => {
      return {
        show     : show,
        width    : width,
        curve    : curve,
        colors   : undefined,
        lineCap  : cap,
        dashArray: dash,
      }
    }

    let p = [];
    for (const strockKey in defaultProfiles.strock[method]) {
      p[strockKey] = params[strockKey] === undefined || params[strockKey].length === 0 ? defaultProfiles.strock[method][strockKey] : params[strockKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _strock_basic(p.show, p.width);

      case plg.apexChart.method.sim:
        return _strock_simple(p.show, p.width, p.curve);

      case plg.apexChart.method.adv:
        return _strock_advance(p.show, p.width, p.curve, p.cap, p.dash);
    }
  }

  const dataLabels = function (method, params) {
    const _dataLabels_minimal = (status) => {
      return {
        enabled: status
      };
    }
    const _dataLabels_simple = (status, format, offset) => {
      return {
        enabled        : status,
        enabledOnSeries: undefined,
        formatter      : function (val, opts) {
          return format[0] + val + format[1];
        },
        textAnchor     : offset[2],
        distributed    : false,
        offsetX        : offset[0],
        offsetY        : offset[1],
      };
    }
    const _dataLabels_advance = (status, format, offset, style) => {
      return {
        enabled        : status,
        enabledOnSeries: undefined,
        formatter      : function (val, opts) {
          return format[0] + val + format[1];
        },
        textAnchor     : offset[2],
        distributed    : false,
        offsetX        : offset[0],
        offsetY        : offset[1],
        style          : {
          fontSize  : style[0] + 'px',
          fontFamily: 'inherit',
          fontWeight: style[1],
          colors    : colors(plg.apexChart.method.sim, {base: colorShades.simple.gray})[style[2]]
        },
        background     : {
          enabled     : true,
          foreColor   : '#fff',
          padding     : 4,
          borderRadius: 2,
          borderWidth : 1,
          borderColor : '#fff',
          opacity     : 0.9,
          dropShadow  : {
            enabled: false,
            top    : 1,
            left   : 1,
            blur   : 1,
            color  : '#000',
            opacity: 0.45
          }
        },
        dropShadow     : {
          enabled: false,
          top    : 1,
          left   : 1,
          blur   : 1,
          color  : '#000',
          opacity: 0.45
        }
      };
    }

    let p = [];
    for (const dLKey in defaultProfiles.dataLabels[method]) {
      p[dLKey] = params[dLKey] === undefined || params[dLKey].length === 0 ? defaultProfiles.dataLabels[method][dLKey] : params[dLKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _dataLabels_minimal(p.status);

      case plg.apexChart.method.sim:
        return _dataLabels_simple(p.status, p.format, p.offset);

      case plg.apexChart.method.adv:
        return _dataLabels_advance(p.status, p.format, p.offset, p.style);
    }
  }

  const plotOptions = function (method, params) {
    const _plotOptions_minimal = (radius) => {
      return {
        bar: {
          borderRadius: [radius, radius]
        }
      };
    }
    const _plotOptions_simple = (radius, height, width) => {
      return {
        bar: {
          //horizontal: false,
          columnWidth : width + "%",
          barHeight   : height + "%",
          borderRadius: [radius, radius]
        }
      };
    }
    const _plotOptions_advance = (radius, height, width) => {
      return {
        bar: {
          //horizontal: false,
          columnWidth : width + "%",
          barHeight   : height + "%",
          borderRadius: [radius, radius]
        }
      }
    }

    let p = [];
    for (const dLKey in defaultProfiles.plotOptions[method]) {
      p[dLKey] = params[dLKey] === undefined || params[dLKey].length === 0 ? defaultProfiles.plotOptions[method][dLKey] : params[dLKey];
    }

    switch (method) {
      case plg.apexChart.method.min:
        return _plotOptions_minimal(p.radius);

      case plg.apexChart.method.sim:
        return _plotOptions_simple(p.radius, p.height, p.width);

      case plg.apexChart.method.adv:
        return _plotOptions_advance(p.radius, p.height, p.width);
    }
  }


  const create_dateset = (data) => {
    let option = {};

    // series
    option['series'] = data.dataset;
    // labels
    option['labels'] = data.labels;

    return option;
  }

  const building_options = (optionData, path, myTag) => {
    // console.log(path, myTag);
    console.log(optionData, path, myTag);
    $chart = new chartsProfile();
    $chart.profileGenerate(path, myTag);

    const profile = $chart.chartProfile;
    const method = $chart.chartMethods;

    // console.log(profile);
    // console.log(method);

    for (const cOptionKey in chartOptions) {
      optionData[cOptionKey] = creating_options(
        cOptionKey,
        method[cOptionKey] ?? defaultMethods[cOptionKey],
        profile[cOptionKey] ?? defaultProfiles[cOptionKey]);
    }

    return optionData;
  }

  const creating_options = (option, method = plg.apexChart.method.min, params = []) => {
    /*
     Object.keys(chartOptions).forEach((key, value) => {
     if (key === option) targetCalling(value, method, params);
     })
     */
    return targetCalling(chartOptions[option], method, params);
  }

  const targetCalling = (option, method, params) => {
    switch (option) {
      case 0:
        return chart(method, params);
      case 1:
        return legend(method, params);
      case 2:
        return colors(method, params);
      case 3:
        return grid(method, params);
      case 4:
        return tooltip(method, params);
      case 5:
        return states(method, params);
      case 6:
        return fill(method, params);
      case 7:
        return xaxis(method, params);
      case 8:
        return yaxis(method, params);
      case 9:
        return strock(method, params);
      case 10:
        return dataLabels(method, params);
      case 11:
        return plotOptions(method, params);
    }
  }

  const initProfile = () => {
    // $chart = new chartsProfile();
  }

  // Public methods
  return {
    /**
     * it takes raw data and returns data in options as series and labels.
     * @param data
     * @returns {{}}
     */
    createDataset: function (data) {
      return create_dateset(data);
    },

    /**
     * It takes running options with method and custom profile
     * build full options object for apexCharts.
     * @returns
     * @param path array of the page.
     * @param options JSON object with data series.
     * @param tag
     */
    buildingOptions: function (options, path, tag) {
      return building_options(options, path, tag);
    },

    /**
     * It helps to take shared variables into page target file.
     * @param key string [options, default, color]
     * @returns
     * @constructor
     */
    getProperty: function (key) {
      switch (key) {
        case 'options':
          return chartOptions;

        case 'default':
          return defaultProfiles;

        case 'color':
          return colorShades;
      }
    },

    /**
     * init the profile function
     */
    initChartOptions: function () {
      initProfile();
    }
  };
};

const Option_charts = fun();
export default Option_charts;
