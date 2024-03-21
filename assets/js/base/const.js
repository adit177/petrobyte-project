/*
 ---------------------------------------------
 @@constant.js
 ------------
 Constants for the Project
 *
 ---------------------------------------------
 */

// Constants for Layouts and Pages

export const Lyt = {
  sample   : 'sample',
  dashboard: 'dashboard',
  buttons  : 'buttons',
  tabs     : 'tabs',
  cards    : 'cards',
  tables   : 'tables',
  panels   : 'panels',
  listing  : 'listing',
  reports  : 'reports',
  sheets   : 'sheets',
  wizards  : 'wizards',
  chats    : 'chats',
  config   : 'config',
  direct   : 'direct',
  stepper  : 'stepper',
  kanban   : 'kanban',
  calendar : 'calendar',
}

// Global Variables
export const glob = {
  env  : 'development', // development
  core : {
    dates: false
  },
  dates: {},
}

// Constants for Plugins
export const plg = {
  selectPicker: {
    method: {
      simple : 'simple',
      account: 'account',
      image  : 'image',
      text   : 'text',
      custom : 'custom',
      tag    : 'tag',
    },
    opts  : {
      simple : {
        default: '1',
        direct : '1',
        withid : '2',
        subtext: '3'
      },
      account: {
        default: '1',
        amount : '1',
        group  : '2',
        ledger : '3'
      },
      image  : {
        default: '1',
        inline : '1',
        rich   : '2'
      },
      text   : {
        default: '1',
        col    : '1',
        end    : '2',
        row    : '3',
        dual   : '4',
        menu   : '5',
        grid   : '6',
      },
      custom : {
        default: '1',
        table  : '1',
        key2   : '2',
        key3   : '3',
        key4   : '4'
      },
      tag    : {
        default: '1',
        single : '1',
      },
    }
  },
  datePicker  : {
    method: {
      simple  : 'simple',
      custom  : 'custom',
      human   : 'human',
      advance : 'advance',
      people  : 'people',
      multiple: 'multiple',
      month   : 'month',
      range   : 'range',
      disable : 'disable',
      enable  : 'enable'
    },
    type  : {
      array: 1,
      range: 2,
      live : 3
    }
  },
  rangePicker : {
    method: {
      all: 'all',
      // a
      simple  : 'simple',
      dropdown: 'dropdown',
      advance : 'advance',
      // b
      date   : 'date',
      month  : 'month',
      quarter: 'quarter',
      // c
      mixed: 'mixed',
      ndays: 'ndays',
      // d
      fiscal: 'fiscal',
    }
  },
  tagify      : {
    source: {
      local : 'local',
      remote: 'remote',
      const : 'constant'
    },
    method: {
      tag    : 'tag',
      select : 'select',
      inout  : 'inout',
      outin  : 'outin',
      advance: 'advance'
    },
    events: {
      add   : 'add',
      remove: 'remove',
      focus : 'focus',
      select: 'dropdown:select'
    }
  },
  inputMask   : {
    method: {
      theall: 'theall',

      amount       : 'amount',
      currency     : 'currency',
      number       : 'number',
      define       : 'define',
      vehicleNumber: 'vehicleNumber',
      mobileNumber : 'mobileNumber',
      gstin        : 'gstin',
      pan          : 'pan',
      ifsc         : 'ifsc',
      volume       : 'volume',
      phone        : 'phone',
      email        : 'email',

      meter     : 'meter',
      date      : 'date',
      collection: 'collection',
      other     : 'other',
    }
  },
  formRepeater: {
    simple : 'simple',
    nested : 'nested',
    advance: 'advance',
    table  : 'table',
  },
  formCombo   : {
    simple : 'simple',
    mixture: 'mixture',
  },
  formValid   : {
    method : {
      length : 'stringLength',
      empty  : 'notEmpty',
      number : 'numeric',
      case   : 'stringCase',
      between: 'between',
      zip    : 'zipCode'
    },
    pack   : {
      submit: {
        name  : 'submit',
        events: ['valid', 'invalid']
      }
    },
    trigger: {
      keys     : {
        field    : 'field',
        form     : 'form',
        validator: 'validator'
      },
      field    : {
        added: 'added',
      },
      form     : {
        notvalidated: 'notvalidated',
        validating  : 'validating',
        invalid     : 'invalid',
        valid       : 'valid',
        reset       : 'reset',
      },
      validator: {
        validated: 'validated',
        invalid  : 'invalid',
      }
    }
  },
  sweetAlert  : {
    method: {
      info   : 'inform',
      close  : 'close',
      timer  : 'timer',
      confirm: 'confirm',
      html   : 'html',
      style  : 'style',
      anchor : 'anchor',
      action : 'action',
      nested : 'nested',
      triple : 'triple',
    },
    type  : {
      alert    : 'alert',
      minimal  : 'minimal',
      toast    : 'toast',
      autoclose: 'autoclose',

      confirm : 'confirm',
      prompt  : 'prompt',
      question: 'question',


      simple  : 'simple',
      html    : 'html',
      callback: 'callback',
      adv     : 'advance',
      custom  : 'custom'
    }
  },
  formKeen    : {
    method: {
      none     : 'none',
      radio    : 'radio',
      slider   : 'slider',
      block    : 'block',
      autosize : 'autosize',
      maxlength: 'maxlength',
      splitter : 'splitter',
    }
  },
  apexChart   : {
    method:
      {
        min: 'minimal',
        sim: 'simple',
        adv: 'advance'
      },
    init  :
      {
        render: 'render',
        reload: 'reload',
      },
    update:
      {
        series : 'series',
        options: 'options',
        append : 'append',
        show   : 'show',
        hide   : 'hide',
        reset  : 'reset',
      }
  }
}

// extend used keys in the project.
export const exT = {
  foreign: {
    combine   : 'single',
    individual: 'double',
    whole     : 'whole',
  },
  collect: {
    states: {
      read: 'read',
      edit: 'edit',
    },
  },
  stepper: {
    action: {
      next    : 'next',
      index   : 'index',
      previous: 'previous',
      finish  : 'finish',
      resend  : 'resend',
      reset   : 'reset',
    },
    index : {
      previous: -1,
      current : 0,
      next    : +1,
      click   : '.',

    }
  },
  append : {
    method: {
      single: 'single',
      loop  : 'loop',
    }
  }
}

// defaults
export const deF = {
  methods     : {
    promise: {
      form  : 'form',
      delete: 'delete',
    }
  },
  form_promise: {
    method: {
      inbuild : 'inbuild',
      callback: 'callback',
      event   : 'event',
    }
  }
}

export const keys = {
  event  : {
    nature: {
      swap    : 'swap',
      open    : 'open',
      clear   : 'clear',
      ignore  : 'ignore',
      back    : 'back',
      forward : 'forward',
      get     : 'get',
      post    : 'post',
      hybrid  : 'hybrid',
      option  : 'option',
      redirect: 'redirect',
    }
  },
  icons  : {
    keen     : 'keen',
    bootstrap: 'bootstrap',
    flat     : 'flat',
    line     : 'line',
  },
  history: {
    // at what location
    state: {
      add    : 'add',
      replace: 'replace',
      ignore : 'ignore',
      //---------------------//

      // [new page open | page changes from navigation]
      page: 'page',

      // load new page into browser by reload or direct call.
      load: 'load',

      // fetch nth step layout in a new page [load]. n = [0,1,2,3....nth page.]
      fetch: 'fetch',

      // nothing to do with the history
      nothing: 'nothing',
      // this to swap in-between multiple cards of a loaded page [page]
      swap   : 'swap',
      request: 'request',
    },
  },
  //css
  css: {
    color: {
      primary  : 'primary',
      secondary: 'secondary',
      success  : 'success',
      danger   : 'danger',
      warning  : 'warning',
      info     : 'info',
      light    : 'light',
      dark     : 'dark',
      white    : 'white',
      muted    : 'muted',
      gray500  : 'gray500',
      gray600  : 'gray600',
      gray700  : 'gray700',
      gray800  : 'gray800',
      gray900  : 'gray900',
    }
  },

  // bucket
  html: {
    template: {
      report_head: 'report_head',
    }
  },

  //  app loading data
  tagData  : {
    colors            : 'colors',
    icons             : 'icons',
    prefix            : 'prefix',
    suffix            : 'suffix',
    ledger_balance_tag: 'ledger_balance_tag',
    voucher_types     : 'voucher_types',
    txn_types         : 'txn_types',
    // about to delete after checking.
    sales_txn  : "sales_txn",
    purds_txn  : "purds_txn",
    payment_txn: "payment_txn",
    receipt_txn: "receipt_txn",
    contra_txn : "contra_txn",
    journal_txn: "journal_txn",
    // -- end
    shift_slots       : "shift_slots",
    device_type       : "device_type",
    device_os         : "device_os",
    device_browser    : "device_browser",
    device_status     : "device_status",
    account_status    : "account_status",
    languages         : "languages",
    user_type         : "user_type",
    vehicle_type      : "vehicle_type",
    notify_mode       : "notify_mode",
    credit_bill_status: "credit_bill_status",
    stock_level_status: "stock_level_status",
  },
  stateData: {
    // general
    dates: 'dates',
    // accounts
    accounts: 'accounts',
    ledgers : 'ledgers',
    masters : 'masters',
    heads   : 'heads',
    groups  : 'groups',
    // customers
    customers: 'customers',
    users    : 'users',
    vehicles : 'vehicles',
    // product
    items     : 'items',
    categories: 'categories',
    units     : 'units',
    // employee
    posts: 'posts'
  }
}

// used keywords in the project.
export const kws = {
  promise  : {
    ajax   : 'AjaxPB',
    bool   : 'Boolean',
    promise: 'Promise',
  },
  words    : {
    main_repeat: 'main-repeater',
    no_repeat  : 'no-repeater',
  },
  env      : {
    dev : 'development',
    pro : 'production',
    test: 'testing',
  },
  history  : {
    back   : 'back',
    forward: 'forward',
    go     : 'go',
    replace: 'replace',
    push   : 'push',
  },
  handleTag: {
    A     : 'anchor',
    BUTTON: 'button',
    // DROPDOWN: 'dropdown',
    INPUT  : 'input',
    SELECT : 'select',
    ELEMENT: 'element',
  },
  handler  : {
    // dropdown: 'dropdown',
    anchor : 'anchor',
    button : 'button',
    select : 'select',
    input  : 'input',
    element: 'element',
  },
  listen   : {
    click  : 'click',
    hover  : 'hover',
    focus  : 'focus',
    blur   : 'blur',
    keyup  : 'keyup',
    keydn  : 'keydown',
    keypr  : 'keypress',
    change : 'change',
    input  : 'input',
    submit : 'submit',
    reset  : 'reset',
    select : 'select',
    select2: 'select2:select',
    scroll : 'scroll',
    resize : 'resize',
    load   : 'load',
    unload : 'unload',
    error  : 'error',
    abort  : 'abort',
    ready  : 'ready',
    start  : 'start',
    stop   : 'stop',
    end    : 'end',
    enter  : 'enter',
    leave  : 'leave',
    drag   : 'drag',
    drop   : 'drop',
  },
  // for casing in initiate of something
  stage: {
    dom   : 'dom',
    page  : 'page',
    layout: 'layout'
  },

  // for data-xxx-catch
  catch : {
    commons: 'commons',
  },
  flow  : {
    forward : 'forward',
    backward: 'backward',
    stable  : 'stable',
  },
  status: {
    hide: 'hide',
    show: 'show',
  },
  //  store noted values for attributes to get query selector.
  attrVal: {
    // general
    name: "name",
    // data-pb-control
    append: "append",
    // data-pb-target, to get trigger for any synthetic event.
    trigger: "trigger",
    // data-e-memory
    lost  : 'lost',
    retain: 'retain',
    found : 'found',
    //
    preload: "preload",
    ignore : "ignore",
  },
  // list of all plugins.
  plugin: {
    date    : 'date',
    combo   : 'combo',
    keen    : 'keen',
    repeater: 'repeater',
    valid   : 'valid',
    mask    : 'mask',
    range   : 'range',
    sel     : 'select',
    tag     : 'tagify',
  },
  // list of all plugins with standard names.
  plugins_on_call: {
    basicForm     : 'basicForm',
    repeatForm    : 'repeatForm',
    apexChart     : 'apexChart',
    dataTables    : 'dataTables',
    formKeen      : 'formKeen',
    formValidation: 'formValid',
    // simplify
    formRepeater: 'repeater',
    formCombo   : 'combo',
    tagifyInput : 'tagify',
    datePicker  : 'date',
    rangePicker : 'range',
    inputMask   : 'mask',
    selectPicker: 'select',
  },
  // list of renders.
  render: {
    common: 'common',
    form  : 'form',
    table : 'table',
    chart : 'chart',
  },
  value : {
    filters: 'filters',
    single : 'single',
    header : 'header',
  },
  attr  : {
    direct : 'direct',
    event  : 'event',
    status : 'status',
    load   : 'load',
    on     : 'on',
    dom    : 'dom',
    pb     : 'core',
    element: 'element',
  },
  labels: {
    dom     : 'dom',
    page    : 'page',
    manual  : 'manual',
    separate: 'separate',
    form    : 'form',
    direct  : 'direct',
    outer   : 'outer',
    value   : 'value',
    instance: 'instance',
    whole   : 'whole',
    object  : 'object',
    array   : 'array',
    mono    : 'mono',
    dual    : 'dual',
  },
  inputs: {
    hidden  : 'hidden',
    radio   : 'radio',
    checkbox: 'checkbox',
    select  : 'select-one',
    selectM : 'select-multiple',
    text    : 'text',
    number  : 'number',
  }
}

// other keywords
export const otR = {
  search: {}
}

// render
export const rdR = {
  //  form
  form:
    {
      method:
        {
          // to select the single element into the form
          single: 'single',

          // just render.
          simple: 'simple',

          // individual plugins init and data render.
          selectOnly: 'select',
          tagifyOnly: 'tagify',

          // all three [simple, nested, advance] types of repeater
          repeater: 'repeater',

          // have multiple plugins.
          advance: 'advance',

          // form and repeater both.
          fusion: 'fusion',

        }
    },
  // Constants for Table Rendering
  table:
    {
      cell:
        {
          date    : 'date',
          amount  : 'amount',
          account : 'account',
          text    : 'text',
          note    : 'note',
          checkbox: 'checkbox',
          dropdown: 'dropdown',
          input   : 'input',
          image   : 'image',
          icon    : 'icon',
          status  : 'status',
          button  : 'button',
          link    : 'link',
          badge   : 'badge',
          number  : 'number'
        },
      mode: {
        date    : {
          simple        : 'simple',
          range         : 'range',
          month         : 'month',
          gap           : 'gap',
          date_w_gap    : 'date_w_gap',
          range_w_text  : 'range_w_text',
          date_w_invoice: "date_w_invoice",
          date_w_range  : "date_w_range",
        },
        amount  : {
          default                  : 'default',
          amount_breakup           : 'amount_breakup',
          amount_w_button          : 'amount_w_button',
          dual_amount_w_percent    : "dual_amount_w_percent",
          triple_amount_column_row : "triple_amount_column_row",
          amount_w_checkbox        : "amount_w_checkbox",
          amount_w_badge           : "amount_w_badge",
          amount_w_percent         : "amount_w_percent",
          amount_w_button_a_percent: "amount_w_button_a_percent",
          amount_w_unit            : "amount_w_unit",
        },
        account : {
          default                : 'default',
          image_text             : 'image_text',
          image_dual_text        : 'image_dual_text',
          account_w_alias        : 'account_w_alias',
          account_alias_w_popover: 'account_alias_w_popover',
        },
        text    : {
          default        : 'default',
          modify         : 'modify',
          row            : 'row',
          column         : 'column',
          column_w_prefix: 'column_w_prefix',
          column_aligned : 'column_aligned',
          row_col        : 'row_col',
          row_col_icon   : 'row_col_icon',
          stack_col      : 'stack_col',
        },
        note    : {
          default   : 'default',
          word_limit: 'word_limit',
          tooltip   : 'tooltip',
          popover   : 'popover',
          expandable: 'expandable',
        },
        checkbox: {
          default : 'default',
          eventble: 'eventble',
        },
        dropdown: {
          single  : 'single',
          multiple: 'multiple',
        },
        number  : {
          default    : 'default',
          percent    : 'percent',
          dual_number: 'dual_number',
          w_unit     : 'w_unit',
          w_percent  : 'w_percent',
          collection : 'collection',
        },
        input   : {
          default : 'default',
          plugin  : 'plugin',
          event   : 'event',
          checkbox: 'checkbox',
          switch  : 'switch',
        },
        image   : {
          simple: 'simple',
          image : 'image',
          label : 'label',
          group : 'group',
        },
        icon    : {
          bootstrap: 'bootstrap',
          keen     : 'keen',
          font     : 'font',
          line     : 'line'
        },
        status  : {
          simple: 'simple',
          badge : 'badge',
        },
        button  : {
          action             : 'action',
          event              : 'event',
          post_event         : 'post_event',
          get_event          : 'get_event',
          two_inline         : 'two_inline',
          three_row_column   : 'three_row_column',
          three_inline_w_icon: 'three_inline_w_icon'
        },
        badge   : {
          default: 'default',
          inside : 'inside',
          corner : 'corner',
        },
        tag     : {
          simple: 'simple',
        }
      }
    },
  // Constants for Chart Rendering
  chart:
    {
      method:
        {
          min: 'minimal',
          sim: 'simple',
          adv: 'advance'
        },
      init  :
        {
          render: 'render',
          reload: 'reload',
        },
      update:
        {
          series : 'series',
          options: 'options',
          append : 'append',
          show   : 'show',
          hide   : 'hide',
          reset  : 'reset',
        }
    },
  // common
  common:
    {
      class  : {
        number   : 'rc_number',
        percent  : 'rc_percent',
        weightage: 'rc_weightage',
        currency : 'rc_currency',
        unit     : 'rc_unit',
        date     : 'rc_date',
        gap      : 'rc_gap',
        string   : 'rc_string',
        trim     : 'rc_trim',
        image    : 'rc_image',
        style    : 'rc_style',
        display  : 'rc_display',
        icon     : 'rc_icon',
        checkbox : 'rc_checkbox',
        symbol   : 'rc_symbol',
        progress : 'rc_progress',
        badge    : 'rc_badge',
        tag      : 'rc_tag',
        combo    : 'rc_combo',
      },
      methods:
        {
          // number related
          number   : 'number',
          percent  : 'percent',
          weightage: 'weightage',
          currency : 'currency',
          unit     : 'unit',
          date     : 'date',
          gap      : 'gap',
          string   : 'string',
          trim     : 'trim',
          style    : 'style',
          month    : 'month',
          image    : 'image',
          display  : 'display',
          checkbox : 'checkbox',
          symbol   : 'symbol',
          progress : 'progress',
          icon     : 'icon',
          badge    : 'badge',
          tag      : 'tag',
          combo    : 'combo',
        },
      mode   :
        {
          update: 'update',
          return: 'return',
        },
      // params
      params: {
        num   : {
          plain  : 'plain',
          number : 'number',
          reading: 'reading',
          mobile : 'mobile',
        },
        trim  : {
          none     : 'none',
          all      : 'all',
          split    : 'split',
          newline  : 'newline',
          edge     : 'edge',
          dualspace: 'dual',
        },
        string: {
          status: 101,
          type  : 20,
          action: 30,
        },
        date  : {
          // date
          default: 'df',
          from   : 'fo',
          to     : 'to',
          dc     : 'dc',
          // standards
          fd_fmi_fy_d: 'fd_fmi_fy_d',
          fd_sms_fy_d: 'fd_sms_fy_d',
          fd_sms_fy_c: 'fd_sms_fy_c',
          fd_sms_sy_c: 'fd_sms_sy_c',
          fd_fms_g   : 'fd_fms_g',
          fd_fmi_fy_s: 'fd_fmi_fy_s',
          fd_fmi_sy_d: 'fd_fmi_fy_d',
          sms_fd_fy_c: 'sms_fd_fy_c',
          fd_sms     : "fd_sms",
          sd_smi     : "sd_smi",
          sd_sms_sy_c: 'sd_sms_sy_c',
          // months
          smi   : 'smi',
          fmi   : 'fmi',
          sms   : 'sms',
          fmi_sy: 'fmi_sy',
          fmi_fy: 'fmi_fy',
          fms   : 'fms',
          sms_sy: 'sms_sy',
          fms_fy: 'fms_fy',
          fms_sy: 'fms_sy',
          sms_fy: "sms_fy",
          // year
          sy: 'sy',
          fy: 'fy',
          // quarter
          sq: 'sq',
          fq: 'fq',
          // week
          day : 'day',
          week: 'week',
          fd  : 'fd'
        },
        gap   : {
          day   : 'day',
          days  : 'days',
          detail: 'detail',
        },
        img   : {
          media : 'media',
          users : 'user',
          avatar: 'avatar',
        },
        icon  : {
          bootstrap: 'bootstrap',
          keen     : 'keen',
          font     : 'font',
          line     : 'line',
        },
        badge : {
          solid       : 'solid',
          light       : 'light',
          square      : 'square',
          square_light: 'square_light',
          circle      : 'circle',
          circle_light: 'circle_light',
          outline     : 'outline',
        }
      },
    },

  // menu render
  menu:
    {
      tags: {
        menu  : 'menuList',
        button: 'buttonList'
      },
      role: {
        new   : 'new',
        update: 'update'
      },
      mode: {
        left: 'left',
      },
      type: {
        value : 'value', // used into buttons layout.
        stack : 'stack', // used into cards layout.
        bar   : 'bar', // used into panel layout.
        button: 'button', // used into chats layout
      }
    },

  // modal render
  modal: {
    method: {
      basic     : 'basic',
      fullscreen: 'fullscreen',
      stacked   : 'stacked',
      long      : 'long',
      scroll    : 'scroll',
      draggable : 'draggable',
    }
  }
}

// CSS classes
export const CLS = {
  // simple display classes
  display: {
    h_me  : 'hide-me',
    s_me  : 'show-me',
    none  : 'd-none',
    active: 'active',
    flex  : 'd-flex',
  },
  // for aside menu
  aside: {
    active: 'active',
    open  : ['hover', 'show'],
    left  : ['hover', 'show', 'hiding'],

  },
  // visibility for element.
  visible: {
    // navbar-tab
    navs: {
      bar: {active: 'active'},
      tab: {active: ['active', 'show']},
    },
  },
  // color classes
  colors : {
    array: [
      'dark', 'primary', 'danger',
      'info', 'warning', 'success',
      'secondary', 'light'
    ],
    b    : 'dark',
    p    : 'primary',
    d    : 'danger',
    i    : 'info',
    w    : 'warning',
    s    : 'success',
    m    : 'secondary',
    l    : 'light'
  },
  screen : {
    full: {
      all: ['col-xxl-12', 'col-xl-12', 'col-lg-12', 'col-md-12'],
    },
    cols: {
      charts: {
        wide: ['col-lg-12 col-md-12'],
        full: ['col-12', 'col-md-12', 'col-xxl-12'],
        half: ['col-12', 'col-md-6', 'col-xxl-6'],
      },
    }
  },
  custom : {
    dropdownBtn: 'btn btn-sm btn-color-gray-800 btn-light-secondary w-100 px-3 hover-scale text-capitalize'
  },
  table  : {
    set_1  : 'table table-row-dashed table-row-gray-300 align-middle gs-0 gy-3',
    child_1: 'table table-row-dashed table-row-gray-300 align-middle gs-0 gy-3',
  },
  symbol : {
    label : 'symbol-label',
    circle: 'symbol-circle',
    square: 'symbol-square',
    ratio : 'symbol-2by3'
  },
  cluster: {
    input   : {
      default   : 'form-control',
      solid     : 'form-control form-control-solid',
      trans     : 'form-control form-control-transparent',
      default_sm: 'form-control form-control-sm',
      solid_sm  : 'form-control form-control-solid form-control-sm',
      trans_sm  : 'form-control form-control-transparent form-control-sm',
      default_lg: 'form-control form-control-lg',
      solid_lg  : 'form-control form-control-solid form-control-lg',
      trans_lg  : 'form-control form-control-transparent form-control-lg',
    },
    checkbox: {
      default: 'form-check',
      custom : 'form-check form-check-custom form-check-solid',
      color  : (color = 'primary') => `form-check form-check-custom form-check-solid form-check-${color}`
    },
    switch  : {
      default: 'form-check form-switch',
      custom : 'form-check form-switch form-check-custom form-check-solid',
      color  : (color = 'primary') => `form-check form-switch form-check-custom form-check-solid form-check-${color}`
    },
    menu    : {
      small : 'fw-semibold fs-7 py-3 w-125px',
      medium: 'fw-semibold fs-7 py-3 w-150px',
      large : 'fw-semibold fs-7 py-3 w-200px',
      link  : 'border border-2 border-gray-100',
    },
    button  : {
      drop_just: 'btn btn-sm btn-light btn-active-light-primary',
      drop_full: 'btn btn-sm btn-color-gray-800 btn-light-secondary w-100 px-3 text-capitalize',

      full : 'btn btn btn-color-gray-800 btn-active-light-primary w-100 px-3 hover-scale text-capitalize',
      small: 'btn btn-sm btn-color-gray-800 btn-active-light-primary w-100 px-3 hover-scale text-capitalize',
      link : 'btn btn-link hover-scale',
    },
    event   : {
      small_active: (color = 'info', width = 'w-100', cls = '') => `btn btn-sm py-1 ${cls} btn-active-light-${color} w-100`,
      small_light : (color = 'info', width = 'w-100', cls = '') => `  btn btn-sm py-1 ${cls} btn-light-${color} ${width}`,
    },
    image   : {
      rounded: 'rounded-circle',
      square : 'rounded rounded-4',
    },
    symbol  : {
      circle: 'symbol-label fs-1 fw-bold text-gray-700'
    },
    text    : {
      basic  : 'text-grey-600',
      success: 'text-success',
      danger : 'text-danger',
      dark   : 'text-dark',
    },
  },
  badge  : {
    solid         : 'badge badge',
    light         : 'badge badge-light',
    square        : 'badge badge-square badge',
    square_light  : 'badge badge-square badge-light',
    square_outline: 'badge badge-outline badge-square badge',
    circle        : 'badge badge-circle badge',
    circle_light  : 'badge badge-circle badge-light',
    circle_outline: 'badge badge-outline badge-circle badge',
    outline       : 'badge badge-outline badge',
  }
}

// CSS direct Class Access
export const STYLE = {
  color      : {
    prime  : 'text-primary',
    black  : 'text-dark',
    danger : 'text-danger',
    info   : 'text-info',
    warning: 'text-warning',
    success: 'text-success',
    metal  : 'text-secondary',
    light  : 'text-light',
    gray1  : 'text-gray-100',
    gray2  : 'text-gray-200',
    gray3  : 'text-gray-300',
    gray4  : 'text-gray-400',
    gray5  : 'text-gray-500',
    gray6  : 'text-gray-600',
    gray7  : 'text-gray-700',
    gray8  : 'text-gray-800',
    gray9  : 'text-gray-900',
  },
  color_plate: {
    plus : [],
    minus: [],
    base : ['text-danger', 'text-danger', 'text-warning', 'text-info', 'text-success', 'text-dark'],
  },
  align      : {
    l: 'text-start',
    c: 'text-center',
    r: 'text-end'
  },
  fs         : {
    1: 'fs-1',
    2: 'fs-2',
    3: 'fs-3',
    4: 'fs-4',
    5: 'fs-5',
    6: 'fs-6',
    7: 'fs-7',
  },
  fw         : {
    400: 'fw-light',
    500: 'fw-normal',
    600: 'fw-semibold',
    700: 'fw-bold',
    800: 'fw-bolder'
  },
  minw       : {
    25 : 'min-w-25px',
    50 : 'min-w-50px',
    75 : 'min-w-75px',
    100: 'min-w-100px',
    125: 'min-w-125px',
    150: 'min-w-150px',
    200: 'min-w-200px',
    250: 'min-w-250px',
    300: 'min-w-300px',
    350: 'min-w-350px',
    400: 'min-w-400px',
  },
  w          : {
    25 : 'w-25px',
    50 : 'w-50px',
    75 : 'w-75px',
    100: 'w-100px',
    125: 'w-125px',
    150: 'w-150px',
    200: 'w-200px',
    250: 'w-250px',
    300: 'w-300px',
    350: 'w-350px',
    400: 'w-400px',
  }
};


// static data
export const sD = {}