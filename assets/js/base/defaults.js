/*
 ---------------------------------------------
 @@defaults.js
 ------------
 all defaults collection for plugins and render functions.
 *
 ---------------------------------------------
 */
import {CLS, deF, rdR, STYLE} from "./const.js";

export const _dc = {
  render: {
    common: {
      number   : {
        type  : rdR.common.params.num.number,
        round : 2,
        prefix: false,
        suffix: false,
      },
      currency : {
        curr : 'INR',
        round: 2,
        sign : false,
        end  : false,
      },
      date     : {
        format: rdR.common.params.date.default,
        color : false
      },
      gap      : {
        refdate: false,
        method : rdR.common.params.gap.days,
        color  : false, /* [prime, black, danger, info, warn, succ, metal, light, gray5, gray6, gray7, gray8, gray9] */
      },
      image    : {
        path: rdR.common.params.img.media,
      },
      percent  : {
        mark : 0,
        round: 0,
        color: false
      },
      weightage: {
        mark : 1,
        total: 1,
        round: 0,
        count: 1,
      },
      trim     : {
        type: rdR.common.params.trim.edge,
      },
      progress : {
        mark : 100,
        value: 0,
      },
      style    : {
        style: '',
        value: '',
      },
      symbol   : {},
      display  : {},
      checkbox : {
        value: 0,
      },
      icon     : {
        type: rdR.common.params.icon.keen,
      },
      badge    : {
        style: 'light',
        tag  : 'colors'
      },
      tag      : {
        key  : 'default',
        color: '0',
      },
      combo    : {
        class: 'rc_text',
      }
    },
    menu  : {
      param: {
        left_value: {
          method: rdR.common.methods.currency,
          param : {
            round: 0,
            sign : 1
          }
        },
        left_stack: {
          head: {
            method: rdR.common.methods.currency,
            param : {
              round: 0,
              sign : 1
            }
          },
          body: {
            method: rdR.common.methods.currency,
            param : {
              round: 0,
              sign : 1
            }
          },
          foot: {
            method: rdR.common.methods.number,
            param : {
              type : rdR.common.params.num.number,
              round: 0,
            }
          }
        },
      }
    },
    table : {
      params: {
        date    : {},
        amount  : {
          round: 2,
          sign : 0,
          end  : 0,
        },
        account : {},
        text    : {},
        note    : {},
        checkbox: {},
        dropdown: {
          multiple: {
            1: {
              icon : 'view',
              name : 'card',
              value: 'view',
              text : 'View Profile'
            },
            2: {
              icon : 'edit',
              name : 'card',
              value: 'view',
              text : 'Edit Account'
            },
            3: {
              icon : 'delete',
              name : 'action',
              value: 'delete',
              text : 'Delete Account'
            }
          }
        },
        number  : {},
        button  : {},
        icon    : {
          type: rdR.common.params.icon.keen
        }
      },
      styles: {
        // this is default to collect the sample and start your own.
        default : {
          in : {},
          out: {
            warp : false,
            align: 'l',
            minw : false,
            w    : false,
            fw   : 500,
            cls  : false,
          }
        },
        date    : {
          in : false,
          out: {
            warp : false,
            align: 'l',
            minw : 150
          }
        },
        amount  : {
          in : false,
          out: {
            warp : false,
            align: 'r',
            minw : 150,
          },
        },
        account : {
          in : false,
          out: {
            warp : false,
            align: 'l',
            minw : 150,
          },
        },
        text    : {
          in : false,
          out: {
            warp : true,
            align: 'l',
            minw : false,
          },
        },
        note    : {
          in : false,
          out: {
            warp : true,
            align: 'l',
            minw : false,
          },
        },
        checkbox: {
          in : false,
          out: {
            warp : true,
            align: 'l',
            minw : 50,
          },
        },
        dropdown: {
          in : false,
          out: {
            warp : false,
            align: 'r',
            minw : 100,
          },
        },
        number  : {
          in : false,
          out: {
            warp : false,
            align: 'l',
            minw : false,
          }
        },
        icon    : {
          in : {
            align: 'center',
            color: 'dark',
            size : '2'
          },
          out: {
            warp : false,
            align: 'c',
            minw : 50,
          }
        },
        button  : {
          in : false,
          out: {
            warp : false,
            align: 'r',
            minw : 100,
          }
        },
        input   : {
          in : false,
          out: {
            warp : false,
            align: 'c',
            minw : 100,
          }
        },
      }
    }
  },

  plugin: {
    formKeen  : {
      splitter : {
        size: 4,
        max : 2
      },
      block    : {
        text   : 'text',
        color  : 'text-info',
        opacity: 5
      },
      maxlength: {
        placement: 'top-right',
        warn     : 'danger',
        limit    : 'success',
      }
    },
    sweetAlert: {
      // title, text, footer
      text: ['title is missing', undefined, undefined],
      // [status, text, class]
      button: {
        confirm: [false, 'Confirm', 'btn btn-primary'],
        deny   : [false, 'Deny', 'btn btn-danger'],
        cancel : [false, 'Cancel', 'btn btn-secondary'],
        close  : [false, 'Close', ''],
      },
      basic : {
        icon    : 1, // 1: info, 2: success, 3: warning, 4: error, 5: question
        position: 5, // 9 points grid [top: 1,2,3, center: 4,5,6, bottom: 7,8,9]
        timer   : undefined, // 2000 => 2 seconds.
        backdrop: true,
      },
      keys  : {
        enter: false, // allowEnterKey
        esc  : false, // allowEscapeKey
        out  : false, // allowOutsideClick
      }
    },
  },

  define: {
    form_valid: {
      param: {
        form_sno: 0,
        method  : deF.form_promise.method.inbuild
      }
    }
  }
}