// Class definition
import {atr} from "../base/attributes.js";

var fun = function () {

  const _table_direct = (element, target, source) => {
    // target will get by catch
    const sourceKey = querySA(atr.core.catch, source);

    // get the total
    let total = 0;
    element.querySelectorAll(sourceKey).forEach((ele) => {
      // get the value and sum into total
      // total += parseFloat(ele.value);
      total += ele.value === '' ? 0 : parseFloat(ele.value);
    });

    let targetedInputEle = element.querySelector('#' + target);

    if (targetedInputEle === null) {
      alert('Targeted input element not found!');
      return;
    }
    targetedInputEle.value = total;
    return total;
  }

  // accessible functions by other target page files.
  return {
    /**
     * select the input field and calculate the total
     * @param element
     * @param target
     * @param source
     */
    $_table_direct: function (element, target, source) {
      return _table_direct(element, target, source);
    }
  };
};

const PB_extend_calculate = fun();
export default PB_extend_calculate;
