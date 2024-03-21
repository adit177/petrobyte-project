import {get_thePathArr}   from "../../base/global.js";
import pb                 from "../../base/structure.js";
import {eTypes}           from "../../base/events.js"
import * as PB_MD_files   from "./drive/files.js";
import * as PB_MD_folders from "./drive/folders.js";
import * as PB_MD_setting from "./drive/setting.js";


// Shared variables

// Private functions

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  // fetching required page data

  switch (event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.mng.drive.files.n:
          return PB_MD_files.MDF_actions(event);

        case pb.mng.drive.folders.n:
          return PB_MD_folders.MDFD_actions(event);

        case pb.mng.drive.setting.n:
          return PB_MD_setting.MDS_actions(event);


      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.mng.drive.files.n:
          return PB_MD_files.MDF_cards(event);

        case pb.mng.drive.folders.n:
          return PB_MD_folders.MDFD_cards(event);

        case pb.mng.drive.setting.n:
          return PB_MD_setting.MDS_cards(event);

      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.mng.drive.files.n:
      return PB_MD_files.MDF_pageOpen();

    case pb.mng.drive.folders.n:
      return PB_MD_folders.MDFD_pageOpen();

    case pb.mng.drive.setting.n:
      return PB_MD_setting.MDS_pageOpen();
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
