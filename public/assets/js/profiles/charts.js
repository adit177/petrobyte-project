import {exT, plg, otR, CLS, sD, rdR, kws, deF, Lyt, glob, STYLE} from "../../js/base/const.js";
import pb from "../base/structure.js";

class chartsProfile {

  // define properties
  chartProfile;
  chartMethods;
  #chartTypes = {
    line       : 'line',
    area       : 'area',
    bar        : 'bar',
    pie        : 'pie',
    radar      : 'radar',
    histogram  : 'histogram',
    donut      : 'donut',
    radialBar  : 'radialBar',
    scatter    : 'scatter',
    bubble     : 'bubble',
    heatmap    : 'heatmap',
    candlestick: 'candlestick'
  };
  #methods = plg.apexChart.method;

  constructor() {

  }

  // after properties.


  // methods.
  #dashboards_charts_business = (chart) => {
    const myRoot = pb.dsb.charts.business.p;

    switch (chart) {
      case myRoot.sales:
        this.chartProfile = {
          chart  : {
            type  : this.#chartTypes.area,
            height: 400,
          },
          color  : {base: 'Classic10'},
          tooltip: {
            style: ['light', 10]
          }
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;

      case myRoot.working:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min
        };
        break;

      case myRoot.heads:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.pie,
            height: 500
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };

        break;
    }
  }
  #dashboards_charts_customers = (chart) => {
    const myRoot = pb.dsb.charts.customer.p;
    switch (chart) {

      case myRoot.volume:
        this.chartProfile = {
          chart  : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend : {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color  : {base: 'Classic10'},
          tooltip: {
            style: ['light', 10]
          }
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };
        break;

      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };
        break;

    }


  }
  #dashboards_charts_profit = (chart) => {
    const myRoot = pb.dsb.charts.profit.p;
    switch (chart) {
      case myRoot.trade:
        this.chartProfile = {
          chart  : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend : {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color  : {base: 'Classic10'},
          tooltip: {
            style: ['light', 10]
          }
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };
        break;

      case myRoot.gross:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 500
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };
        break;
      case myRoot.item:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.pie,
            height: 500
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        };
        break;


    }
  }

  #dashboards_charts_stock = (chart) => {
    const myRoot = pb.dsb.charts.stock.p;
    switch (chart) {
      case myRoot.trade:
        this.chartProfile = {
          chart  : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend : {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color  : {base: 'Classic10'},
          tooltip: {
            style: ['light', 10]
          }
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;

      case myRoot.stock:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'},
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;

      case myRoot.sales:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'},
        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;

    }
  }


  #management_accounts_contacts = (chart) => {
    const myGraphPath = pb.mng.accounts.contacts.g;

    switch (chart) {
      case myGraphPath.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myGraphPath.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_vendors = (chart) => {
    const myRoot = pb.mng.accounts.vendors.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_banks = (chart) => {
    const myRoot = pb.mng.accounts.banks.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_suppliers = (chart) => {
    const myRoot = pb.mng.accounts.suppliers.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_expenses = (chart) => {
    const myRoot = pb.mng.accounts.expenses.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_ledgers = (chart) => {
    const myRoot = pb.mng.accounts.ledgers.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_gateways = (chart) => {
    const myRoot = pb.mng.accounts.gateways.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_accounts_loans = (chart) => {
    const myRoot = pb.mng.accounts.loans.c.chart;

    switch (chart) {
      case myRoot.balance:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }

  }

  #management_customers_detail = (chart) => {
    console.log(chart)
    const myRoot = pb.mng.customers.detail;
    switch (chart) {
      case myRoot.g.year_sale_a:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min
        };
        break;
      case myRoot.g.year_sale_b:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400,
            stack : true,
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'}
          ,
          tooltip    : {
            style: ['light', 10]
          },
          plotOptions: {
            radius: 20,
          }
        }
        this.chartMethods = {
          chart      : this.#methods.sim,
          legend     : this.#methods.min,
          colors     : this.#methods.sim,
          grid       : this.#methods.adv,
          tooltip    : this.#methods.sim,
          states     : this.#methods.min,
          fill       : this.#methods.min,
          xaxis      : this.#methods.adv,
          yaxis      : this.#methods.min,
          strock     : this.#methods.min,
          dataLabels : this.#methods.min,
          plotOptions: this.#methods.sim,
        }
        break;
      case myRoot.g.year_sale_c:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400,
            stack : true,
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'}
          ,
          tooltip    : {
            style: ['light', 10]
          },
          plotOptions: {
            radius: 20,
          }
        }
        this.chartMethods = {
          chart      : this.#methods.sim,
          legend     : this.#methods.min,
          colors     : this.#methods.sim,
          grid       : this.#methods.adv,
          tooltip    : this.#methods.sim,
          states     : this.#methods.min,
          fill       : this.#methods.min,
          xaxis      : this.#methods.adv,
          yaxis      : this.#methods.min,
          strock     : this.#methods.min,
          dataLabels : this.#methods.min,
          plotOptions: this.#methods.sim,
        }
        break;
    }
  }
  #management_products_detail = (chart) => {
    console.log(chart)
    const myRoot = pb.mng.products.detail;
    switch (chart) {
      case myRoot.g.year_sale_a:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}

        };
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min
        };
        break;

    }
  }
  #reports_accounts_register = (chart) => {
    const myRoot = pb.rpt.accounts.register.c.chart;

    switch (chart) {
      case myRoot.debited:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.pie,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.credited:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.pie,
            height: 400
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.balance:
        this.chartProfile = {
          chart  : {
            type  : this.#chartTypes.area,
            height: 400
          },
          legend : {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color  : {base: 'Classic10'},
          tooltip: {
            style: ['light', 10]
          }
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
      case myRoot.transaction:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.bar,
            height: 400,
            stack : true,
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '18'
          },
          color : {base: 'Classic10'}
          ,
          tooltip    : {
            style: ['light', 10]
          },
          plotOptions: {
            radius: 20,
          }
        }
        this.chartMethods = {
          chart      : this.#methods.sim,
          legend     : this.#methods.min,
          colors     : this.#methods.sim,
          grid       : this.#methods.adv,
          tooltip    : this.#methods.sim,
          states     : this.#methods.min,
          fill       : this.#methods.min,
          xaxis      : this.#methods.adv,
          yaxis      : this.#methods.min,
          strock     : this.#methods.min,
          dataLabels : this.#methods.min,
          plotOptions: this.#methods.sim,
        }
        break;
    }
  }

  #dashboards_statistics_customers = (chart) => {
    const myRoot = pb.dsb.statistics.customers.g;

    switch (chart) {
      case myRoot.month:
      case myRoot.quarter:
      case myRoot.year:
        this.chartProfile = {
          chart : {
            type  : this.#chartTypes.area,
            height: 200
          },
          legend: {
            position: 'bottom',
            align   : 'center',
            size    : '16'
          },
          color : {base: 'Classic10'}
        }
        this.chartMethods = {
          chart     : this.#methods.sim,
          legend    : this.#methods.min,
          colors    : this.#methods.sim,
          grid      : this.#methods.adv,
          tooltip   : this.#methods.sim,
          states    : this.#methods.min,
          fill      : this.#methods.min,
          xaxis     : this.#methods.adv,
          yaxis     : this.#methods.min,
          strock    : this.#methods.min,
          dataLabels: this.#methods.min,
        }
        break;
    }
  }
  profileGenerate = (path, tag) => {
    const propName = path.join('_');

    switch (propName) {
      case 'dashboards_charts_business':
        this.#dashboards_charts_business(tag);
        break;
      case 'dashboards_charts_customers':
        this.#dashboards_charts_customers(tag);
        break;
      case 'dashboards_charts_profit':
        this.#dashboards_charts_profit(tag);
        break;
      case 'dashboards_charts_stock':
        this.#dashboards_charts_stock(tag);
        break;
      case 'dashboards_statistics_customers':
        this.#dashboards_statistics_customers(tag);
        break
      // Management
      case 'management_accounts_contacts':
        this.#management_accounts_contacts(tag);
        break;
      case 'management_accounts_vendors':
        this.#management_accounts_vendors(tag);
        break;
      case 'management_accounts_banks':
        this.#management_accounts_banks(tag);
        break;
      case 'management_accounts_suppliers':
        this.#management_accounts_suppliers(tag);
        break;
      case 'management_accounts_expenses':
        this.#management_accounts_expenses(tag);
        break;
      case  'management_accounts_ledgers':
        this.#management_accounts_ledgers(tag);
        break;
      case 'management_accounts_gateways':
        this.#management_accounts_gateways(tag);
        break;
      case 'management_accounts_loans':
        this.#management_accounts_loans(tag);
        break;
      case 'management_customers_detail':
        this.#management_customers_detail(tag);
        break;
      case 'management_products_detail':
        this.#management_products_detail(tag);
      case 'reports_accounts_register':
        this.#reports_accounts_register(tag);
        break;
    }
  }
}

export default chartsProfile;