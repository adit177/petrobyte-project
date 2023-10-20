import OptionForms from "../options/forms.js";
import {atr} from "../base/attributes.js";
import {glob, kws, rdR} from "../base/const.js";
import {exe_plugins_on_manualCall} from "../base/plugins.js";
import tagifyInput from "../plugins/tagifyInput.js";

class RenderForms extends OptionForms {
  constructor() {
    super();
  }
// console.log("forms.js");
  /*
   TODO: @forFinish.
   [] 1. dates
   [] 2. <optgroup> in selects.

   */

  // ---------------  private functions  --------------- //

  other_functions() {
    const filter_data_for_options = (data, unwanted) => {
      // cash.
      let k;
      let newData = {};
      Object.assign(newData, data)
      // changes in the data

      // remove unwanted keys.
      Object.entries(newData).forEach(([key, val]) => {
        if (key === '-1' || key === '0') {
          delete newData[key];
        }
        else {
          k = key;
        }
      });
      return [newData, k];
    }

    const unit_control = (element) => {
      const dom_control = element.getAttribute(atr.dom.control);
      const man_control = element.getAttribute(atr.core.control);

      return dom_control !== null || man_control !== null;
    }
  }

  fetchKeys = (dataset, type) => {

    switch (type.box) {
      case kws.labels.array:

        return type.data === kws.labels.object
          ? Object.keys(dataset[Object.keys(dataset)[0]])
          : dataset.keys();


      case kws.labels.object:
        return type.data === kws.labels.array
          ? Object.keys(dataset[Object.keys(dataset)[0]])
          : Object.keys(dataset[Object.keys(dataset)[0]]);
    }
  }

  __getName = (ele) => {
    return ele.hasAttribute(atr.core.source) ? ele.getAttribute(atr.core.source) : ele.name;
  }

  // select option building
  #select_option_building_loop(dataset, names, methods) {

    let keys;
    let _return = [];
    // loop names
    names.forEach((name, index) => {

      const boxType = Array.isArray(dataset[name])
        ? kws.labels.array
        : kws.labels.object;

      let dataType;
      if (boxType === "array") {
        dataType = typeof dataset[name][0];
      }
      else {
        dataType = Array.isArray(dataset[name][Object.keys(dataset[name])[0]])
          ? kws.labels.array
          : kws.labels.object;
      }
      // get keys of data
      keys = this.fetchKeys(dataset[name], {
        data: dataType,
        box : boxType
      }, kws.labels.dual);

      // build options
      _return[name] = super.select_option_building(methods[index], dataset[name], keys);
    });
    return _return;
  }

  #select_option_building_single(data, name, method) {
    let _return = [];
    // get keys.
    const type = {
      data: Array.isArray(data[Object.keys(data)[0]])
        ? kws.labels.array
        : kws.labels.object,
      box : Array.isArray(data) ? kws.labels.array : kws.labels.object
    }
    let keys = this.fetchKeys(data, type);
    // build options.
    _return[name] = super.select_option_building(method, data, keys);
    return _return;
  }

  #global(dataset, element, method) {

    let _return = false;
    // switching between methods
    switch (method) {

      //single element render
      case rdR.form.method.single:
        return this.#_single(dataset, element);

      // simple form
      case rdR.form.method.simple:
        return this.#form(dataset, element);

      // repeater form
      case rdR.form.method.repeater:
        // general data render for a form.
        _return = this.#form(dataset, element);

        // Plugins initiate to loaded data
        exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.formRepeater);
        return _return;

      case rdR.form.method.advance:
        // general data render for the form.
        _return = this.#form(dataset, element);

        // Plugins initiate to loaded data
        exe_plugins_on_manualCall(element, {control: kws.plugin.combo}, kws.plugins_on_call.basicForm);
        return _return;

      case rdR.form.method.selectOnly:
        // data render into selects
        _return = this.#_select(dataset, element);
        // init plugins -> [selectPicker]
        exe_plugins_on_manualCall(element, [], kws.plugins_on_call.selectPicker);
        return _return;

      case rdR.form.method.tagifyOnly:
        // data render into tagify inputs
        _return = this.#_tagify(dataset, element);
        // init the plugins -> [tagifyInput]
        exe_plugins_on_manualCall(element, [], kws.plugins_on_call.tagifyInput);
        return _return;
    }
    return true;
  }

  // render simple element inside form
  #_single(dataset, element) {

    // get the name of the element
    const control = element.getAttribute(atr.core.control);

    // Plugins initiate to loaded data
    exe_plugins_on_manualCall(element, [], control);

    // switch between the control types
    switch (control) {
      case kws.plugin.sel:
        return this.#_select(dataset, element);
      case kws.plugin.tag:
        return this.#_tagify(dataset, element);
    }
  }

  // all type of possible inputs in form
  #_select(dataset, element) {
    // variables.
    let redData, method, tack;
    // get all selectInputs.
    const selects = element.tagName === "SELECT"
      ? [element]
      : element.querySelectorAll(`select[${atr.core.control}="${kws.plugin.sel}"]`);

    // todo: select:not([data-pb-ignore])

    console.log('select founds for the render', selects.length);


    // skip the case of single select.
    const __skipped = (name) => {
      if (name !== '') {
        console.log('-e: select ' + name + ' have error in name or data-pb-source.');
      }
      else {
        console.log('-i: ' + name + 'skipped');
      }
    }

    // check if selects are more than one.
    if (selects.length > 1) {

      // make a collection of all selects as methods, tacks, and names.
      let names = [];
      let methods = [];

      selects.forEach((select, index) => {

        // get the name of data from select.
        if (!select.hasAttribute(atr.select.ignore)) {
          names[index] = select.hasAttribute(atr.core.source)
            ? select.getAttribute(atr.core.source)
            : select.name;
        }

        // check the data from given dataset.
        if (dataset.hasOwnProperty(names[index])) {
          // get method of rendering.
          method = select.getAttribute(atr.core.method) ?? 'simple';
          // get tack of rendering.
          tack = select.getAttribute(atr.select.tack) ?? 'default';
          // store method and tack.
          methods[index] = [method, tack];
        }
        else {
          printError('data not found in the response.')
          // skipping options those don't require any data from backend.
          __skipped(names[index]);
          // remove from names.
          names.splice(index, 1);
        }
      });

      // execute loop function.
      try {
        redData = this.#select_option_building_loop(
          dataset,
          names,
          methods
        );
      } catch (error) {
        console.log(error);
      }

      // append options into selects.
      selects.forEach((select, index) => {
        select.innerHTML = redData[names[index]];
      });
      // update the status if required.
    }
    else {
      const select = selects[0];

      // get the name of data from select.
      let name = select.hasAttribute(atr.core.source)
        ? select.getAttribute(atr.core.source)
        : select.name;

      if (dataset.hasOwnProperty(name)) {
        // get method of rendering.
        method = select.getAttribute(atr.core.method) ?? 'simple';
        // get tack of rendering.
        tack = select.getAttribute(atr.select.tack) ?? 'default';

        redData = this.#select_option_building_single(
          dataset[name],
          name,
          [method, tack]
        );
        // append options into selects.
        select.innerHTML = redData[name];
      }
      else {
        // skipping options those don't require any data from backend.
        __skipped(name);
      }
    }
    return true;
  }

  #_tagify(dataset, element) {

    // get all the tagify inputs.
    const query = 'input' + querySA(atr.core.control, kws.plugin.tag);
    const allTagifyInputs = element.querySelectorAll(query);

    // validate the tagify inputs.
    if (!allTagifyInputs.length) {
      console.log('-i: no tagify input found in the form');
      return false;
    }

    let targetKey;
    let dataKey;
    const post_tagify_initiated = (tagify, tags = []) => {
      const tagifyInst = tagifyInput.$_get(tagify.getAttribute(atr.plugins.id));
      tagifyInst.whitelist = tags;
    }

    const pre_tagify_initiated = (targetEle, data) => {
      targetEle.innerHTML = data.join('|');
    }

    // render all the tagify inputs.
    allTagifyInputs.forEach((tagify, index) => {
      targetKey = tagify.getAttribute(atr.core.target);
      dataKey = this.__getName(tagify);
      // check the datakey
      if (!dataset.hasOwnProperty(dataKey)) {
        return;
      }
      // check the targetKey
      const a = querySA(atr.tagify.verify.source, targetKey);
      const tagifyTarget = element.querySelector(`span.tagify_tags${a}`)
      if (tagifyTarget === null) return;

      // add tags into the tagify target location
      if (tagify.hasAttribute(atr.status.initiated) && tagify.getAttribute(atr.status.initiated) === '1') {
        toastr.info('tagify already initiated');
        post_tagify_initiated(tagify, dataset[dataKey]);
      }
      pre_tagify_initiated(tagifyTarget, dataset[dataKey]);

    });
    return true;
  }

  #_date(dataset, element) {}

  #_switch(dataset, element) {}

  #_radio(dataset, element) {}

  #_checkbox(dataset, element) {}

  #_range(dataset, element) {}

  // accessible by public function

  #form(dataset, element) {

    glob.env === kws.env.dev
      ? console.log(dataset, element)
      : false;

    // select --done
    this.#_select(dataset, element);

    // tagify --done
    this.#_tagify(dataset, element);

    // switch
    this.#_switch(dataset, element);

    // radio
    this.#_radio(dataset, element);

    // checkbox
    this.#_checkbox(dataset, element);

    // date
    this.#_date(dataset, element);

    // date range
    this.#_range(dataset, element);

    return true;
  }

  #formGroup(dataset, elements) {
    // todo :: to complete the form group rendering.
  }


  // ---------------  public functions  --------------- //

  $global(dataset, formEle, method) {
    return this.#global(dataset, formEle, method);
  }

  /**
   * render form using given dataset.
   * @param dataset
   * @param formEle
   * @returns {boolean}
   */
  $form(dataset, formEle) {
    return this.#form(dataset, formEle);
  }

  // more than one form
  $formGroup(dataset, elements) {
    return this.#formGroup(dataset, elements);
  }
}

export default RenderForms;