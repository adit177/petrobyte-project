/*
 ---------------------------------------------
 @@attribute.js
 ------------
 project based attributes.
 *
 ---------------------------------------------
 */
export const atr = {
  direct: {
    search: 'data-search',
    ignore: 'data-ignore',
    event : 'data-event',
    layout: 'data-layout',
    listen: 'data-listen',
    append: 'data-append',
  },
  event : {
    type   : 'data-e-type',
    name   : 'data-e-name',
    value  : 'data-e-value',
    origin : 'data-e-origin',
    data   : 'data-e-data',
    recall : 'data-e-recall',
    welcome: 'data-e-welcome',
    // to get the nature of the event.
    nature: 'data-e-nature',
    // if we need to ignore a html to listen to any inside event listeners.
    ignore: 'data-e-ignore',
    // if en event work as layout switcher.
    switch: 'data-e-switch',
    // for <input> element.
    listen: 'data-e-listen',
    memory: 'data-e-memory',
    // for page load
    path  : 'data-e-path',
    params: 'data-e-params',
    // to update value from any event trigger.
    catch: 'data-e-catch',
  },
  // status of div element
  status: {
    initiated: 'data-sts-initialized',
    updated  : 'data-sts-updated',
    formatted: 'data-sts-formatted',
    rendered : 'data-sts-rendered',
    loaded   : 'data-sts-loaded',
  },

  load: {
    button: 'data-load-button',
    tab   : 'data-load-tab',
    chart : 'data-load-chart',
    card  : 'data-load-card',
    select: 'data-load-select',
    table : 'data-load-table',
    form  : 'data-load-form',
    page  : 'data-load-page',
    box   : 'data-load-box',
    modal : 'data-load-modal',
    state : 'data-load-state'
  },

  on: {
    change  : 'data-on-change',
    event   : 'data-on-event',
    complete: 'data-on-complete',
    select  : 'data-on-select',
    keyup   : 'data-on-keyup',
    keydown : 'data-on-keydown',
    scroll  : 'data-on-scroll',
    wheel   : 'data-on-wheel',
  },

  dom : {
    control: 'data-dom-control',
    target : 'data-dom-target',
    ignore : 'data-dom-ignore',
    catch  : 'data-dom-catch',
  },
  core: {
    // manage the element
    control: 'data-pb-control',
    layout : 'data-pb-layout',
    method : 'data-pb-method',
    source : 'data-pb-source',
    channel: 'data-pb-channel',
    target : 'data-pb-target',
    child  : 'data-pb-child',
    space  : 'data-pb-space',
    catch  : 'data-pb-catch',
    insert : 'data-pb-insert',

    // preform any runnable action.
    append: 'data-pb-append',
    origin: 'data-pb-origin',
    leave : 'data-pb-leave',
    action: 'data-pb-action',
    update: 'data-pb-update',

    // inner html griding, used into different layouts.
    group   : 'data-pb-group',
    list    : 'data-pb-list',
    chart   : 'data-pb-chart',
    form    : 'data-pb-form',
    template: 'data-pb-template',

    // value holding for element
    param  : 'data-pb-param',
    owner  : 'data-pb-owner',
    name   : 'data-pb-name',
    put    : 'data-pb-put',
    reverse: 'data-pb-reverse',
    reserve: 'data-pb-reserve',
    index  : 'data-pb-index',
    step   : 'data-pb-step',
    id     : 'data-pb-id',
    value  : 'data-pb-value',
    key    : 'data-pb-key',
    welcome: 'data-pb-welcome',
    size   : 'data-pb-size',
    paging : 'data-pb-paging',
    path   : 'data-pb-path',
    prefill: 'data-pb-prefill',
    calling: 'data-pb-calling',
    label  : 'data-pb-label',
  },

  plugins: {
    id: 'data-plugin-id'
  },

  element   : {
    block: 'data-ele-block',
  },
  table     : {
    rowID: 'data-row-id',
  },
  datatables: {
    index: 'data-dts-index',
  },

  inbuild: {
    // to manage loading icon.
    indicator : 'data-kt-indicator',
    search    : 'data-kt-search-element',
    buttons   : 'data-kt-buttons',
    btn_target: 'data-kt-buttons-target',
    init      : 'data-kt-initialized',
  },

  modal: {
    full    : 'data-modal-full',
    scroll  : 'data-modal-scroll',
    backdrop: 'data-modal-backdrop',
    keyboard: 'data-modal-keyboard',
    centered: 'data-modal-centered',
    title   : 'data-modal-title',
    close   : 'data-modal-close',
    dismiss : 'data-modal-dismiss',
  },

  menu: {
    tooltip: 'data-menu-tooltip',
    key    : 'data-menu-key',
    event  : 'data-menu-event',
    text   : 'data-menu-text',
    recall : 'data-menu-recall',
  },

  form: {
    // validation
    valid: 'data-form-valid',
    // form serializing for the current page.
    sno: 'data-form-sno',
    // add this attribute to the button to make it a submit button.
    submit: 'data-form-submit',
    reset : 'data-form-reset',

  },

  // input - used for specification of input
  input: {
    filter   : 'data-i-filter',
    autosize : 'data-i-autosize',
    maxlength: 'data-i-maxlength',
    clipboard: 'data-i-clipboard',
    splitter : 'data-i-splitter',
  },

  // ----------------------------------------------------------------
  // [tagify] - used for specification of tagify
  // ----------------------------------------------------------------
  tagify: {
    class : {
      tags: 'tagify_tags'
    },
    verify: {
      source : 'data-tag-source',
      suggest: 'data-tag-suggest',
    },
    // it takes anything. including whitelist.
    force: 'data-tag-force', // ['0', '1']

    // how many options can be selected.
    max: 'data-tag-max', // ['1', '2', '5', ...]

    // suggestion box looks like list of bundle.
    list: 'data-tag-list', // ['0', '1']

    // used for outin, to target the suggestions
    suggest: 'data-tag-suggest', // ['id of target element']
    items  : 'data-tag-items' // int , number of [-1, infinity, 0, and int number]
  },

  // ----------------------------------------------------------------
  // select - used for specification of select
  // ----------------------------------------------------------------
  select: {
    tack       : 'data-pb-tack',
    placeholder: 'data-pb-placeholder',
    search     : 'data-pb-search', // 0 or 1
    clear      : 'data-pb-allow-clear',
    // it will remove the select from form render.
    ignore: 'data-select-ignore',
    // options -> hold any type of detail into the option.
    options: {
      whoiam : 'data-sel-tackle',
      amount : 'data-sel-amount',
      text   : 'data-sel-text',
      subtext: 'data-sel-subtext',
      alias  : 'data-sel-alias',
      // account => amount, group
      suffix: 'data-sel-suffix',
      prefix: 'data-sel-prefix',
      // account => ledgers
      key3: 'data-sel-key3',
      val3: 'data-sel-val3',
      key4: 'data-sel-key4',
      val4: 'data-sel-val4',
      key5: 'data-sel-key5',
      val5: 'data-sel-val5',
      // image
      color: 'data-sel-color',
      icon : 'data-sel-icon',
      image: 'data-sel-image',
      // custom
      info  : 'data-sel-info',
      date  : 'data-sel-date',
      debit : 'data-sel-debit',
      credit: 'data-sel-credit',
      note  : 'data-sel-note',
      swap  : 'data-sel-swap',
      // text
      badge: 'data-sel-badge',
      desc : 'data-sel-desc',
    }
  },

  // ----------------------------------------------------------------
  // input mask - used for specification of input mask
  // ----------------------------------------------------------------
  mask: {
    extend : 'data-mask-extend',
    options: {
      prefix: 'data-mask-prefix',
      suffix: 'data-mask-suffix',
      min   : 'data-mask-min',
    }
  },

  // ----------------------------------------------------------------
  // repeater - used for specification of repeater
  // ----------------------------------------------------------------
  repeater: {
    // to enable the repeater.
    list   : 'data-repeater-list',
    item   : 'data-repeater-item',
    create : 'data-repeater-create',
    delete : 'data-repeater-delete',
    slideup: 'data-repeater-slideup'
  },

  // ----------------------------------------------------------------
  // validator - used for specification of validator
  // @not in use.
  // ----------------------------------------------------------------
  valid: {
    // to enable the validator for the form.
    form   : 'data-valid-form',
    methods: 'data-valid-methods',
  },

  // ----------------------------------------------------------------
  // date - flatpicker - used for specification of date
  // ----------------------------------------------------------------
  date: {
    instance: 'data-pb-instance',
    type    : 'data-pb-type',
    format  : 'data-date-format'
  },

  // ----------------------------------------------------------------
  // custom functions.
  // ----------------------------------------------------------------
  custom: {
    // common
    round: 'data-cs-round',
    // only for number
    type  : 'data-cs-type',
    prefix: 'data-cs-prefix',
    suffix: 'data-cs-suffix',
    // string
    lane: 'data-cs-lane',
    // only for currency
    end : 'data-cs-end',
    sign: 'data-cs-sign',
    curr: 'data-cs-currency',
    // dates abd gaps
    format : 'data-cs-format',
    refdate: 'data-cs-refdate',
    method : 'data-cs-method',
    color  : 'data-cs-color',
    // class: rc_image, [format of the absolute path, ]
    path: 'data-cs-path',
    // style of the element, class: rc_style
    style: 'data-cs-style',
    tag  : 'data-cs-tag',
    // benchmark value for the percent, rc_percent, rc_average
    mark : 'data-cs-mark',
    total: 'data-cs-total',
    count: 'data-cs-count',
    value: "data-cs-value",
    // hide or slow the element, class: rc_style
    display: 'data-cs-display',
    // other
    limit: 'data-cs-limit',
    class: 'data-cs-class',
  },
  other : {
    search : {
      info_1: 'data-user-info-1',
      info_2: 'data-user-info-2',
      info_3: 'data-user-info-3',
      info_4: 'data-user-info-4'
    },
    stepper: {
      action: 'data-step-action',
    }
  }
};