/**
 * AJAX request management.
 * NOTE: this file is not edited by the tech team.
 *
 * how to call the ajax in a targeted page file.
 *
 *    const _process = (data) => {
 *       _process_a(data);
 *       _process_b(data);
 *     }
 *    const ajax = new AjaxPB();
 *    const urlID = ajax.buildingURL([], {act: event.value, type: event.type, account: event.data }, 'local', 0);
 *    ajax.callREQUEST({POST}, urlID, false, _process);
 */
import {get_thePath, get_thePathArr} from "./global.js";
import {glob, kws} from "./const.js";

class AjaxPB {
  #xHttp;
  #callbackReturn;
  #responseData;
  isFullfiled;
  type;
  axiosPromise;

  #xHTTPs = {};

  constructor() {
    this.#xHttp = new XMLHttpRequest();
    this.isFullfiled = false;
    this.type = "ajaxPb";
  }

  /*
   {
   "Content-Type" : "application/json"
   }
   */

  #D = {
    method            : {
      get   : "GET",
      post  : "POST",
      put   : "PUT",
      delete: "DELETE",

    },
    contentType       : {
      all  : "*/*",
      www  : "application/x-www-form-urlencoded",
      json : "application/json",
      multi: "multipart/form-data",
      text : "text/plain",
      html : "text/html",
    },
    contentTypeReverse: {},
    responseType      : {
      empty   : "",
      array   : "arraybuffer",
      blob    : "blob",
      document: "document",
      json    : "json",
      text    : "text"
    },
    headerType        : {
      type           : 'Content-Type',
      length         : 'Content-Length',
      accept         : 'Accept',
      accept_encoding: 'Accept-Encoding',
      accept_language: 'Accept-Language',
      connection     : 'Connection',
      cookie         : 'Cookie',
      host           : 'Host',
    }
  }
  // private
  #URL_params = {};
  #hostIs = {
    pb   : 'http://ajax.petrobyte.in/',
    html : 'http://beanbyte',
    data : 'http://localhost',
    local: 'http://localhost',
  };
  #headerMap;

  #portIs = {
    html         : 3000,
    core         : 4000,
    generals     : {
      base: 4001,
    },
    dashboards   : {
      charts    : 4010,
      statistics: 4011,
      summary   : 4030
    },
    operations   : {
      starts      : 4100,
      transactions: 4110,
      shifts      : 4120,
      employees   : 4130,
      stocks      : 4140,
      indents     : 4150,
      loyalty     : 4160,
      general     : 4170
    },
    management   : {
      starts   : 4200,
      products : 4210,
      accounts : 4220,
      customers: 4230,
      billing  : 4240,
      employees: 4250,
      users    : 4260,
      drive    : 4270,
      indents  : 4280,
      loyalty  : 4290
    },
    reports      : {
      starts   : 4300,
      general  : 4310,
      petroleum: 4320,
      products : 4330,
      accounts : 4340,
      customers: 4350,
      employees: 4360
    },
    taxation     : {
      starts   : 4400,
      gstreport: 4410,
      standard : 4420,
      vatreport: 4430,
      vatreturn: 4440,
      gstreturn: 4450,
    },
    financials   : {
      starts   : 4500,
      balance  : 4510,
      profit   : 4520,
      reconcile: 4530,
      statement: 4540
    },
    communication: {
      starts  : 4600,
      chats   : 4610,
      diary   : 4620,
      email   : 4630,
      message : 4640,
      whatsapp: 4650
    },
    setting      : {
      starts       : 4700,
      profile      : 4710,
      configs      : 4720,
      exports      : 4730,
      intel        : 4740,
      subscriptions: 4750,
      sample       : 4760
    },
    samples      : {
      starts : 4800,
      renders: 4810,
      extends: 4820,
      plugins: 4830
    }
  }

  #fewUseless() {
    // few normal things
    Object.entries(this.#D.contentType)
      .map(([key, value]) => {
        this.#D.contentTypeReverse[value] = key;
      });
  }

  // methods
  #verifyURL(path) {
    return true;
  }

  #verifyQUERY(query) {
    return true;
  }

  #buildingQUERY = (params) => {
    let query = [];
    Object.keys(params).map(function (k) {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
    });
    return query.join('&');
  }

  getHeaderMap() {
    return this.#headerMap;
  }

  _getResponseHeader(type) {
    return this.#headerMap[type.toLowerCase()].split(';')[0];
  }

  buildingURL(path = [], params = {}, host = 'local', port = 0) {


    let query;
    // validation
    if (!Array.isArray(path)) {
      alert('kindly sent the path in array.');
    }


    // host
    const the_host = this.#hostIs.hasOwnProperty(host)
      ? this.#hostIs[host] : host;

    // path
    let the_path;
    if (!path.length) {
      path = get_thePathArr();
      the_path = get_thePath();
    }
    else {
      the_path = path.join("/");
    }

    // port
    let the_port;
    if (port === 0) {
      // console.log(path);
      // console.log(this.#portIs[path[0]])
      the_port = this.#portIs[path[0]].hasOwnProperty(path[1])
        ? this.#portIs[path[0]][path[1]]
        : port;
    }
    else {
      the_port = port;
    }

    // params
    let the_params;
    if (typeof params === "string") {
      switch (params) {
        case 'pageopen':
          the_params = {
            act : 'page',
            type: 'open'
          }
          break;
      }
    }
    else {
      the_params = params;
    }
    /// generate the query
    if (Object.keys(the_params).length !== 0) {
      // new URLSearchParams(params).toString();
      query = '?' + this.#buildingQUERY(the_params);
    }
    else {
      query = undefined;
    }

    const urlID = KTUtil.getUniqueId('ajax');

    // building the url, using join
    const URL = the_host + ':' + the_port + '/' + the_path
    this.#URL_params[urlID] = query === undefined
      ? URL
      : URL + '/' + query;

    // few normal verifications.
    if (!this.#verifyURL(URL, the_path)) {
      return false;
    }

    if (!this.#verifyQUERY(query)) {
      return false;
    }


    glob.env === kws.env.dev
      ? console.log('----called URL: ' + this.#URL_params[urlID])
      : false;

    return urlID;
  }

  #dataStringify(data) {
    return Object.keys(data).length !== 0 ? JSON.stringify(data) : null;
  }

  #responseHeaders() {
    // this.#xHttp.getResponseHeader(this.#D.headerType.type)
    const headers = this.#xHttp.getAllResponseHeaders()

    const headersArray = headers.trim().split(/[\r\n]+/);

    // Create a map of header names to values
    const headerMap = {};
    headersArray.forEach((line) => {
      const parts = line.split(": ");
      const header = parts.shift();
      headerMap[header] = parts.join(": ");
    });
    this.#headerMap = headerMap;
    // const contentType = headerMap["content-type"];
  }

  /**
   * this function call ajax directly using GET or POST method.
   * @param data in object format.
   * @param urlId
   * @param isPOST boolean
   * @param callback
   * @param contentType
   */


  callRequestAxios(data, urlId, isPOST = false, callback, contentType = "application/json") {
    if (contentType === this.#D.contentType.multi) {
      console.log(data);
      const formData = new FormData();
      data.formData.forEach((item) => {
        for (let key in item) {
          formData.append(key, item[key]);
        }
      })
      data = formData;
    }


    const url = this.#URL_params[urlId];
    this.type = "axios";
    if (isPOST) {
      this.axiosPromise = axios({
        method            : "post",
        url               : url,
        data              : data,
        headers           : {
          "Content-Type": contentType
        },
        onDownloadProgress: function (progressEvent) {
          console.log(progressEvent);
        }
      })
      this.axiosPromise.then((res) => {
        if (res.data.status) {
          callback(res.data.data);
        }
        else {
          toastr.error(res.data.message, res.data.title);
        }
      })
    }
    else {
      this.axiosPromise = axios.get(url)
      this.axiosPromise.then((res) => {
        if (res.data.status) {
          callback(res.data.data);
        }
        else {
          console.log("error in ajax");
          toastr.error(res.data.message, res.data.title);
        }
      })
    }
  }

  #responseTranslate() {

    const contentType = this._getResponseHeader(this.#D.headerType.type);

    switch (contentType) {
      case this.#D.contentType.all:
        return this.#xHttp.response;

      case this.#D.contentType.www:
        return this.#xHttp.response;

      case this.#D.contentType.multi:
        return this.#xHttp.response;

      case this.#D.contentType.text:
        return this.#xHttp.response;

      case this.#D.contentType.json:
        const response = JSON.parse(this.#xHttp.responseText);
        // delete the __@ keys as they are not required.
        if (response.hasOwnProperty('data')) {
          Object.keys(response.data).forEach((key) => {
            key.match('__@') ? delete response.data[key] : false;
          });
        }
        return response;

      case this.#D.contentType.html:

        /*
         const DOM = new DOMParser();
         return DOM.parseFromString(this.#xHttp.responseText, contentType);
         */
        return this.#xHttp.responseText;

      default:
        return this.#xHttp.response;
    }
  }


  callREQUEST(data, urlID, isPOST = false, callback, nature = false) {
    //    return false;
    // Methods
    this.#xHttp.open(
      isPOST ? this.#D.method.post : this.#D.method.get,
      this.#URL_params[urlID],
      true
    );

    // delete the holded url for ajax call.
    delete this.#URL_params[urlID];

    // Setting Headers
    this.#xHttp.setRequestHeader(
      this.#D.headerType.type, this.#D.contentType.json
    );

    // Setting Variables
    // this.#xHttp.responseType = this.#D.responseType.text;
    this.#xHttp.timeout = 10000; // 10 seconds
    this.#xHttp.withCredentials = false; // do true, if we want to create cookie from api domain.

    // due
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload

    // print data that we are going to send via XHR
    glob.env === kws.env.dev
      ? console.log('send data: ' + this.#dataStringify(data))
      : false;
    this.#xHttp.send(
      this.#dataStringify(data)
    );

    // Events
    this.#xHttp.onloadstart = (event) => {
      glob.env === kws.env.test
        ? console.log('request started.')
        : false;
    }

    const ajaxPromise = new Promise((resolve, reject) => {
      this.#xHttp.onload = () => {
        if (this.#xHttp.status === 200) {
          nature === true
            ? resolve(this.#responseTranslate())
            : resolve(true);
        }
        else {
          nature === true
            ? reject(this.#responseTranslate())
            : reject(false);
        }
      }
    });

    this.#xHttp.onreadystatechange = () => {

      switch (this.#xHttp.readyState) {
        case 0:
          // {key: UNSENT}
          break;

        case 1:
          // {key: OPENED, fun: this.#xHttp.open, status:, statusText:}
          console.log('opened');
          break;

        case 2:
          // {key: HEADERS_RECEIVED, status:, statusText:}
          this.#responseHeaders()

          /*
           const contentType = this.#headerMap[this.#D.headerType.type.toLowerCase()];
           contentType.match(this.#D.contentType.json)
           this.#xHttp.abort();
           log('HTTP response is aborted.');
           */
          break;

        case 3:
          // {key: LOADING, fun: this.#xHttp.onprogress, status: 200, statusText: OK}
          break;

        case 4:
          // {key: DONE, fun: this.#xHttp.onload, status: 200, statusText: OK}
          glob.env === kws.env.test
            ? console.log('response status: ' + [this.#xHttp.status])
            : false;
          /*
           console.log(this.#xHttp.response);
           console.log(this.#xHttp.responseURL);
           console.log(this.#xHttp.responseText);
           */

          let data;
          switch (typeof callback) {

            case 'function':
              data = this.getValidatedRESPONSE();
              this.#callbackReturn = data !== false ? callback(data) : false;
              break;

            case 'boolean':
              this.#responseData = callback === true ? this.getValidatedRESPONSE() : false;
              break;
          }
          break;

        default:
          break;

      }
    }

    this.#xHttp.ontimeout = (event) => {
      alert('terminated due to preset time expiring');
    }

    this.#xHttp.onloadend = () => {
      glob.env === kws.env.dev
        ? console.log('request ended')
        : false;
    }

    return ajaxPromise;
  }

  getRESPONSE() {

    switch (this.#xHttp.status) {
      case 200:
        return {
          body  : this.#responseTranslate(),
          status: true
        }

      default:
        return {
          body  : {},
          status: false
        };
    }
  }

  getValidatedRESPONSE() {
    // [status, body]
    const response = this.getRESPONSE();

    if (response.status === false) {
      return false;
    }
    return response.body;
  }

  onStateChangeCalling(callback, status = undefined, param_A = false, param_B = false, state = 4) {
    if (this.type === "axios") {
      this.axiosPromise.then((resp) => {
        if (resp.data.status) {
          sleep(1).then(() => {
            callback(param_A, param_B)
          })
        }
      })
      return;
    }

    this.#xHttp.addEventListener('readystatechange', () => {
      if (this.#xHttp.readyState === state) {

        switch (status) {
          case undefined:
            this.#callbackReturn === true ? callback(param_A, param_B) : false;
            break;

          case true:
            callback(param_A, param_B, this.#responseData);
            break;
        }
      }
    });

  }

  /**
   * -------------------------------
   * Using jQuery.
   * -------------------------------
   * @param data
   * @param urlID
   * @param isPOST
   */
  quickREQUEST(data, urlID, isPOST = false) {
    $.ajax({
      type: isPOST ? this.#D.method.post : this.#D.method.get,
      url : this.#URL_params[urlID],
      data: this.#dataStringify(data),
      //      dataType: 'json',
      encode     : true,
      processData: false,
      headers    : {
        "content-type": "application/json;charset=UTF-8"
      },

      // on process functions.
      beforeSend: function () {
        console.log("Waiting...");
      },
      error     : function () {
        console.log("Error");
      },
      success   : function (data) {
        console.log(data);
      }

    }).done(function (data) {
      console.log(data);
    });
  }

}


export const call_AJAX_GET = (queryParams, callBack, promiseReturn = false) => {
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL(get_thePathArr(), queryParams, 'local', 0);
  return ajax.callREQUEST({}, urlID, false, callBack, promiseReturn);
}

export const call_AJAX_POST = (queryParams, formData, callBack, promiseReturn = false) => {
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL(get_thePathArr(), queryParams, 'local', 0);
  return ajax.callREQUEST({formData}, urlID, true, callBack, promiseReturn);
}

export default AjaxPB;