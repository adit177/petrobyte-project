import * as PB__management from "../heads/management.js";
import * as PB__dashboards from "../heads/dashboards.js";
import * as PB__operations from "../heads/operations.js";
import * as PB__reports from "../heads/reports.js";
import * as PB__financials from "../heads/financials.js";
import * as PB__taxation from "../heads/taxation.js";
import * as PB__communication from "../heads/communication.js";
import * as PB__setting from "../heads/setting.js";
import * as PB__sample from "../heads/sample.js";
import {get_thePathArr} from "./global.js";
import pb from "./structure.js";
import {keys} from "./const.js";

let fun = function () {


  const _request_routing = (data, type) => {
    // get detail
    const thePathArr = get_thePathArr();

    // route function
    const appRouting = function (head) {
      switch (head) {
        case pb.dsb.n:
          return PB__dashboards.dashboardRouting(data, type);

        case pb.opr.n:
          return PB__operations.operationsRouting(data, type);

        case pb.mng.n:
          return PB__management.managementRouting(data, type);

        case pb.rpt.n:
          return PB__reports.reportsRouting(data, type);

        case pb.fin.n:
          return PB__financials.pageStateRouting(data, type);

        case pb.tax.n:
          return PB__taxation.pageStateRouting(data, type);

        case pb.com.n:
          return PB__communication.pageStateRouting(data, type);

        case pb.set.n:
          return PB__setting.pageStateRouting(data, type);

        case pb.sam.n:
          return PB__sample.sampleRouting(data, type);
      }
    }

    try {
      return appRouting(thePathArr[0]);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally page open executed.');
    }
  }

  return {
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Open: function (data) {
      return _request_routing(data, keys.event.nature.open);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Clear: function (data) {
      return _request_routing(data, keys.event.nature.clear);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Forward: function (data) {
      return _request_routing(data, keys.event.nature.forward);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Back: function (data) {
      return _request_routing(data, keys.event.nature.back);
    },
    /**
     * it collects the user event and delivers it to the final page.
     * an object with keys of {'type', 'data', 'value', 'place'}
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Get: function (data) {
      return _request_routing(data, keys.event.nature.get);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Post: function (data) {
      return _request_routing(data, keys.event.nature.post);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Option: function (data) {
      return _request_routing(data, keys.event.nature.option);
    },
    /**
     *
     * @param data
     * @returns {*}
     * @constructor
     */
    Redirect: function (data) {
      return _request_routing(data, keys.event.nature.redirect);
    },
  }
};

const Routing = fun();
export default Routing;
