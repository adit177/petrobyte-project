// Shared variables

// Private functions

import {eTypes}          from "../../base/events.js";
import pb                from "../../base/structure.js";
import * as PB_TV_form_a from "./vatreturn/form-a.js";
import * as PB_TV_form_b from "./vatreturn/form-b.js";

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
        case pb.tax.vatreturn.form_a.n:
          return PB_TV_form_a.TVA_actions(event);

        case pb.tax.vatreturn.form_b.n:
          return PB_TV_form_b.TVB_actions(event);


      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.tax.vatreturn.form_a.n:
          return PB_TV_form_a.TVA_cards(event);

        case pb.tax.vatreturn.form_b.n:
          return PB_TV_form_b.TVB_cards(event);
      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.tax.vatreturn.form_a.n:
      return PB_TV_form_a.TVA_pageOpen();

    case pb.tax.vatreturn.form_b.n:
      return PB_TV_form_b.TVB_pageOpen();
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
