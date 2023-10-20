import {atr} from "../base/attributes.js";
import {exT, kws, rdR, CLS, otR, Lyt, deF, plg, sD, glob, STYLE} from "../../js/base/const.js";

class RenderPaging {


  #profile = {};

  constructor() {
    //
  }

  static consts = {
    joiner: '-'
  }

  get getProfile() {
    return this.#profile;
  }

  #structure(coreElement, data) {

    const pageState = data;
    let targetEle;
    // page size
    const element = coreElement;

    this.#profile.size = element.getAttribute(atr.core.size) ?? 20;
    this.#profile.active = pageState.active;


    // --------------- create paging elements --------------- //

    targetEle = element.querySelector(querySA(atr.core.target, 'load'));
    targetEle.innerHTML = '';
    this.#profile.pageset = [this.#profile.active];

    const arraySize = Math.ceil(this.#profile.active / this.#profile.size);

    // create paging blocks as per data size.
    for (let page_no = 1; page_no <= arraySize; page_no++) {
      // page set
      if (page_no === arraySize) {
        this.#profile.pageset[page_no] = ((page_no - 1) * this.#profile.size) + 1 + '-' + this.#profile.active;
      }
      else {
        this.#profile.pageset[page_no] = ((page_no - 1) * this.#profile.size) + 1 + '-' + page_no * this.#profile.size;
      }
      // create paging blocks
      let node = document.createElement('div');
      node.setAttribute(atr.core.paging, page_no);
      node.setAttribute(atr.load.page, "0");
      node.classList.add(CLS.display.none);
      // add inner element for row
      let childNode = document.createElement('div');
      childNode.classList.add("row", "g-6");
      node.append(childNode);
      // add to target
      targetEle.appendChild(node);
    }

    // --------------- create paging button --------------- //

    targetEle = element.querySelector(querySA(atr.core.target, 'footer'));

    // counting
    this._counting(element, false);

    // pagination.
    const pagEle = targetEle.querySelector(querySA(atr.core.control, 'paging'));


    let newArrList = [];
    newArrList.push(pagEle.querySelector('.previous'));
    newArrList.push(pagEle.querySelector(querySA(atr.core.catch, 'page')));
    newArrList.push(pagEle.querySelector('.next'));

    let arrList = newArrList;
    console.log(arrList);
    let cloneNode, pageBtn;
    for (let i = 2; i <= Math.ceil(this.#profile.active / this.#profile.size); i++) {
      //
      if (!arrList[1].classList.contains('active')) {
        arrList[1].classList.add('active');
      }
      cloneNode = arrList[1].cloneNode(true);
      // manage visibility
      cloneNode.classList.remove(CLS.visible.navs.bar.active);
      cloneNode.classList.add(CLS.display.none);
      // update page button.
      pageBtn = cloneNode.children[0];
      pageBtn.value = i;
      pageBtn.innerText = i;
      // add value for button.
      pageBtn.setAttribute(atr.event.value, this.#profile.pageset[i]);

      // add to array
      arrList.splice(i, 0, cloneNode);
    }
    // alter list item = 1 manually
    arrList[1].children[0].setAttribute(atr.event.value, this.#profile.pageset[1]);

    // remove all existing paging buttons.
    pagEle.innerHTML = "";

    // add to pagination
    arrList.forEach((item) => {
      pagEle.appendChild(item);
    });

  }

  // ---------------  private functions  --------------- //
  #cards(element, data) {

    // prepare and load the structure.
    this.#structure(element, data);

    return true;
  }

  _counting(element, event) {
    const countEle = element.querySelector(querySA(atr.core.control, 'counting'));
    console.log(event);
    let xdd = event.value;
    //    console.log(countEle);
    const range = (event === false)
      ? this.#profile.pageset[1].split('-')
      : event.data.split('-');
    countEle.children[0].innerText = range[0];
    countEle.children[1].innerText = range[1];
    countEle.children[2].innerText = this.#profile.active;
  }

  #trigger(element, event) {

    // get element of all page access buttons.
    let tarEle = element.querySelector(querySA(atr.core.control, 'paging'));

    // get positions.
    let startPin = "0", endPin = (tarEle.children.length - 1).toString();

    // special case for edge buttons of pagination
    if (event.value === "++" || event.value === "--") {
      tarEle.children.forEach((ele, index) => {
        if (ele.classList.contains(CLS.visible.navs.bar.active)) {
          // update event value
          if (event.value === "++") {
            event.value = (index + 1).toString();
            event.data = this.#profile.pageset[index + 1];
          }
          else {
            event.value = (index - 1).toString();
            event.data = this.#profile.pageset[index - 1];
          }
        }
      });
    }

    //edge case
    if (event.value === startPin) {
      event.value = "1";
      event.data = this.#profile.pageset[1];
    }
    if (event.value === endPin) {
      event.value = (endPin - 1).toString();
      event.data = this.#profile.pageset[endPin - 1];
    }

    let pin = "1";

    tarEle.children.forEach((ele, index) => {

      if (ele.classList.contains(CLS.visible.navs.bar.active)) {
        ele.classList.remove(CLS.visible.navs.bar.active);
        ele.classList.add(CLS.display.none);

        if (!tarEle.children[index + 1].classList.contains('next')) {
          tarEle.children[index + 1].classList.add(CLS.display.none);
        }
        if (!tarEle.children[index - 1].classList.contains('previous')) {
          tarEle.children[index - 1].classList.add(CLS.display.none);
        }
      }

      if (ele.children[0].value === event.value) {
        pin = index.toString();
      }
    });

    tarEle.children.forEach((ele, index) => {

      if (ele.children[0].value === pin) {
        ele.classList.add(CLS.visible.navs.bar.active);
        ele.classList.remove(CLS.display.none);

        tarEle.children[index + 1].classList.remove(CLS.display.none);
        tarEle.children[index - 1].classList.remove(CLS.display.none);
      }
    });


  }

  // ---------------  public functions  --------------- //

  // _counting is also a publicly accessible function.

  $cards(elements, dataset) {
    return this.#cards(elements, dataset);
  }

  $trigger(element, event) {
    return this.#trigger(element, event);
  }
}

export default RenderPaging;