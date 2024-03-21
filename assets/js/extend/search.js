"use strict";
import {CLS} from "../base/const.js";
import {atr} from "../base/attributes.js";

// Class definition
var fun = function () {
  //
  let search_element;


  // Private variables
  var element;
  var formElement;
  var mainElement;
  var resultsElement;
  var wrapperElement;
  var emptyElement;

  var preferencesElement;
  var preferencesShowElement;
  var preferencesDismissElement;

  var advancedOptionsFormElement;
  var advancedOptionsFormShowElement;
  var advancedOptionsFormCancelElement;
  var advancedOptionsFormSearchElement;

  var searchObject;

  // Private functions
  var processs = function (search) {
    var timeout = setTimeout(function () {
      var number = KTUtil.getRandomInt(1, 3);

      // Hide recently viewed
      mainElement.classList.add('d-none');

      if (number === 3) {
        // Hide results
        resultsElement.classList.add('d-none');
        // Show empty message
        emptyElement.classList.remove('d-none');
      }
      else {
        // Show results
        resultsElement.classList.remove('d-none');
        // Hide empty message
        emptyElement.classList.add('d-none');
      }

      // Complete search
      search.complete();
    }, 1500);
  }

  var processsAjax = function (search) {
    // Hide recently viewed
    mainElement.classList.add('d-none');

    axios.post('/search.php', {
      query: searchObject.getQuery()
    })
      .then(function (response) {
        // Populate results
        resultsElement.innerHTML = response;
        // Show results
        resultsElement.classList.remove('d-none');
        // Hide empty message
        emptyElement.classList.add('d-none');

        // Complete search
        search.complete();
      })
      .catch(function (error) {
        // Hide results
        resultsElement.classList.add('d-none');
        // Show empty message
        emptyElement.classList.remove('d-none');

        // Complete search
        search.complete();
      });
  }

  var clear = function (search) {
    // Show recently viewed
    mainElement.classList.remove('d-none');
    // Hide results
    resultsElement.classList.add('d-none');
    // Hide empty message
    emptyElement.classList.add('d-none');
  }

  var handlePreferences = function () {
    // Preference show handler
    preferencesShowElement.addEventListener('click', function () {
      wrapperElement.classList.add('d-none');
      preferencesElement.classList.remove('d-none');
    });

    // Preference dismiss handler
    preferencesDismissElement.addEventListener('click', function () {
      wrapperElement.classList.remove('d-none');
      preferencesElement.classList.add('d-none');
    });
  }

  var handleAdvancedOptionsForm = function () {
    // Show
    advancedOptionsFormShowElement.addEventListener('click', function () {
      wrapperElement.classList.add('d-none');
      advancedOptionsFormElement.classList.remove('d-none');
    });

    // Cancel
    advancedOptionsFormCancelElement.addEventListener('click', function () {
      wrapperElement.classList.remove('d-none');
      advancedOptionsFormElement.classList.add('d-none');
    });

    // Search
    advancedOptionsFormSearchElement.addEventListener('click', function () {

    });
  }


  // execute common part
  const common_part = (handler_tag = 'search_handler') => {
    const element = document.querySelector('#' + handler_tag);
    return !element ? false : element;
  }
  // execute simple method
  const _simple = function (handler_key,) {

    // variables for holding and elements
    let searchElement;
    let suggestionsElement;
    let resultsElement;
    let emptyElement;
    //
    let user_search_for, user_match_for;
    let searchObject;
    let got = false;


    var simple_searching = function (search) {

      function findMatches(itemEle) {
        const item = itemEle.querySelector(querySA(atr.direct.search, false));
        if (
          item.getAttribute(atr.other.search.info_1).toLowerCase().match(user_match_for)
          ||
          item.getAttribute(atr.other.search.info_2).toLowerCase().match(user_match_for)
          ||
          item.getAttribute(atr.other.search.info_3).toLowerCase().match(user_match_for)
          ||
          item.getAttribute(atr.other.search.info_4).toLowerCase().match(user_match_for)
        ) {
          got = true;
          item.classList.remove(CLS.display.none);
        }
        else {
          item.classList.add(CLS.display.none);
        }
      }

      // Hide recently viewed
      suggestionsElement.classList.add(CLS.display.none);

      // get user search query
      user_search_for = searchObject.getQuery().toLowerCase();
      user_match_for = new RegExp(user_search_for, 'g');
      console.log('query: ' + user_search_for)


      const search_zone = resultsElement.querySelector(querySA(atr.core.control, 'search_result') + '> div').children;

      search_zone.forEach(findMatches)

      if (got) {
        // Show results
        resultsElement.classList.remove(CLS.display.none);
        // Hide empty message
        emptyElement.classList.add(CLS.display.none);
        got = false;
      }
      else {
        // Hide results
        resultsElement.classList.add(CLS.display.none);
        // Show empty message
        emptyElement.classList.remove(CLS.display.none);
      }

      // Complete search
      search.complete();
    }

    var simple_clear = function (search) {
      // Show recently viewed
      suggestionsElement.classList.remove(CLS.display.none);
      // Hide results
      resultsElement.classList.add(CLS.display.none);
      // Hide empty message
      emptyElement.classList.add(CLS.display.none);
      // got value reset
      got = false;
    }


    searchElement = common_part(handler_key);

    // getting all required elements
    suggestionsElement = searchElement.querySelector(querySA(atr.inbuild.search, 'suggestions'));
    resultsElement = searchElement.querySelector(querySA(atr.inbuild.search, 'results'));
    emptyElement = searchElement.querySelector(querySA(atr.inbuild.search, 'empty'));

    // Initialize search handler
    searchObject = new KTSearch(searchElement);

    // Search handler
    searchObject.on('kt.search.process', simple_searching);

    // Clear handler
    searchObject.on('kt.search.clear', simple_clear);
  }

  // Public methods
  return {

    $simple: function (handler_key) {
      _simple(handler_key);
    },

    // advance form


    // simple.
    init: function () {

      // Elements
      element = document.querySelector('#kt_header_search');

      // return if the element doesn't exist in the DOM
      if (!element) return;


      wrapperElement = element.querySelector('[data-kt-search-element="wrapper"]');
      formElement = element.querySelector('[data-kt-search-element="form"]');
      mainElement = element.querySelector('[data-kt-search-element="main"]');
      resultsElement = element.querySelector('[data-kt-search-element="results"]');
      emptyElement = element.querySelector('[data-kt-search-element="empty"]');

      preferencesElement = element.querySelector('[data-kt-search-element="preferences"]');
      preferencesShowElement = element.querySelector('[data-kt-search-element="preferences-show"]');
      preferencesDismissElement = element.querySelector('[data-kt-search-element="preferences-dismiss"]');

      advancedOptionsFormElement = element.querySelector('[data-kt-search-element="advanced-options-form"]');
      advancedOptionsFormShowElement = element.querySelector('[data-kt-search-element="advanced-options-form-show"]');
      advancedOptionsFormCancelElement = element.querySelector('[data-kt-search-element="advanced-options-form-cancel"]');
      advancedOptionsFormSearchElement = element.querySelector('[data-kt-search-element="advanced-options-form-search"]');

      // Initialize search handler
      searchObject = new KTSearch(element);

      // Demo search handler
      searchObject.on('kt.search.process', processs);

      // Ajax search handler
      //searchObject.on('kt.search.process', processsAjax);

      // Clear handler
      searchObject.on('kt.search.clear', clear);

      // Custom handlers
      handlePreferences();
      handleAdvancedOptionsForm();
    }
  };
};

const PB_extend_search = fun();
export default PB_extend_search;