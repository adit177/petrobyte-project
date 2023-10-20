/*
 ---------------------------------------------
 @@events.js
 ------------
 Event types management.
 *
 ---------------------------------------------
 */
export const eStore = {
  anchor : '',
  element: '',
  button : '',
  select : '',
  input  : ''
}
export const eTypes = {
  // most used
  goto  : 'goto',
  back  : 'back',
  form  : 'form',
  table : 'table',
  card  : 'card',
  view  : 'view',
  load  : 'load',
  action: 'action',
  stack : 'stack',
  open  : 'open',
  shoot : 'shoot',
  export: 'export',
  send  : 'send',
  reset : 'reset',

  // specified
  navtab  : 'navtab',
  tab     : 'tab',
  modal   : 'modal',
  report  : 'report',
  result  : 'result',
  wizard  : 'wizard',
  group   : 'group',
  redirect: 'redirect',
  chart   : 'chart',

  // for input
  feed     : 'feed',
  alter    : 'alter',
  change   : 'change',
  radio    : 'radio',
  amend    : 'amend',
  calculate: 'calculate',

  ignore: 'ignore',
  switch: 'switch',
  // unknown
  mode   : 'mode',  // used into dashboard -> charts -> table
  refresh: 'refresh',
  paging : 'paging',

  // type as handler.
  anchor : 'anchor',
  button : 'button',
  select : 'select',
  input  : 'input',
  element: 'element'
}
export const commonWLE = [
  // handlers
  eTypes.element, eTypes.select, eTypes.button, eTypes.input, eTypes.anchor,
  // common
  eTypes.switch, eTypes.open
];
// white-listed events holding used events in a dedicated layout
export const wlEvent = {
  calendar : [
    eTypes.action, eTypes.modal
  ].concat(commonWLE),
  dashboard: [
    eTypes.chart, eTypes.mode, eTypes.table
  ].concat(commonWLE),
  buttons  : [
    eTypes.form, eTypes.table, eTypes.card,
    eTypes.alter, eTypes.amend, eTypes.change, eTypes.calculate,
    eTypes.load, eTypes.back, eTypes.action, eTypes.navtab,
    eTypes.element, eTypes.modal
  ].concat(commonWLE),
  kanban   : [
    eTypes.load, eTypes.back, eTypes.action, eTypes.card, eTypes.navtab
  ].concat(commonWLE),
  panels   : [
    eTypes.goto, eTypes.load, eTypes.modal, eTypes.back, eTypes.navtab, eTypes.action, eTypes.reset
  ].concat(commonWLE),
  reports  : [
    eTypes.load, eTypes.navtab, eTypes.action, eTypes.back
  ].concat(commonWLE),
  wizards  : [
    eTypes.back, eTypes.redirect, eTypes.load, eTypes.view, eTypes.action
  ].concat(commonWLE),
  sheets   : [
    eTypes.load, eTypes.action, eTypes.back, eTypes.modal, eTypes.table
  ].concat(commonWLE),
  tabs     : [
    eTypes.tab, eTypes.report, eTypes.back
  ].concat(commonWLE),
  cards    : [
    eTypes.card, eTypes.action, eTypes.amend, eTypes.radio, eTypes.input, eTypes.navtab, eTypes.back, eTypes.redirect, eTypes.table, eTypes.change
  ].concat(commonWLE),
  tables   : [
    eTypes.navtab, eTypes.back, eTypes.action, eTypes.card, eTypes.table, eTypes.wizard
  ].concat(commonWLE),
  listing  : [
    eTypes.action, eTypes.navtab, eTypes.alter, eTypes.redirect, eTypes.paging, eTypes.back, eTypes.ignore
  ].concat(commonWLE),
  direct   : [
    eTypes.navtab, eTypes.modal, eTypes.action, eTypes.back, eTypes.load
  ].concat(commonWLE),
  chats    : [
    eTypes.action, eTypes.load, eTypes.modal, eTypes.action, eTypes.goto
  ].concat(commonWLE),
  sample   : [
    eTypes.action, eTypes.load, eTypes.back, eTypes.stack, eTypes.card, eTypes.view, eTypes.modal, eTypes.change
  ].concat(commonWLE),
  config   : [
    eTypes.action, eTypes.load, eTypes.back, eTypes.form, eTypes.table, eTypes.card, eTypes.navtab, eTypes.element
  ].concat(commonWLE),
  stepper  : [
    eTypes.action, eTypes.load, eTypes.feed, eTypes.back, eTypes.modal
  ].concat(commonWLE),
}

// events that should show any loading indicator to the event button when user click.
export const influenceEvents = {
  dashboard: [],
  buttons  : [eTypes.form, eTypes.table, eTypes.card, eTypes.load, eTypes.action, eTypes.navtab, eTypes.element, eTypes.alter],
  panels   : [eTypes.load, eTypes.goto, eTypes.navtab, eTypes.modal, eTypes.action, eTypes.reset],
  reports  : [eTypes.load, eTypes.navtab, eTypes.action],
  sheets   : [eTypes.load, eTypes.action, eTypes.table],
  tabs     : [eTypes.report],
  cards    : [eTypes.card, eTypes.action, eTypes.navtab],
  direct   : [eTypes.navtab, eTypes.modal, eTypes.action],
  tables   : [],
  listing  : [eTypes.action, eTypes.navtab, eTypes.paging],
  wizards  : [eTypes.action, eTypes.load, eTypes.card],
  chats    : [eTypes.action, eTypes.load],
  sample   : [eTypes.action, eTypes.load, eTypes.form, eTypes.table, eTypes.card, eTypes.navtab, eTypes.element],
  config   : [eTypes.action, eTypes.load, eTypes.form, eTypes.table, eTypes.card, eTypes.navtab, eTypes.element],
  stepper  : [eTypes.action, eTypes.load, eTypes.form, eTypes.table, eTypes.card, eTypes.navtab, eTypes.element],
  calendar : [eTypes.action]
}

// events that should not be used in a target JS page, but used into layout.
export const blankEvents = {
  calendar : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  dashboard: {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  buttons  : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  panels   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  reports  : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  sheets   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  tabs     : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button,],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  cards    : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.redirect, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  direct   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.redirect, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  tables   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.goto],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  listing  : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back, eTypes.redirect],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  wizards  : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.redirect, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  chats    : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.redirect, eTypes.back],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  sample   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back, eTypes.redirect],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  config   : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back, eTypes.redirect],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  },
  stepper  : {
    select : [eTypes.select],
    input  : [eTypes.input],
    button : [eTypes.button, eTypes.back, eTypes.redirect],
    element: [eTypes.element],
    anchor : [eTypes.anchor]
  }
}

// event type -> layout name -> event value
export const eValues = {
  card: {
    buttons: {
      search: 'search',
      delete: 'delete',
      view  : 'view',
      edit  : 'edit',
      modal : 'modal', // todo: remove in case of no use.
      create: 'create',
    }
  },
  load: {
    buttons: {
      clearance: 'clearance',
      vendor   : 'vendor',
      loans    : 'loans',
      receipt  : {
        entry   : 'receipt-entry',
        bills   : 'receipt-bills',
        interest: 'receipt-interest',
      }
    }
  },

  action: {
    buttons: {
      save   : 'save',
      reset  : 'reset',
      delete : 'delete',
      edit   : 'edit',
      view   : 'view',
      change : 'change',
      restore: 'restore',
      update : 'update',
      amount : 'amount',
    },
    listing: {
      search : 'search',
      advance: 'advance'
    },
    cards  : {
      save   : 'save',
      reset  : 'reset',
      delete : 'delete',
      disable: 'disable',
      update : 'update',
      add    : 'add',
    },
    stepper: {
      next    : 'next',
      previous: 'previous',
      finish  : 'finish',
      reset   : 'reset',
      resend  : "resend",
    },
  },
}