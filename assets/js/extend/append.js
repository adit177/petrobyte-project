// Class definition
import {atr} from "../base/attributes.js";
import {get_callEl, get_LN} from "../base/global.js";
import Holding from "../base/holding.js";
import {$R_common_obj} from "../base/render.js";
import {_k} from "../base/keys.js";

var fun = function () {

  const _single_string = (element, data) => {

    // split the element by $$ and loop through the array
    let parts = element.split('$$');
    parts.forEach((str, index) => {
      // if the string starts with @ and ends with @, then it is a template key
      if (str.length >= 2 && str[0] === '@' && str[str.length - 1] === '@') {
        // replace the string with the data value
        parts[index] = data[str.substring(1, str.length - 1)] ?? '';
      }
    })
    // join the array back into a string
    return parts.join("");
  }

  const _single_element = (template_key, data) => {

    const layout = get_LN();
    const template_zone = Holding.Target(layout, _k.templates);

    console.log(template_zone);

    const template = template_zone.querySelector(querySA(atr.core.template, template_key));

    const inner = template.innerHTML;

    // split the element by $$ and loop through the array
    let parts = inner.split('$$');
    parts.forEach((str, index) => {
      // if the string starts with @ and ends with @, then it is a template key
      if (str.length >= 2 && str[0] === '@' && str[str.length - 1] === '@') {
        // replace the string with the data value
        parts[index] = data[str.substring(1, str.length - 1)] ?? '';
      }
    })

    // join the parts back into a string
    get_callEl().querySelector(querySA(atr.core.append, template_key)).innerHTML = parts.join("");
    $R_common_obj.$_call(get_callEl());
    return true;
  }

  const _loop_string = (element, data) => {
    let final_strings = "";
    let sets = [];
    // if the data is array.
    if (_.isObject(data)) {
      Object.keys(data).forEach((key, index) => {
        // split the element by $$ and loop through the array
        sets.push(_single_string(element, data[key]));
      });
      // join the array back into a string
      final_strings = _.join(sets, "");

      return final_strings;
    }

    if (_.isArray(data)) {
      data.forEach((obj, index) => {
        // split the element by $$ and loop through the array
        sets.push(_single_string(element, obj));
      });
      // join the array back into a string
      final_strings = _.join(sets, "");

      return final_strings;
    }

    alert("The data is not an array or object");
    return false;
  }

  const _loop_element = (template_key, data) => {

    // get the template
    const layout = get_LN();
    const template_zone = Holding.Target(layout, _k.templates);

    const template = template_zone.querySelector(querySA(atr.core.template, template_key));

    const inner = template.innerHTML;

    let final_strings = "";
    let sets = [];
    if (_.isObject(data)) {
      Object.keys(data).forEach((key, index) => {
        // split the element by $$ and loop through the array
        sets.push(_single_string(inner, data[key]));
      });
      // join the array back into a string
      final_strings = _.join(sets, "");
    }
    if (_.isArray(data)) {
      data.forEach((obj, index) => {
        // split the element by $$ and loop through the array
        sets.push(_single_string(inner, obj));
      });
      // join the array back into a string
      final_strings = _.join(sets, "");
    }

    // join the parts back into a string
    get_callEl().querySelector(querySA(atr.core.append, template_key)).innerHTML = final_strings;
    $R_common_obj.$_call(get_callEl());

    return true;
  }

  // accessible functions by other target page files.
  return {
    // single render as data object
    $_single_on_innerHTML: function (element, data) {
      return _single_string(element.innerHTML, data);
    },

    $_single_on_element: function (temp_tag, data) {
      return _single_element(temp_tag, data);
    },

    $_loop_on_innerHTML: function (element, data) {
      return _loop_string(element.innerHTML, data);
    },
    // loop render as data object
    $_loop_on_element: function (temp_tag, data) {
      return _loop_element(temp_tag, data);
    },

  };
};

const PB_extend_append = fun();
export default PB_extend_append;
