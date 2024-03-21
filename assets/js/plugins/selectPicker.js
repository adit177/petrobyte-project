import {plg, kws} from "../base/const.js";
import {atr} from "../base/attributes.js";

const select2Events = [
  'select2:open',
  'select2:close',
  'select2:select',
  'select2:unselect',
  'select2:selecting',
  'select2:unselecting',
  'select2:clear',
  'select2:opening',
  'select2:closing',
  'select2:clearing',
  'select2:select2-loaded',
  'select2:select2-ready',
  'select2:select2-close',
  'select2:select2-opening',
  'select2:select2-removing',
  'select2:select2-removed'
];


// Class definition
var fun = function () {
  /*
   // links for select2
   1. https://select2.org/configuration/options-api
   2.
   */

  // Shared variables
  let template, matcher;
  let span, temp;
  let _tackle, _method;

  // Private functions
  const placeholder = (item) => {
    return item.element.getAttribute(atr.select.placeholder);
  }

  // -------------------- Common functions
  const createSpan = () => {
    return document.createElement('span');
  }

  /*
   ----------------------------------------------------------------
   TEMPLATES
   ----------------------------------------------------------------
   All Templates.
   ----
   */

  /*
   * ----------------------------------------------------------------
   * SIMPLE
   * ----------------------------------------------------------------
   */

  /**
   * a simple option creation.
   * three methods are available.
   * [direct, withid, subtext]
   * @param item
   * @returns HTMLElement
   */
  const simpleSelect = (item) => {
    if (!item.id) return item.text;
    template = `<span class="fs-6 text-gray-800 fw-semibold lh-sm">${item.text}</span>`;
    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }

  const simpleResult = (item) => {
    if (!item.id) return item.text;

    // template design
    template = ``;
    const __direct = () => {
      template += `<span class="fs-6 text-gray-800 fw-semibold lh-1">${item.text}</span>`;
    }
    const __withid = () => {
      const st = item.element.hasAttribute(atr.select.options.subtext) && item.element.getAttribute(atr.select.options.subtext) !== '' ? `<span class="fw-normal ps-2 text-gray-700">` + item.element.getAttribute(atr.select.options.subtext) + `</span>` : '';
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-6 text-gray-700 me-2">${item.id}</span>`;
      template += `<span class="fs-6 text-gray-800 fw-semibold lh-1">${item.text}</span>`;
      template += st;
      template += `</div>`;
    }
    const __subtext = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-6 text-gray-800 fw-semibold lh-1">${item.text}</span>`;
      template += `<span class="fw-normal ps-2 text-gray-700">${item.element.getAttribute(atr.select.options.subtext)}</span>`;
      template += `</div>`;
    }

    // data-pb-tack
    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.simple.direct:
        __direct();
        break;
      case plg.selectPicker.opts.simple.withid:
        __withid()
        break;
      case plg.selectPicker.opts.simple.subtext:
        __subtext();
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }


  /*
   * ----------------------------------------------------------------
   * ACCOUNT
   * ----------------------------------------------------------------
   */

  /**
   * a Select configuration for account
   * @param item
   * @returns HTMLElement
   */
  const accountSelect = (item) => {
    if (!item.id) return simpleSelect(item);

    // template design
    template = ``;
    const __amount = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-row">`;
      template += `<span class="fs-6 fw-semibold text-gray-800 lh-1">${item.text}</span>`;
      template += `<span class="fw-normal px-1">${item.element.getAttribute(atr.select.options.amount)}</span>`;
      template += `<span class="text-muted fw-normal">${item.element.getAttribute(atr.select.options.suffix)}</span>`;
      template += `</div>`;
    }
    const __group = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-row">`;
      template += `<span class="fs-6 fw-semibold text-gray-800 lh-1">${item.text}</span>`;
      template += `<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span>`;
      template += `</span></div>`;
    }
    const __ledger = () => {
      __group();
    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.account.amount:
        __amount();
        break;
      case plg.selectPicker.opts.account.group:
        __group();
        break;
      case plg.selectPicker.opts.account.ledger:
        __ledger();
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }
  const accountResult = (item, arg) => {
    if (!item.id) return simpleSelect(item);

    // template design
    template = ``;
    const __amount = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span></span>`;
      template += `<div class="flex-row fs-6">`;
      template += `<span class="fw-normal text-gray-500">${item.element.getAttribute(atr.select.options.prefix)}</span>`;
      template += `<span class="fw-normal text-gray-800 px-1">${item.element.getAttribute(atr.select.options.amount)}</span>`;
      template += `<span class="fs-6 fs-semibold text-${item.element.getAttribute(atr.select.options.color)}">${item.element.getAttribute(atr.select.options.suffix)}</span>`;
      template += `</div></span></div>`;
    }
    const __group = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span></span>`;
      template += `<div class="flex-row fs-6">`;
      template += `<span class="fw-light">${item.element.getAttribute(atr.select.options.prefix)}</span>`;
      template += `<span class="fw-normal px-1">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `</div></span></div>`;
    }
    const __ledger = () => {

      let row = {
        3: ``,
        4: ``,
        5: ``
      };

      for (let i = 3; i < 6; i++) {
        if (item.element.getAttribute(atr.select.options['val' + i]) !== null) {
          row[i] += `<div class="d-flex flex-row fs-6">`;
          row[i] += `<span class="fw-normal ms-5 w-100px">${item.element.getAttribute(atr.select.options['key' + i])}</span>`;
          row[i] += `<span class="fw-normal px-1 me-5">${item.element.getAttribute(atr.select.options['val' + i])}</span>`;
          row[i] += `</div>`;
        }
      }

      template += `<div class="d-flex flex-stack">`;
      //      template += `<span class="">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}</span>`;
      template += `<span class="fw-normal fs-6 fw-semibold text-gray-600 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span>`;
      //      template += `</span>`;
      template += `</div>`;
      template += `<div class="separator separator-dashed my-2"></div>`;

      template += `${row[3]}`
      template += `${row[4]}`
      template += `${row[5]}`

    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.account.amount:
        __amount();
        break;
      case plg.selectPicker.opts.account.group:
        __group();
        break;
      case plg.selectPicker.opts.account.ledger:
        __ledger();
        break;
    }

    // combined into a single element
    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }

  /*
   * ----------------------------------------------------------------
   * CUSTOM
   * ----------------------------------------------------------------
   */

  /**
   *
   * @param item
   * @returns {*}
   */
  const customSelect = (item) => {
    return item.text;
  }
  const customResult = (item) => {
    if (!item.id) return item.text;

    // template design
    template = '';
    const __table = () => {
      template += `<div class="d-flex flex-stack">`
      template += `<span class="fs-5 lh-sm">`;
      template += `<span class="fw-semibold">${item.text}</span>`;
      template += `<span class="fw-normal text-gray-600 ps-2">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `</span>`;
      template += `<span class="text-dark fs-5 ps-2 pt-0 me-5 lh-sm text-end fw-bold">${item.element.getAttribute(atr.select.options.subtext)}</span>`;
      template += `</div>`;
      // table
      template += `<table class="table table-bordered border border-gray-500 p-3 table-rounded table-row-dashed table-row-gray-500 g-0 mb-0">`;
      template += `<tbody><tr>`;
      template += `<td>Date</td><td>:</td><td class="ps-4">${item.element.getAttribute(atr.select.options.date)}</td></tr>`;
      template += `<tr><td>Credited</td><td>:</td><td class="ps-4">${item.element.getAttribute(atr.select.options.debit)}</td></tr>`;
      template += `<tr><td>Debited</td><td>:</td><td class="ps-4">${item.element.getAttribute(atr.select.options.credit)}</td></tr>`;
      template += `<tr><td>Amount</td><td>:</td><td class="ps-4 fw-semibold">${item.element.getAttribute(atr.select.options.amount)}</td>`;
      template += `<tr><td colspan="3" class="text-center text-muted">${item.element.getAttribute(atr.select.options.note)}</td>`;
      template += `</tr></tbody></table>`;
    }
    const __custom_1 = () => {

    }
    const __custom_2 = () => {

    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.custom.table:
        __table();
        break;
      case plg.selectPicker.opts.custom.key1:
        __custom_1()
        break;
      case plg.selectPicker.opts.custom.key2:
        __custom_2();
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }


  /*
   * ----------------------------------------------------------------
   * PERSON
   * ----------------------------------------------------------------
   */
  /**
   *
   * @param item
   * @returns {*}
   */
  const imageSelect = (item) => {
    if (!item.id) return simpleSelect(item);

    const urlPath = '/assets/media/avatars/';

    // template design
    template = ``;
    const __inline = () => {
      let path;
      if (item.element.getAttribute(atr.select.options.image) === '') {
        path = urlPath + 'blank.png';
      }
      else {
        path = urlPath + item.element.getAttribute(atr.select.options.image);
      }
      template += `<div class="d-flex flex-row">`
      template += `<img src="${path}" class="rounded-circle h-15px me-2" alt="image"/>`;
      template += `<span class="fs-6 fw-semibold lh-sm align-self-center">${item.text}</span>`;
      template += `<div>`;
    }
    const __rich = () => {
      __inline();
    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.image.inline:
        __inline();
        break;
      case plg.selectPicker.opts.image.rich:
        __rich()
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }
  const imageResult = (item) => {
    if (!item.id) return simpleSelect(item);

    const urlPath = '/assets/media/avatars/';

    // template design
    template = ``;
    const __inline = () => {
      let path;
      if (item.element.getAttribute(atr.select.options.image) === '') {
        path = urlPath + 'blank.png';
      }
      else {
        path = urlPath + item.element.getAttribute(atr.select.options.image);
      }
      template += `<div class="d-flex flex-row">`
      template += `<img src="${path}" class="rounded-circle h-20px me-2" alt="image"/>`;
      template += `<span class="fs-6 fw-semibold lh-1 align-self-center">${item.text}</span>`;
      template += `<div>`;
    }
    const __rich = () => {
      template += '<div class="d-flex align-items-center">';
      if (item.element.getAttribute(atr.select.options.image) === '') {
        template += `<div class="symbol symbol-40px symbol-circle">`;
        template += `<div class="symbol-label border border-1 border-dark border-opacity-50 fs-2 fw-semibold bg-light-dark text-muted me-3">${item.text.substring(0, 2).toUpperCase()}</div></div>`;
      }
      else {
        const path = urlPath + item.element.getAttribute(atr.select.options.image);
        template += `<img src="${path}" class="rounded-circle h-40px me-3" alt="${item.text}"/>`;
      }
      template += `<div class="d-flex flex-column align-content-center">`
      template += `<span class="fs-5 fw-bold lh-sm">${item.text}</span>`;
      template += `<span class="text-muted fs-5 lh-1">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `</div>`;
      template += `</div>`;
    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.image.inline:
        __inline();
        break;
      case plg.selectPicker.opts.image.rich:
        __rich()
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }

  /*
   * ----------------------------------------------------------------
   * TEXT
   * ----------------------------------------------------------------
   */
  const textSelect = (item) => {
    if (!item.id) return simpleSelect(item);
    // template for options
    temp = ``;
    temp += `<div class="d-flex flex-row">`
    temp += `<span class="fs-6 fw-semibold">${item.text}</span>`;
    temp += `<span class="text-muted fw-normal fs-6 ps-2">${item.element.getAttribute(atr.select.options.alias).substring(0, 10)}</span>`;
    temp += `</div>`;
    // combined into a single span
    span = createSpan();
    span.innerHTML = temp;

    return $(span);
  }
  const textResult = (item) => {
    if (!item.id) return simpleSelect(item);

    // template design
    template = '';
    const __col = () => {
      template += `<div class="d-flex flex-column">`
      template += `<span class="fs-5 fw-bold lh-sm">${item.text}</span>`;
      template += `<span class="text-muted fs-5 ps-2 mt-1 lh-sm">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `</div>`;
    }
    const __end = () => {
      template += `<div class="d-flex flex-column">`
      template += `<span class="fs-5 fw-bold lh-sm">${item.text}</span>`;
      template += `<p class="text-muted fs-5 ps-2 mt-1 mb-0 me-5 lh-sm text-end">${item.element.getAttribute(atr.select.options.text)}</p>`;
      template += `</div>`;
    }
    const __row = () => {
      template += `<div class="d-flex flex-stack">`
      template += `<span class="fs-5 fw-semibold lh-sm">${item.text}</span>`;
      template += `<span class="text-muted fs-5 ps-2 pt-0 me-5 lh-sm text-end">${item.element.getAttribute(atr.select.options.text).substring(0, 15)}</span>`;
      template += `</div>`;
    }
    const __dual = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span>`;
      template += `</span>`;
      template += `</div>`;
      template += `<div class="d-flex flex-stack fs-6">`;
      template += `<span class="fw-normal text-gray-600">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `<span class="fs-6 fw-normal">${item.element.getAttribute(atr.select.options.subtext)}</span>`;
    }
    const __menu = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span>`;
      template += `</span>`;
      template += `</div>`;
      template += `<div class="separator separator-dashed my-2"></div>`;
      // menu row
      template += `<div class="d-flex flex-stack fs-6">`;
      template += `<span class="fw-normal text-gray-600">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `<div>`
      template += `<span class="fs-6 fw-normal">${item.element.getAttribute(atr.select.options.subtext)}</span>`;
      template += `<span class="ms-1 badge badge-light-${item.element.getAttribute(atr.select.options.color)}">${item.element.getAttribute(atr.select.options.badge)}</span></div>`
      template += `</div>`;
    }
    const __grid = () => {
      template += `<div class="d-flex">`;
      template += `<span class="flex-column">`;
      template += `<span class="fs-5 fw-semibold text-gray-800 lh-1">${item.text}<span class="fw-normal fs-7 text-gray-700 ms-2">${item.element.getAttribute(atr.select.options.alias)}</span>`;
      template += `</span>`;
      template += `</div>`;
      template += `<div class="separator separator-dashed my-2"></div>`;
      // 1st row
      template += `<div class="d-flex flex-stack fs-6">`;
      template += `<span class="fw-normal text-gray-700">${item.element.getAttribute(atr.select.options.text)}</span>`;
      template += `<span class="fw-normal px-1 me-5">${item.element.getAttribute(atr.select.options.subtext)}</span>`;
      template += `</div>`;
      // 2nd row
      template += `<div class="d-flex flex-stack fs-6">`;
      template += `<span class="fw-normal text-gray-600">${item.element.getAttribute(atr.select.options.desc)}</span>`;
      template += `<span class="badge badge-light-${item.element.getAttribute(atr.select.options.color)}">${item.element.getAttribute(atr.select.options.badge)}</span>`;
      template += `</div>`;
    }

    switch (item.element.getAttribute(atr.select.options.whoiam)) {
      case plg.selectPicker.opts.text.col:
        __col();
        break;
      case plg.selectPicker.opts.text.end:
        __end();
        break;
      case plg.selectPicker.opts.text.row:
        __row();
        break;
      case plg.selectPicker.opts.text.dual:
        __dual()
        break;
      case plg.selectPicker.opts.text.menu:
        __menu();
        break;
      case plg.selectPicker.opts.text.grid:
        __grid();
        break;
    }

    span = createSpan();
    span.innerHTML = template;

    return $(span);
  }
  /**
   * used to select ledger account where balance is not require to display.
   * @param item
   * @returns {HTMLElement}
   */

  /*
   ----------------------------------------------------------------
   ** core functions **
   ----------------------------------------------------------------
   */

  function matchGroup(params, data) {
    if ($.trim(params.term) === '') {
      return data;
    }
    if (typeof data.children === 'undefined') {
      return null;
    }
    var filteredChildren = [];
    $.each(data.children, function (idx, child) {
      if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) {
        filteredChildren.push(child);
      }
    });
    if (filteredChildren.length) {
      var modifiedData = $.extend({}, data, true);
      modifiedData.children = filteredChildren;
      return modifiedData;
    }
    return null;
  }

  function matchDefault(params, data) {

    // Always return the object if there is nothing to compare
    if (params.term == null || params.term.trim() === '') {
      return data;
    }

    // Do a recursive check for options with children
    if (data.children && data.children.length > 0) {
      // Clone the data object if there are children
      // This is required as we modify the object to remove any non-matches
      var match = $.extend(true, {}, data);

      // Check each child of the option
      for (var c = data.children.length - 1; c >= 0; c--) {
        var child = data.children[c];

        var matches = matcher(params, child);

        // If there wasn't a match, remove the object in the array
        if (matches == null) {
          match.children.splice(c, 1);
        }
      }

      // If any children matched, return the new object
      if (match.children.length > 0) {
        return match;
      }

      // If there were no matching children, check just the plain object
      return matcher(params, match);
    }

    const original = data.text.toLowerCase();
    const term = params.term.toLowerCase();

    // Check if the text contains the term
    if (original.indexOf(term) > -1) {
      return data;
    }
    // check if the attribute contains the term
    for (var attr = 0; attr < data.element.attributes.length; attr++) {

      for (const spoAttrKey in atr.select.options) {
        if (data.element.attributes[atr.select.options[spoAttrKey]]) {
          let duplicate = data.element.getAttribute(atr.select.options[spoAttrKey]).toLowerCase();
          if (duplicate.indexOf(term) > -1) {
            return data;
          }
        }
      }
      // data.element.attributes[attr];
    }
    // check if the id contains the term
    if (data.id.indexOf(term) > -1) {
      return data;
    }

    // If it doesn't contain the term, don't return anything
    return null;
  }

  function checkMatchingSubstring(string1, string2) {
    // Convert both strings to lowercase for case-insensitive comparison
    var lowercaseString1 = string1.toLowerCase();
    var lowercaseString2 = string2.toLowerCase();

    // Check if any substring in string1 matches with string2
    return lowercaseString1.includes(lowercaseString2);
  }

  function OptTemplate(result) {
    switch (_method) {

      case plg.selectPicker.method.simple:
        return result ? simpleResult : simpleSelect;

      case plg.selectPicker.method.account:
        return result ? accountResult : accountSelect;

      case plg.selectPicker.method.custom:
        return result ? customResult : customSelect;

      case plg.selectPicker.method.image:
        return result ? imageResult : imageSelect;

      case plg.selectPicker.method.text:
        return result ? textResult : textSelect;

      default:
        return result ? simpleResult : simpleSelect;
    }
  }

  const __search = (select, option) => {
    if (select.getAttribute(atr.select.search) === '0') {
      option.minimumResultsForSearch = Infinity;
    }
    else {
      // search option
      option.minimumInputLength = 0;
      option.maximumInputLength = 20;
      // advance search bar
      option.matcher = matchDefault
      // if search for optgroup => matchGroup
    }
    return option;
  }

  const __multiple = (select, option) => {
    // options.maximumSelectionLength = 0;
    return option;
  }

  const __dropdownParent = (select, option) => {
    // options.dropdownParent = $('#myModal');
    return option;
  }

  const __tags = (select, option) => {
    const tag_option = {
      tags     : true,
      createTag: function (params) {
        // Trim the input value and remove special characters if desired
        var term = $.trim(params.term);

        // Check if the tag already exists
        //        var existingTag = $.find('option[value="' + term + '"]').val();

        let existingTag;

        const options = select.options;
        console.log(options);
        for (var i = 0; i < options.length; i++) {
          if (checkMatchingSubstring(options[i].text, term)) {
            existingTag = options[i].value;
          }
        }

        if (existingTag) {
          console.log('existingTag', existingTag);
          return null; // Return null to disable creating duplicate tags
        }

        // Return the new tag object
        return {
          id   : term,
          text : term,
          isNew: true
        };
      },
      insertTag: function (data, tag) {
        // Call your backend function here to add the new option
        // You can use Ajax to send the data to the server and handle the backend logic
        if (!data.length) {
          toastr.error('Please enter a valid value');
        }
        console.log('Adding new option:', data, tag);
      }
    }
    select.getAttribute(atr.core.method) === plg.selectPicker.method.tag
      ? Object.assign(option, tag_option)
      : null;

    // return option;
    return option;
  }

  const __events = (selectEle, options) => {

    const select2 = $(selectEle);

    // selecting
    const selecting = () => {
      select2.on('select2:selecting', function (e) {
        var $select = $(this);
        var value = e.params.args.data.id;

        console.log('selecting', e.params.args.data);

        if (value.trim() !== '') {
          $select.append(new Option(value, value, true, true)).trigger('change');
        }

        // Clear the search input
        $select.data('select2').dropdown.$search.val('');
      });
    }

    // open
    const open = () => {
      select2.on('select2:open', function (e) {
        var $select = $(this);
        var $dropdown = $select.data('select2').dropdown;
        var $searchInput = $dropdown.$search;

        console.log('open');

        $dropdown.on('mouseup', function (e) {
          var noResultsFound = $searchInput.val() !== '' && !$dropdown.find('.select2-results li').length;

          if (noResultsFound) {
            // Perform your custom logic here when no results are found
            console.log('No results found');
          }
        });
      });
    }

  }

  const _run = (element, control) => {


    const _form = (form) => {
      _execute(form.querySelectorAll(querySA(atr.core.control, kws.plugin.sel)));
    }

    const _collective = () => {
      element.querySelectorAll('form' + querySA(atr.core.control, control)).forEach((form) => {
        _form(form);
      });
    }

    const _toRun = () => {
      if (element.tagName === 'FORM') {
        control === false || element.getAttribute(atr.core.control) === control
          ? _form(element)
          : printError('form element does not have the control attribute');
      }
      else {
        _collective()
      }
    }
    _toRun();
  }

  const _execute = function (selects) {

    // get the template
    let selectEles;

    selectEles = [].slice.call(selects);
    if (selectEles.length === 0) return;


    selectEles.map(function (selectEle) {
      if (selectEle.getAttribute(atr.status.initiated) === "1") {
        return;
      }// ignore the repeater form select picker.

      _method = selectEle.getAttribute(atr.core.method);
      _tackle = selectEle.getAttribute(atr.select.tack);

      let options = {
        placeholder      : 'add placeholder',
        allowClear       : true,
        selectOnClose    : false,
        templateSelection: OptTemplate(false), //simpleSelect,
        templateResult   : OptTemplate(true), //simpleResult,
      };

      // search option
      options = __search(selectEle, options);

      // multiple
      options = __multiple(selectEle, options);

      // dropdownParent
      options = __dropdownParent(selectEle, options);

      // tags
      options = __tags(selectEle, options);


      $(selectEle).select2(options);

      __events(selectEle, options);

      selectEle.setAttribute(atr.status.initiated, "1");
    });
  }

  const _page = () => {
    // get all the select elements [inside or outside of a form]
    const selectNodeList = PBapp.querySelectorAll(querySA(atr.core.control, kws.plugin.sel));
    // filter out the selects outside a form
    const selectDirects = [].slice.call(selectNodeList).filter((select) => {
      return !select.closest('form');
    });
    // execute:
    _execute(selectDirects);
  }

  // Public methods
  return {
    $_page: function () {
      _page();
    },

    $_manual: function (element, control = false) {
      _run(element, control);
    },

    $_single: function (input) {
      _execute([input]);
    }
  };
};

const plg_selectPicker = fun();
export default plg_selectPicker;