import {Lyt} from "./const.js";
import {_buttonLE, _cardLE} from "./elements.js";
import {atr} from "./attributes.js";
import Holding from "./holding.js";

let ManageState = function (layout, connects = []) {

  const _buttons = () => {
    if (connects.length) {
      connects.forEach((connect) => {
        _buttonLE.layout.querySelector(connect).removeAttribute(atr.load.state)
      });
    }
  }

  const _anyLayout = (elements) => {
    console.log(elements);
    if (connects.length) {
      connects.forEach((connect) => {
        elements.querySelector(connect).removeAttribute(atr.load.state);
      });
    }
  }


  const manipulateState = (layout) => {
    switch (layout) {
      case Lyt.buttons:
        _buttons();
        break;
      case Lyt.panels:
        //
        break;
      default:
        _anyLayout(Holding.Target(layout, 'layout'));
    }
  }
  manipulateState(layout);
}

let cleanState = function (layout, connects = []) {
  const _cards = () => {
    // set loop on connects and get element from layout.
    connects.forEach((connect) => {
      let element = _cardLE.layout.querySelector(connect);
      // remove the attribute inside a given element.
      element.querySelectorAll(querySA(atr.load.state))
        .forEach((element) => {
            _remove(element, atr.load.state);
          }
        );
    });
    const _remove = (element, attribute) => {
      element.removeAttribute(attribute);
    }
  }

  const manipulate = (layout) => {
    switch (layout) {
      case Lyt.buttons:
        // _buttons();
        break;
      case Lyt.cards:
        _cards();
        break;
    }
  }
  manipulate(layout);
}

const state = {
  manage: ManageState,
  clean : cleanState
}
export default state;