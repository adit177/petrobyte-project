import {$R_common_obj} from './render.js';
import plugins from "../plugins/plugins.js";
import {kws} from "./const.js";
import Holding from "./holding.js";

//let $session = new Session();

export function init_plugin_on_pageLoad() {
  // date picker
  plugins.datePicker.$_init();
  // range picker
  plugins.rangePicker.$_init();
  // tagify
  plugins.tagifyInput.$_init();
}

// automatically call plugins on DOM
export function exe_plugin_on_pageLoad() {

  // sweetalert
  plugins.sweetAlert.$_page();
  // form repeater
  plugins.formRepeater.$_page();
  // form combo
  plugins.formCombo.$_page();
  // tagify
  plugins.tagifyInput.$_page();
  // apex chart
  plugins.apexChart.$_page();
  // data table
  plugins.dataTables.$_page();
  // form keen
  plugins.formKeen.$_page();
  //form valid
  plugins.formValid.$_page();
  // input mask
  plugins.inputMask.$_page();
  // select picker
  plugins.selectPicker.$_page();
  // date picker
  plugins.datePicker.$_page();
  // range picker
  plugins.rangePicker.$_page();
}

export function exe_plugin_on_layout(layout, zone, plugin = true) {
  const element = Holding.Target(layout, zone);
  // exe_plugins_on_manualCall(element, {}, plugin);
}

// manually initiate plugins
export function exe_plugins_on_manualCall(element, params = {}, which = undefined) {
  switch (which) {

    case false: // all working plugins.
      alert("action: change plugin call false to true");
      break;

    case true:
      plugins.selectPicker.$_manual(element, false);
      plugins.datePicker.$_manual(element, false);
      plugins.rangePicker.$_manual(element);
      plugins.tagifyInput.$_manual(element);
      plugins.inputMask.$_manual(element);
      plugins.formValid.$_manual(element);
      break;

    // all required calls for form repeater
    case kws.plugins_on_call.repeatForm:
      plugins.selectPicker.$_manual(element, params.control);
      plugins.datePicker.$_manual(element, params.control);
      plugins.rangePicker.$_manual(element);
      plugins.tagifyInput.$_manual(element);
      plugins.inputMask.$_manual(element);
      plugins.formValid.$_changes(element, params.form_sno);
      // plg_formKeen.$_manual(element, params.formKeen);
      break;

    case kws.plugins_on_call.basicForm:
      console.log(params);
      plugins.selectPicker.$_manual(element, params.control ?? false);
      plugins.datePicker.$_manual(element, params.control ?? false);
      plugins.rangePicker.$_manual(element, params.control ?? false);
      plugins.tagifyInput.$_manual(element, params.control ?? false);
      plugins.inputMask.$_manual(element, params.control ?? false);
      plugins.formValid.$_manual(element, params.control ?? false);
      // plg_formKeen.$_manual(element, params.formKeen);
      break;
    // now individual plugins
    case kws.plugins_on_call.formCombo:
      plugins.formCombo.$_manual(element);
      break;
    case kws.plugins_on_call.formRepeater:
      plugins.formValid.$_manual(element, kws.plugin.repeater);
      plugins.formRepeater.$_manual(element);
      break;
    case kws.plugins_on_call.tagifyInput:
      plugins.tagifyInput.$_manual(element);
      break;
    case kws.plugins_on_call.apexChart:
      // todo--skip, add params as required.
      plugins.apexChart.$_manual(element);
      break;
    case kws.plugins_on_call.dataTables:
      plugins.dataTables.$_manual(element);
      break;

    case kws.plugins_on_call.datePicker:
      plugins.datePicker.$_manual(element);
      break;

    case kws.plugins_on_call.rangePicker:
      plugins.rangePicker.$_manual(element);
      break;

    case kws.plugins_on_call.formKeen:
      plugins.formKeen.$_manual(element, [], params);
      break;

    case kws.plugins_on_call.formValidation:
      plugins.formValid.$_manual(element);
      break;

    case kws.plugins_on_call.inputMask:
      plugins.inputMask.$_manual(element);
      break;

    case kws.plugins_on_call.selectPicker:
      plugins.selectPicker.$_manual(element, false);
      break;


    default:
      alert('ACTION: No plugin found for ' + which);
      break;
  }
}


// automatically call render class on DOM
export function render_on_pageLoad() {
  //  render functions.
  $R_common_obj.$_page();
}