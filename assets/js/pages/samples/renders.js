import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_SR_table from "./renders/tables.js";
import * as PB_SR_menu from "./renders/menus.js";
import * as PB_SR_commons from "./renders/commons.js";
import * as PB_SR_forms from "./renders/forms.js";

const renderRoute = function (data, type) {

  switch (get_thePathArr()[2]) {
    case pb.sam.renders.tables.n:
      return PB_SR_table.SRT_Requests(data, type);

    case pb.sam.renders.menus.n:
      return PB_SR_menu.SRM_Requests(data, type);

    case pb.sam.renders.commons.n:
      return PB_SR_commons.SRC_Requests(data, type);

    case pb.sam.renders.forms.n:
      return PB_SR_forms.SRF_Requests(data, type);

  }
}


export const rendersRouting = function (data, type) {
  return renderRoute(data, type);
};