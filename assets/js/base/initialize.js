import Deploying from "./deploying.js";
import {get_thePath, get_thePathArr} from "./global.js";
import {set_thePathArr} from "./global.js";
import {set_thePath} from "./global.js";
import AjaxPB from "./ajax.js";
import {components} from "./components.js";
import deploying from "./deploying.js";
import {setStateData} from "../bucket/state.js";
import {setConfigsData} from "../bucket/configs.js";
import {setTagData} from "../bucket/tags.js";
import {setDatesData} from "../bucket/dates.js";
import {CLS, glob, keys, kws, Lyt} from "./const.js";
import {_pageLE} from "./elements.js";
import PB_extend_filter from "../extend/filter.js";
import {eTypes} from "./events.js";
import {atr} from "./attributes.js";
import Routing from "./routing.js";

let fun = function () {
  const homePage = '/generals/base/home';
  let coreData_Promise;

  const __path_validation = () => {
    const thePathArr = get_thePathArr();

    if (components.hasOwnProperty(thePathArr[0])) {
      if (components[thePathArr[0]].hasOwnProperty(thePathArr[1])) {
        if (components[thePathArr[0]][[thePathArr[1]]].hasOwnProperty(thePathArr[2])) {
          return true;
        }
        else {
          console.log(thePathArr);
          alert('path validation page not matched');
          return false;
        }
      }
      else {
        console.log(thePathArr);
        alert('path validation group not matched');
        return false;
      }
    }
    else {
      console.log(thePathArr);
      alert('path validation head not matched');
      return false;
    }
  }

  const __assign_path_globally = (path) => {

    glob.env === kws.env.dev
      ? console.log('Path: ' + path)
      : false;

    const pathArray = path.split('/');
    console.log();

    // updates the pageArray and thePathArray
    if (pathArray.length === 4 && pathArray[0] === '') {
      set_thePathArr(pathArray.slice(1))
      set_thePath(path);
    }
    else {
      set_thePathArr(pathArray);
      set_thePath(path);
    }
  }

  const __validatePath = (path, trim = false) => {

    // if the path is empty, then go with default page.
    if (path === '') {
      return trim ? homePage.substring(1) : homePage;
    }

    // split the path into the array.
    const PathArr = path.substring(1).split('/');

    // filter the empty string.
    PathArr.forEach((item, index) => {
      if (item === '') {
        PathArr.splice(index, 1);
      }
    });

    // validate using structure.
    if (PathArr.length !== 3) {
      // go with default page.
      return trim ? homePage.substring(1) : homePage;
    }

    // validate the path array values.
    if (components.hasOwnProperty(PathArr[0]) &&
      components[PathArr[0]].hasOwnProperty(PathArr[1]) &&
      components[PathArr[0]][PathArr[1]].hasOwnProperty(PathArr[2])) {
      return trim ? path.substring(1) : path;
    }
    else {
      return trim ? homePage.substring(1) : homePage;
    }
  }
  const __decodeParams = (paramString) => {

    // if the params are empty, then go with empty object.
    if (paramString === '') {
      return {}
    }

    let params = {};
    // remove the first question mark.
    paramString.substring(1).split('&').forEach((item) => {
      // create an object of query params
      const param = item.split('=');
      // if the param is not empty, then add it to the params object.
      if (param[0] !== '') {
        params[param[0]] = param[1];
      }
    });

    // return the params object.
    return params;
  }

  const __activeLinkItem = (targetPath) => {
    // activate the link item
    const targetedItem = _pageLE.sidebar
      .querySelector('div.menu-item > a[data-e-path="' + targetPath + '"]');

    // check the target item is available or not.
    if (targetedItem !== null) {
      targetedItem.classList.add(CLS.aside.active);
    }
  }
  // it calls the ajax to get target page required data.
  const fetchPageData = (thePathArr) => {
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL(thePathArr, 'pageopen', 'local', 0);
    return ajax.callREQUEST({}, urlID, false, false, true);
  }

  const fetchPageContent = (pathArr) => {
    if (components[pathArr[0]][pathArr[1]][pathArr[2]] === undefined) {
      const ajax = new AjaxPB();
      return ajax.callREQUEST({}, ajax.buildingURL(pathArr, {}, 'local', 3000), false, false, true);
    }
    // taking from local hold.
    return new Promise((resolve) => {
      resolve(components[pathArr[0]][pathArr[1]][pathArr[2]]);
    });
  }

  const initPage = (_path, history) => {

    // modify path
    const path = __validatePath(_path);

    // clear the data of the previous page before init the new page.
    if (get_thePathArr() !== undefined) {
      Routing.Clear([path]);
    }

    //
    __assign_path_globally(path);

    // console.log(thePage, thePathArr);
    // assign the global value of the path.

    if (!__path_validation()) {
      toastr.info('Page not found', 'Redirecting to home page.');
      __assign_path_globally(homePage);
    }

    // collect promises for the page.
    let promises = {
      pageOpen   : undefined,
      pageContent: undefined
    }

    // const.
    const thePathArr = get_thePathArr();
    const thePath = get_thePath();

    // calling to get the page data.
    promises.pageOpen = fetchPageData(thePathArr); // OpenPage();
    // calling to get the HTML data.
    promises.pageContent = fetchPageContent(thePathArr); // HTMLContent();

    // finally, deploy the page.
    return Deploying.RunPage(promises, history);
  }

  const initLocation = () => {
    // get the location detail form url.
    const target_path = location.pathname;
    const target_param = location.search;
    const target_hash = location.hash;

    //    console.log(target_path);
    //    console.log(target_param);

    // activate the link item
    __activeLinkItem(target_path);

    // load page as per target path.
    const initPagePromise = initPage(target_path, keys.history.state.nothing);


    const paramsObject = __decodeParams(target_param);
    // on the finishing of open page complete process.
    initPagePromise.then((success) => {
      console.log(paramsObject)
      // render layout as per query params.
      initLayout({
        new: {params: paramsObject},
        old: {}
      }, keys.history.state.fetch);
    });
  }

  const initHistory = (newStateObject, oldStateObject) => {

    // get page data from local storage.
    let pastPageData;
    const pageData = localStorage.getItem('pageData');
    if (pageData) {
      // Parse and use the stored page details
      pastPageData = JSON.parse(pageData);
      // keys => [layout, path, params, page]
    }


    // validating.
    const isSamePath = PB_extend_filter.$_array_match(newStateObject.pathArr, oldStateObject.pathArr);

    let initPagePromise;
    if (isSamePath === false) {
      console.log('different path');

      // getting target page and params from the state object.
      const targetPath = newStateObject.path;

      // activate the link item
      __activeLinkItem(targetPath);

      // load page as per target path.
      initPagePromise = initPage(targetPath, keys.history.state.nothing);
    }
    else {
      console.log('same path');
      initPagePromise = Promise.resolve(true);
    }

    // on the finishing of open page complete process.
    initPagePromise.then((success) => {
      // render layout as per query params.
      // __modifyParams(location.search);
      initLayout({
        new: newStateObject,
        old: oldStateObject
      }, keys.history.state.nothing);
    });
  }

  const initRedirect = (path, params) => {
    console.log(path, params);

    // activate the link item
    __activeLinkItem(path);

    // load page as per target path.
    const initPagePromise = initPage(path, keys.history.state.page);

    const paramsObject = __decodeParams(params);
    // on the finishing of open page complete process.
    initPagePromise.then((success) => {
      // render layout as per query params.
      initLayout({
        new: {params: paramsObject},
        old: {}
      }, keys.history.state.fetch);
    });
  }

  /**
   * @param State
   * @param history
   */
  const initLayout = (State, history) => {

    console.log(State);

    let newParams = State.new.hasOwnProperty('params') ? State.new.params : {};
    const oldParams = State.old.hasOwnProperty('params') ? State.old.params : {};

    if (newParams.constructor !== Object) {
      newParams = __decodeParams(newParams);
    }

    // if the params are empty, then return false.
    if (Object.keys(newParams).length === 0) {
      // if empty, then add open, it should work as home page.
      newParams.type = eTypes.open;
    }

    // create an event form the params.
    const eventObj = {
      value : newParams.act ?? null,
      type  : newParams.type ?? null,
      place : null, // this will be defined in the deploying.
      data  : newParams.id ?? null,
      switch: null
    }

    // todo--error, this can throw an error in case of multiLayout page where secondary layout have link in URL.
    let layoutName;
    document.querySelector('#layout_zone').children.forEach((ele) => {
      if (ele.getAttribute('data-layout') === 'parent') {
        layoutName = ele.getAttribute(atr.core.layout);
      }
    });

    // triggerElement, @eventObj, handlerKey, layoutName
    return Deploying.Partition(
      eventObj,
      kws.handler.button,
      layoutName,
      {
        action: history,
        state : {
          params: newParams,
          event : eventObj // the place is not updated here.
        }
      }
    );
  }

  function initPlugins() {
    // init the plugins.
    Deploying.Plugins(kws.stage.dom);
  }

  function initData() {
    // Static data collection.
    const ajax_state = new AjaxPB();
    const ajax_dates = new AjaxPB();
    const ajax_configs = new AjaxPB();
    const ajax_tags = new AjaxPB();
    // create urls for ajax calls.
    const urlID_state = ajax_state.buildingURL(["app", "core", "state"], {}, "local", 4000);
    const urlID_dates = ajax_dates.buildingURL(["app", "core", "dates"], {}, "local", 4000);
    const urlID_configs = ajax_configs.buildingURL(["app", "core", "configs"], {}, "local", 4000);
    const urlID_tags = ajax_tags.buildingURL(["app", "core", "tags"], {}, "local", 4000);

    // crete promise,
    const State_Promise = ajax_state.callREQUEST({}, urlID_state, false, false, true);
    const Dates_Promise = ajax_dates.callREQUEST({}, urlID_dates, false, false, true);
    const Configs_Promise = ajax_configs.callREQUEST({}, urlID_configs, false, false, true);
    const Tags_Promise = ajax_tags.callREQUEST({}, urlID_tags, false, false, true);

    coreData_Promise = Promise.all([State_Promise, Dates_Promise, Configs_Promise, Tags_Promise])
      .then((data) => {
        // update static data.q
        setStateData(data[0]);
        // update session dates data
        setDatesData(data[1]);
        // update configs data
        setConfigsData(data[2]);
        // update tags data -> for status management.
        setTagData(data[3]);

        return true;
      });

    deploying.CoreData(coreData_Promise);
  }

  return {
    /**
     *
     * @param path
     * @param history
     * @constructor
     */
    Page: function (path, history) {
      return initPage(path, history);
    },

    /**
     *
     * @constructor
     */
    Location: function () {
      initLocation();
    },

    /**
     *
     * @constructor
     */
    History: function (newStateObject, oldStateObject) {
      initHistory(newStateObject, oldStateObject);
    },

    /**
     *
     * @param path
     * @param params
     * @constructor
     */
    Redirect: function (path, params) {
      initRedirect(path, params);
    },

    /**
     *
     * @param params
     * @param history
     * @constructor
     */
    Layout: function (params, history) {
      initLayout(params, history); // none. not any call.
    },

    /**
     *
     * @constructor
     */
    Plugins: function () {
      initPlugins();
    },

    /**
     *
     * @constructor
     */
    Data: function () {
      initData();
    }
  }
};

const Initialize = fun();
export default Initialize;