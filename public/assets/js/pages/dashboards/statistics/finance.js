import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR} from "../../../base/const.js";
import {_directLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import Arranging from "../../../base/arranges.js";
import extend from "../../../extend/extend.js";


// Shared variables
let StateData;
let xData;
let Direct;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4011',
};

/**
 * this will be used for show page's base-0 data.
 */
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    _process_a(data);
    _process_header(data);
    _process_summary(data);
    return true;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
  }

  const _process_header = (data) => {
    Direct = _directLE.visits;
    //render the data into header
    let header = Direct.querySelector('[' + atr.core.control + '="header"]');


    let percent = $R_common_obj.$_return(StateData.header.amount, rdR.common.methods.percent, [StateData.header.target]);
    StateData.header['percent'] = percent[0];
    header.innerHTML = extend.append.$_single_on_innerHTML(header, StateData.header);

    $R_common_obj.$_call(header);
  }
  const _process_summary = (data) => {

    //now load the navtab
    let targetEle = _directLE.layout.querySelector('#' + pb.dsb.statistics.business.p.summary);

    //first set all summary
    let place = targetEle.querySelector(querySA(atr.core.append, "navtabs"));
    let template = _directLE.template.querySelector(querySA(atr.core.template, "navtabs"));

    let cloneNode;

    //append the element
    place.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, data.summary.navtabs);

    $R_common_obj.$_call(place);
    //cloneNode.setAttribute(atr.load.tab, '1');


    //now set the navtab body
    place = targetEle.querySelector(querySA(atr.core.append, 'summary'));

    // let cloneNode = node.cloneNode(true);
    Object.keys(data.summary.navtabs).forEach((key) => {
      let div = document.createElement('div');
      div.setAttribute(atr.core.value, data.summary.navtabs[key].id);
      div.classList.add(CLS.display.none);
      place.appendChild(div);
    });

    //      let targetElement;
    //      place.children.forEach((div) => {
    //        if (div.getAttribute(atr.core.value) * 1 === data.summary.detail['date_id']) {
    //          div.classList.remove(CLS.display.none);
    //          targetElement = div;
    //        }
    //      });
    let event = {
      type : 'navtab',
      value: 'summary',
      data : data.summary.current_node
    };

    xData = data.summary.detail;
    navtabsTarget(place, event, true);

    // onload arranging.
    Arranging._directs(event, cloneNode.children[0]);
  }

  // AJAX Calling
  return _process(data.data);
}

const navtabsTarget = (element, event, onPageLoad = false) => {
  const summary_navtab = (_element, _event, _onPageLoad) => {

    const targetEle = _element.querySelector(querySA(atr.core.value, event.data));
    if (targetEle.getAttribute(atr.load.tab) === "1") return true;

    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);

      return _return;
    }
    const _process_a = (data) => {
      // finding template
      const template = _directLE.template.querySelector(querySA(atr.core.template, event.value));

      targetEle.innerHTML = extend.append.$_single_on_innerHTML(template, data);

      $R_common_obj.$_call(targetEle);
      targetEle.setAttribute(atr.load.tab, "1");
      return true;
    }

    if (_onPageLoad) {
      _process(xData);
      return true;
    }
    else {
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : _event.value,
        type: _event.type,
        data: _event.data
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);
      return ajax;
    }
  }

  switch (event.value) {
    case pb.dsb.statistics.business.p.summary:
      return summary_navtab(element, event, onPageLoad);
  }


}


// Public methods


export const DSF_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
// fetching all upcoming required details
export const DSF_Requests = function (data) {
  return pageOpen(data);
};