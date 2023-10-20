import {plg, kws} from "../base/const.js";
import {atr} from "../base/attributes.js";
import getTagifyTags from "../bucket/tagify.js";

console.log('tagifyInput.js loaded');


// Class definition
var fun = function () {
  let tagifyObject = {};
  /*
   // plugin links
   1. https://yaireo.github.io/tagify/
   2. https://github.com/yairEO/tagify#events
   */
  // Shared variables
  var method, tags, tagify;

  // Private functions

  const _getData = (input) => {
    // inner functions
    const data_remote = (target) => {
      let tags = '';
      PBapp.querySelectorAll(`.${atr.tagify.class.tags}`).forEach((el) => {
        if (el.getAttribute(atr.tagify.verify.source) === target) {
          tags = el.innerText;
        }
      });
      if (tags === '') {
        toastr.error(`No data found for input`, 'Error to get data from remote.');
        tags = 'NoTags|NoTags|NoTags';
      }
      else {
        // passed.
      }
      return tags.trim().split('|');
    }
    const data_local = (target) => {
      // get data from local storage.
      if (!localStorage.getItem(target)) {
        // add data into local storage.
        localStorage.setItem(target, JSON.stringify({tags: ['test_tagify_1', 'test_tagify_2', 'test_tagify_3']}));
        // notification
        toastr.error(`No data found for input: ${target}`, 'Error to get data from local storage.');
      }
      else {
        // passed.
      }
      return JSON.parse(localStorage.getItem(target)).tags;
    }
    const data_constant = (target = 'tagify') => {
      const Tags = getTagifyTags(target);
      return Tags ? Tags : [];
    }

    // input source method.
    let target = input.getAttribute(atr.core.target) ? input.getAttribute(atr.core.target) : input.name;

    // get the data.
    switch (input.getAttribute(atr.core.channel)) {

      case plg.tagify.source.remote:
        return data_remote(target);

      case plg.tagify.source.local:
        return data_local(target);

      case plg.tagify.source.const:
        return data_constant(target);

    }
  }

  const _getOptions = (input, data) => {

    const _log = () => {
      // console.log(what)
    }
    // https://github.com/yairEO/tagify#settings
    const optionsDefault = {
      default: {
        whitelist       : data,
        blacklist       : [],
        enforceWhitelist: true, // [true, false]
        delimiters      : ",| ",
        backspace       : "edit",
        placeholder     : "Type something",
        tags            : true,
        mode            : 'mix', // [select, mix]
        maxTags         : 2, // int

        callbacks: {
          add   : _log,  // callback when adding a tag
          remove: _log   // callback when removing a tag
        },

        dropdown: {
          // maximum allowed rendered suggestions
          maxItems: 5, //

          // custom classname for this dropdown, so it could be targeted
          // ['tags-custom', 'tagify__inline__suggestions']
          classname: 'tagify__inline__suggestions', // tagify__dropdown__item

          // do not hide the suggestions dropdown once an item has been selected
          closeOnSelect: true,

          // show suggestions after 1 typed character, at 0, select on click.
          enabled: 1, // int [0,1,2,3,4, ...]

          // match only suggestions that starts with the typed characters
          fuzzySearch: false,

          // position suggestions list next to typed text
          position: 'input', // ['manual', 'text', 'input', 'all']

          // allow adding duplicate items if their case is different
          caseSensitive: false,

          highlightFirst: true
        }


        /*
         wrapper, tag, dropdown, dropdownItem, dropdownContent, dropdownHeader, dropdownFooter, dropdownItemNoMatch
         */

      },
    }

    // inner functions

    const option_Tag = (input, options) => {
      // option building
      options.mode = null;
      options.maxTags = input.getAttribute(atr.tagify.max) === null ? 1 : input.getAttribute(atr.tagify.max) === '-1' ? Infinity : input.getAttribute(atr.tagify.max);
      options.dropdown = {
        // by default
        highlightFirst: true,
        enabled       : 0,
        position      : 'input',
        // attribute connected
        closeOnSelect: input.getAttribute(atr.tagify.max) === null || input.getAttribute(atr.tagify.max) === '1',
        maxItems     : input.getAttribute(atr.tagify.items) === null ? 7 : input.getAttribute(atr.tagify.items) === '-1' ? Infinity : input.getAttribute(atr.tagify.items),
        classname    : input.getAttribute(atr.tagify.list) === null ? 'tagify__inline__suggestions' : input.getAttribute(atr.tagify.list) === '1' ? '' : 'tags-custom',
      }

      return options;
    }

    const option_Select = (input, options) => {

      if (input.hasAttribute(atr.tagify.max) && Number(input.getAttribute(atr.tagify.max)) > 1) {
        console.log('kindly changed the `data-tag-max` value to one.');
      }
      // option building
      options.mode = 'select';
      options.dropdown = {
        // by default
        highlightFirst: true,
        enabled       : 0,
        position      : 'all',
        // attribute connected
        closeOnSelect: input.getAttribute(atr.tagify.max) === null || input.getAttribute(atr.tagify.max) === '1',
        maxItems     : input.getAttribute(atr.tagify.items) === null ? 7 : input.getAttribute(atr.tagify.items) === '-1' ? Infinity : input.getAttribute(atr.tagify.items),
        classname    : input.getAttribute(atr.tagify.list) === null ? 'tagify__inline__suggestions' : input.getAttribute(atr.tagify.list) === '1' ? '' : 'tags-custom',
      }

      return options;
    }

    const option_Inout = (input, options) => {
      options.mode = null;
      options.dropdown = {
        // by default
        highlightFirst: true,
        enabled       : 0,
        position      : "input",
        // attribute connected
        closeOnSelect: input.getAttribute(atr.tagify.max) === null || input.getAttribute(atr.tagify.max) === '1',
        maxItems     : input.hasAttribute(atr.tagify.items) === false ? 7 : input.getAttribute(atr.tagify.items) === '-1' ? Infinity : input.getAttribute(atr.tagify.items),
        classname    : input.hasAttribute(atr.tagify.list) === false ? 'tagify__inline__suggestions' : input.getAttribute(atr.tagify.list) === '1' ? '' : 'tags-custom',
      }

      return options;
    }

    const option_Outin = (input, options) => {

      function tagTemplate(tagData) {
        return `
        <tag ${this.getAttributes(tagData)}
                contenteditable="false"
                spellcheck="false"
                tabIndex="-1"
                class="tagify__tag ${tagData.class ? tagData.class : ""}" >
            <x title="" class="tagify__tag__removeBtn" role="button" aria-label="remove tag"></x>
            <div>
                <span class="tagify__tag-text">${tagData.value}</span>
            </div>
        </tag>
    `
      }

      function suggestionItemTemplate(tagData) {
        return `
        <div ${this.getAttributes(tagData)} 
            class="${tagData.class ? tagData.class : ""} tagify__dropdown__item d-flex flex-fill" 
            role="option">
          <span class="mx-2 fs-5 text-gray-800 text-hover-dark">${tagData.value}</span>
        </div>`;
      }

      function dropdownItemNoMatch(tagData) {
        const addInList = input.getAttribute(atr.tagify.force) === '1' ? '' : `<span>press Enter to add <span class="text-gray-700 fw-semibold">${tagData.value}</span> into list</span>`;
        return `
          <div class="empty d-flex flex-column">
            <span>Not Found in the list</span>
            ${addInList}
          </div>`;
      }

      options.dropdown = {
        closeOnSelect : input.getAttribute(atr.tagify.max) === null || input.getAttribute(atr.tagify.max) === '1',
        highlightFirst: true,
        position      : "manual",
        maxItems      : input.getAttribute(atr.tagify.items) === null ? 7 : input.getAttribute(atr.tagify.items) === '-1' ? Infinity : input.getAttribute(atr.tagify.items),
        enabled       : 0,
        classname     : 'customSuggestionsList'
      };
      options.templates = {
        tag                : tagTemplate,
        dropdownItem       : suggestionItemTemplate,
        dropdownItemNoMatch: dropdownItemNoMatch,
      }

      return options;
    }
    const option_Advance = (input, options) => {

      function tagTemplate(tagData) {
        return `
        <tag title="${tagData.email}"
                contenteditable="false"
                spellcheck="false"
                tabIndex="-1"
                class="tagify__tag ${tagData.class ? tagData.class : ""}"
                ${this.getAttributes(tagData)}>
            <x title="" class="tagify__tag__removeBtn" role="button" aria-label="remove tag"></x>
            <div>
                <div class="tagify__tag__avatar-wrap">
                    <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}" alt="">
                </div>
                <span class="tagify__tag-text">${tagData.name}</span>
            </div>
        </tag>
    `
      }

      function suggestionItemTemplate(tagData) {
        return `
        <div ${this.getAttributes(tagData)}
            class="tagify__dropdown__item ${tagData.class ? tagData.class : ""}"
            tabindex="0"
            role="option">
            ${tagData.avatar ? `
            <div class="tagify__dropdown__item__avatar-wrap">
                <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}" alt="">
            </div>` : ''
        }
            <strong>${tagData.name}</strong>
            <span>${tagData.email}</span>
        </div>
    `
      }

      function dropdownHeaderTemplate(suggestions) {
        return `
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length ? `Add remaning ${suggestions.length}` : 'Add All'}</strong>
            <span>${suggestions.length} members</span>
        </div>
    `
      }

      // initialize Tagify on the above input node reference

      const opt = {
        tagTextProp: 'name', // very important since a custom template is used with this property as text
        // enforceWhitelist: true,
        skipInvalid : true, // do not remporarily add invalid tags
        dropdown    : {
          closeOnSelect: false,
          enabled      : 0,
          classname    : 'users-list',
          searchKeys   : ['name', 'email']  // very important to set by which keys to search for suggesttions when typing
        },
        templates   : {
          tag           : tagTemplate,
          dropdownItem  : suggestionItemTemplate,
          dropdownHeader: dropdownHeaderTemplate
        },
        whitelist   : [
          {
            "value" : 1,
            "name"  : "Justinian Hattersley",
            "avatar": "https://i.pravatar.cc/80?img=1",
            "email" : "jhattersley0@ucsd.edu"
          },
          {
            "value" : 2,
            "name"  : "Antons Esson",
            "avatar": "https://i.pravatar.cc/80?img=2",
            "email" : "aesson1@ning.com"
          },
          {
            "value" : 3,
            "name"  : "Ardeen Batisse",
            "avatar": "https://i.pravatar.cc/80?img=3",
            "email" : "abatisse2@nih.gov"
          },
          {
            "value" : 4,
            "name"  : "Graeme Yellowley",
            "avatar": "https://i.pravatar.cc/80?img=4",
            "email" : "gyellowley3@behance.net"
          },
          {
            "value" : 5,
            "name"  : "Dido Wilford",
            "avatar": "https://i.pravatar.cc/80?img=5",
            "email" : "dwilford4@jugem.jp"
          },
          {
            "value" : 6,
            "name"  : "Celesta Orwin",
            "avatar": "https://i.pravatar.cc/80?img=6",
            "email" : "corwin5@meetup.com"
          },
          {
            "value" : 7,
            "name"  : "Sally Main",
            "avatar": "https://i.pravatar.cc/80?img=7",
            "email" : "smain6@techcrunch.com"
          },
          {
            "value" : 8,
            "name"  : "Grethel Haysman",
            "avatar": "https://i.pravatar.cc/80?img=8",
            "email" : "ghaysman7@mashable.com"
          },
          {
            "value" : 9,
            "name"  : "Marvin Mandrake",
            "avatar": "https://i.pravatar.cc/80?img=9",
            "email" : "mmandrake8@sourceforge.net"
          },
          {
            "value" : 10,
            "name"  : "Corrie Tidey",
            "avatar": "https://i.pravatar.cc/80?img=10",
            "email" : "ctidey9@youtube.com"
          },
          {
            "value" : 11,
            "name"  : "foo",
            "avatar": "https://i.pravatar.cc/80?img=11",
            "email" : "foo@bar.com"
          },
          {
            "value" : 12,
            "name"  : "foo",
            "avatar": "https://i.pravatar.cc/80?img=12",
            "email" : "foo.aaa@foo.com"
          },
        ],
        transformTag: (tagData, originalData) => {
          var {
                name,
                email
              } = parseFullValue(tagData.name)
          tagData.name = name
          tagData.email = email || tagData.email
        },
        validate({
                   name,
                   email
                 }) {
          // when editing a tag, there will only be the "name" property which contains name + email (see 'transformTag' above)
          if (!email && name) {
            var parsed = parseFullValue(name)
            name = parsed.name
            email = parsed.email
          }

          if (!name) return "Missing name"
          if (!validateEmail(email)) return "Invalid email"

          return true
        }
      };

      // https://stackoverflow.com/a/9204568/104380
      function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }

      function parseFullValue(value) {
        // https://stackoverflow.com/a/11592042/104380
        var parts = value.split(/<(.*?)>/g),
            name  = parts[0].trim(),
            email = parts[1]?.replace(/<(.*?)>/g, '').trim();

        return {
          name,
          email
        }
      }

      return opt;
    }

    // options
    let option = {};
    // basic binding of options.
    option.whitelist = data;
    option.enforceWhitelist = input.getAttribute(atr.tagify.force) === '1';
    option.maxTags = input.getAttribute(atr.tagify.max) ?? 1;
    option.delimiters = null;
    option.userInput = true;
    //    option.tags = true;
    option.callbacks = {
      // add: console.log,  // callback when adding a tag
      // remove: console.log   // callback when removing a tag
    }

    // building final data.
    switch (input.getAttribute(atr.core.method)) {
      case plg.tagify.method.tag:
        option = option_Tag(input, option);
        break;
      case plg.tagify.method.select:
        option = option_Select(input, option);
        break;
      case plg.tagify.method.inout:
        option = option_Inout(input, option);
        break;
      case plg.tagify.method.outin:
        option = option_Outin(input, option);
        break;
      case plg.tagify.method.advance:
        option = option_Advance(input, option);
        break;
    }

    // method
    return option;
  }

  const customCalling = (input, object) => {

    object.on('add', onAddTag)

    object.on('remove', onRemoveTag);

    object.on('focus', onSelectFocus);

    object.on("dropdown:select", function () {
      console.log("dropdown:select");
    });

    function onAddTag(e) {
      console.log(e.detail.data.value)
    }

    function onRemoveTag(e) {
      console.log(e.detail.data.value);
    }

    function onSelectFocus(e) {
      console.log(e)
    }
  }

  /*
   ----------------------------------------------------------------
   Core Functions
   ----------------------------------------------------------------
   */

  const exe_tagify = (input, options = undefined) => {

    if (input.hasAttribute(atr.status.initiated) && input.getAttribute(atr.status.initiated) === '1') {
      return;
    }

    // getting the options
    const tagOptions = _getOptions(input, _getData(input));

    if (options !== undefined) {
      Object.assign(tagOptions, options);
    }

    const uid = KTUtil.getUniqueId('tagify');
    // initiate the tagify.
    tagify = new Tagify(input, tagOptions);

    // post initiation
    postInitiate(tagify, input);

    // custom functions.
    customCalling(input, tagify);

    // updating the status
    tagifyObject[uid] = tagify;
    input.setAttribute(atr.plugins.id, uid);
    input.setAttribute(atr.status.initiated, '1');
  }

  // initialize
  let _execute = (inputs) => {
    // execute for multiple forms.
    inputs.forEach(exe_tagify);
  }

  const _run = (element, control) => {


    const _form = (form) => {
      _execute(form.querySelectorAll(querySA(atr.core.control, kws.plugin.tag)));
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

  const _single_execute = (input, options) => {
    exe_tagify(input, options);
  }

  const _get = (instanceID, type) => {

    // return the tagify object for given instanceID.
    switch (type ?? kws.labels.instance) {

      case kws.labels.instance:
        return tagifyObject.hasOwnProperty(instanceID) ? tagifyObject[instanceID] : null;

      case kws.labels.value:
        // get value using select event.
        const object = tagifyObject.hasOwnProperty(instanceID) ? tagifyObject[instanceID] : null;
        const _return_x = (x) => {
          return x;
        }
        return object.on(plg.tagify.events.add, (e) => {
          _return_x(e.detail.data.value);
        });
    }
  }

  const postInitiate = (tagify, input) => {

    const post_inout = (tagify, input) => {
      // console.log('i am here - inout');
    }

    const post_outin = (tagify, input) => {

      const id = input.getAttribute(atr.tagify.suggest);
      const Ele = PBapp.querySelector('#' + id);

      if (!Ele.hasAttribute(atr.tagify.verify.suggest)) {
        alert('Invalid suggestion Element');
        return;
      }

      tagify.on("dropdown:show", onSuggestionsListUpdate)
        .on("dropdown:hide", onSuggestionsListHide)
        .on('dropdown:scroll', onDropdownScroll);

      renderSuggestionsList()  // defined down below
      // hideSuggestionsList()  // defined down below

      function onSuggestionsListUpdate({detail: suggestionsElm}) {
        // console.log(suggestionsElm);
      }

      function onSuggestionsListHide() {
        console.log("hide dropdown")
      }

      function onDropdownScroll(e) {
        // console.log(e.detail)
      }

      function renderSuggestionsList() {
        /*
         // list of all functions that can be control by user using event.
         console.log(tagify.dropdown);
         */

        // load the list
        tagify.dropdown.show()
        // append the dropdown list into targeted element.
        Ele.append(tagify.DOM.dropdown);
      }

      function hideSuggestionsList() {
        /*
         // list of all functions that can be control by user using event.
         console.log(tagify.dropdown);
         */

        // load the list
        tagify.dropdown.hide()
        // append the dropdown list into targeted element.
        Ele.innerHTML = '';
      }
    }

    const post_advance = (tagify, input) => {
      // attach events listeners
      tagify.on('dropdown:select', onSelectSuggestion) // allows selecting all the suggested (whitelist) items
        .on('edit:start', onEditStart)  // show custom text in the tag while in edit-mode

      function onSelectSuggestion(e) {
        // custom class from "dropdownHeaderTemplate"
        if (e.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`))
          tagify.dropdown.selectAll();
      }

      function onEditStart(tag, data) {
        tagify.setTagTextNode(tag, `${data.name} <${data.email}>`);
      }
    }


    switch (input.getAttribute(atr.core.method)) {

      case plg.tagify.method.inout:
        post_inout(tagify, input);
        break;

      case plg.tagify.method.outin:
        post_outin(tagify, input);
        break;

      case plg.tagify.method.advance:
        post_advance(tagify, input);
        break;
    }
  }
  const _initialize = () => {
    // todo: it might take data from bucket,
  }

  const _page = () => {
    // get all the select elements [inside or outside of a form]
    const tagifyNodeList = PBapp.querySelectorAll(querySA(atr.core.control, kws.plugin.tag));
    // filter out the selects outside a form
    const tagifyDirects = [].slice.call(tagifyNodeList).filter((tagify) => {
      return !tagify.closest('form');
    });
    console.log(tagifyDirects);
    // execute:
    _execute(tagifyDirects);
  }

  function _destroy(input) {

    // get instance id.
    const id = input.getAttribute(atr.plugins.id);

    // remove the attributes.
    input.removeAttribute(atr.status.initiated);
    input.removeAttribute(atr.plugins.id);

    // destroy the tagify object.
    tagifyObject[id].destroy();

    // remove the tagify object.
    delete tagifyObject[id];
    return true;
  }

  //----------------------------------------------------------------
  // Public methods
  return {
    $_init: function (element) {
      _initialize();
    },
    /**
     *
     */
    $_page: function () {
      _page();
    },

    /**
     *
     * @param element
     * @param control
     */
    $_manual: function (element, control = false) {
      _run(element, control);
    },

    $_single: function (input, option = undefined) {
      _single_execute(input, option);
    },

    /**
     * get the tagify object for given instanceID.
     * @param instanceID
     * @param type
     */
    $_get: function (instanceID, type = undefined) {
      return _get(instanceID, type);
    },

    $_destroy: function (input) {
      return _destroy(input);
    }
  };
};

const plg_tagifyInput = fun();
export default plg_tagifyInput;