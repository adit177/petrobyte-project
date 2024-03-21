/*
 ---------------------------------------------
 @@elements.js
 ------------
 HTML elements management for the layout.
 * format to create a variable: _{name of layout}LE
 * inside the object add all
 *
 * all is globally accessible.
 * all are zone child elements.
 ---------------------------------------------
 */

/*
 * any extra data that is required for further changes as per the event
 * this is generated on the basis of user action.
 */
import {Lyt} from "./const.js";


export const _pageLE = {
  zones     : {
    //    starter : '#starter',
    //    sheet   : '#sheet',
    sidebar   : 'kt_app_sidebar',
    breadcrumb: 'kt_app_breadcrumb'
    //    transact: '#transact',
    //    modals  : '#modals',
  },
  page      : 'whole layout',
  sidebar   : 'all menu buttons',
  breadcrumb: 'the name of the page'
};

// sheet layout
export const _sheetLE = {
  zones    : {
    starter  : '#starter__' + Lyt.sheets,
    sheet    : '#sheet__' + Lyt.sheets,
    templates: '#templates__' + Lyt.sheets,
    transact : '#transact__' + Lyt.sheets,
    modals   : '#modals__' + Lyt.sheets,
  },
  recollect: {},
  layout   : 'whole layout',
  starter  : 'description to be added.',
  sheet    : 'description to be added.',
  templates: 'description to be added.',
  transact : 'description to be added.',
  modals   : 'description to be added.',
};

// report layout
export const _reportLE = {
  zones    : {
    nav: `#nav__${Lyt.reports}`,
    // in layout -> nav
    navbar: `#navbar__${Lyt.reports}`,
    navtab: `#navtab__${Lyt.reports}`,
    // in layout -> navtab
    eagle  : `#eagle__${Lyt.reports}`,
    tiger  : `#tiger__${Lyt.reports}`,
    lion   : `#lion__${Lyt.reports}`,
    bear   : `#bear__${Lyt.reports}`,
    wolf   : `#wolf__${Lyt.reports}`,
    shark  : `#shark__${Lyt.reports}`,
    dolphin: `#dolphin__${Lyt.reports}`,
    // in layout
    templates: `#templates__${Lyt.reports}`,
  },
  recollect: {},
  layout   : 'whole layout',

  nav   : 'contains collection of zones',
  navbar: 'navlink zone',
  navtab: 'contains all target buttons',

  eagle  : 'contains eagle zone',
  tiger  : 'contains tiger zone',
  lion   : 'contains lion zone',
  bear   : 'contains bear zone',
  wolf   : 'contains wolf zone',
  shark  : 'contains shark zone',
  dolphin: 'contains dolphin zone',

  templates: 'contains templates'
};

// listing layout
export const _listingLE = {
  zones    : {
    // in layout
    form    : `#form__${Lyt.listing}`,
    action  : `#action__${Lyt.listing}`,
    tabs    : `#tabs__${Lyt.listing}`,
    intro   : `#intro__${Lyt.listing}`,
    template: `#templates__${Lyt.listing}`,
    // in layout -> tabs
    cards: `#cards__${Lyt.listing}`,
    table: `#table__${Lyt.listing}`,
  },
  recollect: {},
  // in layout
  layout  : 'whole layout',
  form    : 'contains the form Element',
  action  : 'tab button to open targeted card and table',
  tabs    : 'contains cards and tables',
  intro   : 'contains into video',
  template: 'contains the template Element',
  // in layout -> tabs
  cards: 'contains the card Element inside tabs',
  table: 'contains the table Element inside tabs',
};

// panels layout
export const _panelLE = {
  zones    : {
    // in layout
    search  : '#search__' + Lyt.panels,
    outcome : '#outcome__' + Lyt.panels,
    modal   : '#modal__' + Lyt.panels,
    template: '#templates__' + Lyt.panels,
    // in layout -> outcome
    aside: '#aside__' + Lyt.panels,
    nav  : '#nav__' + Lyt.panels,
    // in layout -> outcome -> nav
    navbar: '#navbar__' + Lyt.panels,
    navtab: '#navtab__' + Lyt.panels,
  },
  recollect: {
    search: '#search',
  },
  layout   : 'whole layout',
  search   : 'contains the search functionality for select accounts',
  outcome  : 'contains details',
  aside    : 'contains all actions',
  nav      : 'contains the all nav buttons which hold the id of element',
  navbar   : 'contains  the  nav buttons and target Elements',
  navtab   : 'contains  the  nav buttons and target Elements',
  modal    : 'store modals that required in the page.',
  template : 'all required templates for the page',
}

// tables layout
export const _tableLE = {
  zones    : {
    water   : `#water__${Lyt.tables}`,
    sea     : `#sea__${Lyt.tables}`,
    lake    : `#lake__${Lyt.tables}`,
    river   : `#river__${Lyt.tables}`,
    pond    : `#pond__${Lyt.tables}`,
    pool    : `#pool__${Lyt.tables}`,
    tank    : `#tank__${Lyt.tables}`,
    template: `#templates__${Lyt.tables}`,
  },
  state    : {},
  recollect: {},
  layout   : 'whole layout',
  template : 'contains all template',
  water    : "",
  sea      : "",
  lake     : "",
  river    : "",
  pond     : "",
  pool     : "",
  tank     : ""
};

// cards layout
export const _cardLE = {
  zones    : {
    // in layout
    home     : `#home__${Lyt.cards}`,
    boards   : `#boards__${Lyt.cards}`,
    tables   : `#tables__${Lyt.cards}`,
    templates: `#templates__${Lyt.cards}`,
    // in home
    menu : `#menu__${Lyt.cards}`,
    start: `#start__${Lyt.cards}`,
    // in layout -> cards
    new : `#new__${Lyt.cards}`,
    edit: `#edit__${Lyt.cards}`,
    list: `#list__${Lyt.cards}`,
    view: `#view__${Lyt.cards}`,
    cate: `#cate__${Lyt.cards}`,
  },
  state    : {
    menu     : `#menu__${Lyt.cards}`, // left menu.
    table    : `#tables__${Lyt.cards}`, // view table.
    view_card: `#view__${Lyt.cards}`, // view customer.
    list_card: `#list__${Lyt.cards}`, // list customer.
  },
  recollect: {},
  layout   : 'whole layout',
  home     : 'contains the home page',
  boards   : 'contains the boards page',
  tables   : 'contains the tables page',
  // in layout -> home
  menu : 'highlight the important information inside the menu',
  start: 'contains staring page of the card layout',
  // in layout -> boards
  new : 'contains the add form',
  edit: 'contains the edit form',
  list: 'load the table',
  view: 'load the target id details in graphical form and table form',
  cate: 'load the category form',
  // template
  templates: 'hold all templates'
}

// tabs layout
export const _tabLE = {
  zones    : {
    // in layout
    tabs    : '#tabs__' + Lyt.tabs,
    result  : '#result__' + Lyt.tabs,
    template: '#templates__' + Lyt.tabs,
    // in layout -> tabs
    control: '#control__' + Lyt.tabs,
    action : '#action__' + Lyt.tabs,
  },
  recollect: {},
  layout   : 'whole layout',
  tabs     : 'form to fill detail/s and get result as table',
  result   : 'table that contains data as per form submitted from :tabs',
  control  : 'tab button to open targeted card in tab pane',
  action   : 'tab panel to add details and submit form',
  template : 'to store all templates.'
}

export const _calendarLE = {
  zones: {
    modal   : "#modal__" + Lyt.calendar,
    template: "#templates__" + Lyt.calendar,
    panel   : "#panel__" + Lyt.calendar,
  },

  recollect: {},
  layout   : "whole layout",
  modal    : "store modals that required in the page.",
  templates: 'contains the template Element',
  panel    : "contains the calendar Element",
}

// button layout
export const _buttonLE = {
  zones    : {
    // in layout
    controls: '#controls__' + Lyt.buttons,
    // in layout -> control
    menu   : '#menu__' + Lyt.buttons,
    buttons: '#buttons__' + Lyt.buttons,
    // in layout.
    forms : '#forms__' + Lyt.buttons,
    tables: '#tables__' + Lyt.buttons,
    cards : '#cards__' + Lyt.buttons,
    modals: '#modals__' + Lyt.buttons,
    // in layout.
    elements : '#elements__' + Lyt.buttons,
    tabs     : '#tabs_zone__' + Lyt.buttons,
    templates: '#templates__' + Lyt.buttons,
  },
  recollect: {},
  states   : {
    menu  : '#menuList',
    search: '#search-card-table'
  },
  layout   : 'whole layout',
  controls : 'contains collection of zones which are dynamic',
  menu     : 'highlight the important information inside the menu',
  buttons  : 'button to open form and table for a target card',
  forms    : 'contains all forms of the page',
  tables   : 'contains all tables of the page',
  cards    : 'contains all cards of the page',
  modals   : 'store modals that required in the page.',
  elements : 'contains the collection of elements',
  tabs     : 'tab button to open targeted card in tab pane',
  templates: 'contains the template Element',
  append   : []
}

// kanban layout
export const _kanbanLE = {
  zones    : {
    // in layout
    controls: '#controls__' + Lyt.kanban,
    // in layout -> control
    menu   : '#menu__' + Lyt.kanban,
    buttons: '#buttons__' + Lyt.kanban,
    // in layout.
    forms : '#forms__' + Lyt.kanban,
    tables: '#tables__' + Lyt.kanban,
    cards : '#cards__' + Lyt.kanban,
    modals: '#modals__' + Lyt.kanban,
    // in layout.
    elements : '#elements__' + Lyt.kanban,
    tabs     : '#tabs_zone__' + Lyt.kanban,
    templates: '#templates__' + Lyt.kanban,
  },
  recollect: {},
  layout   : 'whole layout',
  controls : 'contains collection of zones which are dynamic',
  menu     : 'highlight the important information inside the menu',
  buttons  : 'button to open form and table for a target card',
  forms    : 'contains all forms of the page',
  tables   : 'contains all tables of the page',
  cards    : 'contains all cards of the page',
  modals   : 'store modals that required in the page.',
  elements : 'contains the collection of elements',
  tabs     : 'tab button to open targeted card in tab pane',
  templates: 'contains the template Element',
  append   : []
}

// dashboard layout
export const _dashboardLE = {
  zones    : {
    chart   : `#chart__${Lyt.dashboard}`,
    template: `#templates__${Lyt.dashboard}`,
  },
  recollect: {},
  layout   : 'whole layout',
  chart    : 'contains all chart',
  template : 'contains all template of html page'
}

// direct layout
export const _directLE = {
  zones    : {
    // layout
    direct   : `#direct__${Lyt.direct}`,
    visits   : `#visits__${Lyt.direct}`,
    summary  : `#summary__${Lyt.direct}`,
    nav      : `#nav__${Lyt.direct}`,
    modals   : `#modals__${Lyt.direct}`,
    templates: `#templates__${Lyt.direct}`,
    // layout -> nav
    navbar: `#navbar__${Lyt.direct}`,
    navtab: `#navtab__${Lyt.direct}`,
  },
  recollect: {},
  layout   : 'whole layout',
  direct   : 'description',
  visits   : 'contains all core functions',
  nav      : 'contains navs and tabs',
  modals   : 'contains all modals',
  templates: 'contains all template',
  // layout -> nav
  navbar: 'contains navs',
  navtab: 'contains tabs',
}

export const _wizardLE = {
  zones    : {
    vista   : `#vista__${Lyt.wizards}`,
    present : `#present__${Lyt.wizards}`,
    table   : `#table__${Lyt.wizards}`,
    template: `#templates__${Lyt.wizards}`,
    // in layout -> vista
    search: `#search__${Lyt.wizards}`,
    result: `#result__${Lyt.wizards}`,
    // in layout -> present
    display: `#display__${Lyt.wizards}`,
    design : `#design__${Lyt.wizards}`,
  },
  recollect: {
    present: '#present',
  },
  layout   : 'whole layout',
  vista    : 'parent of search and result zones',
  table    : 'contains the table of the result',
  present  : 'contains the final data of the print or download',
  template : 'contains the templates',
  // in layout -> vista
  search: 'contains search elements',
  result: 'contains the results of the search',
  // in layout -> present
  display: 'contains the display of the result',
  design : 'contains the design of the result',
}

export const _chatsLE = {
  zones    : {
    list    : '#list__' + Lyt.chats,
    panel   : '#panel__' + Lyt.chats,
    modals  : '#modals__' + Lyt.chats,
    template: '#templates__' + Lyt.chats,
    toolbar : "#toolbar__" + Lyt.chats,
    chat    : "#chat__" + Lyt.chats,
    message : "#message__" + Lyt.chats,
    inbox   : "#inbox__" + Lyt.chats,
    compose : "#compose__" + Lyt.chats,
    view    : "#view__" + Lyt.chats,
    // in chat
    box: '#box',
  },
  recollect: {},
  layout   : 'whole layout',
  list     : '',
  chat     : '',
  box      : '',
  modals   : '',
  template : '',
  toolbar  : '',
  message  : '',
  inbox    : "",
  compose  : "",
  view     : "",
}

export const _sampleLE = {
  zones    : {
    ground   : `#ground__${Lyt.sample}`,
    zone_a   : `#zone_a__${Lyt.sample}`,
    zone_b   : `#zone_b__${Lyt.sample}`,
    zone_c   : `#zone_c__${Lyt.sample}`,
    zone_d   : `#zone_d__${Lyt.sample}`,
    zone_e   : `#zone_e__${Lyt.sample}`,
    zone_f   : `#zone_f__${Lyt.sample}`,
    tables   : `#tables__${Lyt.sample}`,
    docx     : `#docx__${Lyt.sample}`,
    templates: `#templates__${Lyt.sample}`,
  },
  recollect: {},
  layout   : 'whole layout',
  ground   : 'ground zone',
  zone_a   : 'zone a',
  zone_b   : 'zone b',
  zone_c   : 'zone c',
  zone_d   : 'zone d',
  zone_e   : 'zone e',
  zone_f   : 'zone f',
  tables   : 'hold all table elements',
  docx     : 'hold all docx elements',
  templates: "contains all template of html page"
}

export const _configLE = {
  zones    : {
    config: '#config__' + Lyt.config,
    nav   : '#nav__' + Lyt.config,
    navbar: '#navbar__' + Lyt.config,
    navtab: '#navtab__' + Lyt.config,
  },
  recollect: {},
  layout   : 'whole layout',
  config   : 'config zone',
  nav      : 'nav zone',
  navbar   : 'navbar zone',
  navtab   : 'navtab zone',
}

export const _stepperLE = {
  zones    : {
    form    : '#form__' + Lyt.stepper,
    modal   : '#modal__' + Lyt.stepper,
    template: '#templates__' + Lyt.stepper,
  },
  recollect: {},
  layout   : 'whole layout',
  form     : 'stepper zone',
  modal    : 'modal zone',
  template : 'hold all templates'
}