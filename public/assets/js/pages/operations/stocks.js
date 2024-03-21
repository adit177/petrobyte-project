import * as PB_OS_transfer from "./stocks/transfer.js";
import * as PB_OS_incoming from "./stocks/incoming.js";
import * as PB_OS_movement from "./stocks/movement.js";
import * as PB_OS_inspection from "./shifts/process.js";
import pb from "../../base/structure.js";
import {eTypes, wlEvent} from "../../base/events.js";
import {get_thePathArr, get_layoutName} from "../../base/global.js";
import {OST_Requests} from "./stocks/transfer.js";

/**
 * This support all layouts routing.
 * @param _event
 */
  //const actionRoute = function (_event) {
  //  // fetching required page data
  //  const thePathArr = get_thePathArr();
  //  if (wlEvent[get_layoutName()].indexOf(_event.type) === -1) {
  //    alert('Event is not whitelisted.');
  //  }
  //
  //  switch (_event.type) {
  //
  //    case eTypes.form:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_forms(_event);
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_forms(_event);
  //
  //        case pb.opr.stocks.movement.n:
  //          return PB_OS_movement.OSM_forms(_event);
  //
  //        case pb.opr.stocks.inspection.n:
  //          return PB_OS_inspection.OSP_forms(_event);
  //
  //      }
  //      break;
  //
  //    case eTypes.load:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_loads(_event);
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_loads(_event);
  //
  //        case pb.opr.stocks.movement.n:
  //          return PB_OS_movement.OSM_loads(_event);
  //
  //        case pb.opr.stocks.inspection.n:
  //          return PB_OS_inspection.OSP_loads(_event);
  //
  //      }
  //      break;
  //
  //    case eTypes.table:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_tables(_event);
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_tables(_event);
  //
  //        case pb.opr.stocks.movement.n:
  //          return PB_OS_movement.OSM_tables(_event);
  //
  //        case pb.opr.stocks.inspection.n:
  //          return PB_OS_inspection.OSP_tables(_event);
  //
  //      }
  //      break;
  //
  //    case eTypes.card:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_cards(_event);
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_cards(_event);
  //
  //        case pb.opr.stocks.movement.n:
  //          return PB_OS_movement.OSM_cards(_event);
  //
  //        case pb.opr.stocks.inspection.n:
  //          return PB_OS_inspection.OSP_cards(_event);
  //
  //      }
  //      break;
  //
  //    case eTypes.action:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_actions(_event);
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_actions(_event);
  //
  //        case pb.opr.stocks.movement.n:
  //          return PB_OS_movement.OSM_actions(_event);
  //
  //        case pb.opr.stocks.inspection.n:
  //          return PB_OS_inspection.OSP_actions(_event);
  //
  //      }
  //      break;
  //    case eTypes.calculate:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_calculate(_event);
  //      }
  //      break;
  //    case eTypes.change:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_change(_event);
  //        case pb.opr.stocks.transfer.n:
  //          return PB_OS_transfer.OST_change(_event);
  //      }
  //      break;
  //    case eTypes.amend:
  //      switch (thePathArr[2]) {
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_amend(_event);
  //
  //      }
  //      break;
  //    case eTypes.modal:
  //      switch (thePathArr[2]) {
  //
  //
  //        case pb.opr.stocks.incoming.n:
  //          return PB_OS_incoming.OSI_modals(_event);
  //
  //
  //      }
  //      break;
  //    default:
  //      alert('event :' + _event.type + ' received, that has not initiated.');
  //  }
  //}


const stockRoute = function (data, type) {
  const thePathArr = get_thePathArr();
    switch (thePathArr[2]) {
      case pb.opr.stocks.transfer.n:
        return PB_OS_transfer.OST_Requests(data, type);

      case pb.opr.stocks.incoming.n:
        return PB_OS_incoming.OSI_Requests(data, type);

    case pb.opr.stocks.movement.n:
      return PB_OS_movement.OSM_pageOpen(data);

    case pb.opr.stocks.inspection.n:
      return PB_OS_inspection.OSP_pageOpen(data);

    // and so on
  }
}

// Public methods
//export const actionRouting = function (_event) {
//  return actionRoute(_event);
//};

export const stockRouting = function (data, type) {
  console.log("baseState of stocks.js");
  return stockRoute(data, type);
};

