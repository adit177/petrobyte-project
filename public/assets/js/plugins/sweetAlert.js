import {glob, kws, plg} from "../base/const.js";
import {_dc} from "../base/defaults.js";
// Class definition
var fun = function () {

  // Shared variables
  const sw_const = {
    position: [
      'none',
      'top-start', 'top', 'top-end',
      'center-start', 'center', 'center-end',
      'bottom-start', 'bottom', 'bottom-end'
    ],
    icons   : [
      'none',
      'info', 'success', 'warning', 'error', 'question'
    ]
  };

  let templates = {
    alert    : {},
    minimal  : {},
    autoclose: {},
    toast    : {},
    confirm  : {},
  }

  // Private functions
  // callback functions.
  const cb_confirm = () => {
    console.log('confirmed callback');
    return true;
  }
  const cb_cancel = () => {
    console.log('canceled callback');
    return false;
  }
  const cb_denied = () => {
    console.log('denied callback');
    return false;
  }
  const _initialize = function () {
    //    console.log('initialize sweetAlert2 plugin');

    // todo: load all profiles and hold them.

    //    console.log(swal_template(plg.sweetAlert.type.alert));
    templates.alert = swal_template(plg.sweetAlert.type.alert);
    templates.minimal = swal_template(plg.sweetAlert.type.minimal);
    templates.autoclose = swal_template(plg.sweetAlert.type.autoclose);
    templates.toast = swal_template(plg.sweetAlert.type.toast);
    templates.confirm = swal_template(plg.sweetAlert.type.confirm);
  }
  const swal_template = function (type) {
    const t_alert = () => {
      return Swal.mixin({
        position: 'center',
        icon    : 'info',

        allowEnterKey    : false,
        allowEscapeKey   : false,
        allowOutsideClick: false,

        showConfirmButton: true,
        confirmButtonText: "Okay, Got it!",
        showCancelButton : false,
      });
    }

    const t_minimal = () => {
      return Swal.mixin({
        icon             : undefined,
        position         : 'center',
        showConfirmButton: false,
      });
    }

    const t_autoclose = () => {
      return Swal.mixin({
        position         : 'center',
        icon             : 'info',
        allowEnterKey    : false,
        allowEscapeKey   : false,
        allowOutsideClick: false,
        timer            : 2000,
        showConfirmButton: false,
      });
    };

    const t_toast = () => {
      return Swal.mixin({
        toast            : true,
        position         : 'top-end',
        showConfirmButton: false,
        timer            : 3000,
        timerProgressBar : true,
        didOpen          : (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    };

    const t_confirm = () => {
      return Swal.mixin({
        position         : 'center',
        icon             : 'info',
        allowEnterKey    : false,
        allowEscapeKey   : false,
        allowOutsideClick: false,
      });
    }

    switch (type) {
      case plg.sweetAlert.type.alert:
        return t_alert();
      case plg.sweetAlert.type.minimal:
        return t_minimal();
      case plg.sweetAlert.type.autoclose:
        return t_autoclose();
      case plg.sweetAlert.type.toast:
        return t_toast();
      case plg.sweetAlert.type.confirm:
        return t_confirm();

      default:
        console.log('swal_template: type not found.');
    }

  }
  const swal_options = function (params) {

    // get text options.
    const o_text = () => {
      return {
        title : params.text[0] ?? _dc.plugin.sweetAlert.text[0],
        text  : params.text[1] ?? _dc.plugin.sweetAlert.text[1],
        footer: params.text[2] ?? _dc.plugin.sweetAlert.text[2],
      }
    }

    const o_basics = () => {
      const icon_val = params.basic[0] ?? _dc.plugin.sweetAlert.basic.icon;
      const position_val = params.basic[1] ?? _dc.plugin.sweetAlert.basic.position;
      return {
        icon    : sw_const.icons[icon_val],
        position: sw_const.position[position_val],
        timer   : params.basic[2] ?? _dc.plugin.sweetAlert.basic.timer,
        backdrop: params.basic[3] ?? _dc.plugin.sweetAlert.basic.backdrop,
      }
    }

    const o_button = () => {

      let classes = {}, confirm, cancel, deny;
      // confirm button.
      if (params.button.confirm === undefined || params.button.confirm[0] === false) {
        confirm = {
          showConfirmButton: false,
        }
      }
      else {
        confirm = {
          showConfirmButton: params.button.confirm[0],
          confirmButtonText: params.button.confirm[1] ?? _dc.plugin.sweetAlert.button.confirm[1],
        }
        classes.confirm = params.button.confirm[2] ?? _dc.plugin.sweetAlert.button.confirm[2];
      }

      // cancel button.
      if (params.button.cancel === undefined || params.button.cancel[0] === false) {
        cancel = {
          showCancelButton: false,
        }
      }
      else {
        cancel = {
          showCancelButton: params.button.cancel[0],
          cancelButtonText: params.button.cancel[1] ?? _dc.plugin.sweetAlert.button.cancel[1],
        }
        classes.cancel = params.button.cancel[2] ?? _dc.plugin.sweetAlert.button.cancel[2];
      }

      // deny button.
      if (params.button.deny === undefined || params.button.deny[0] === false) {
        deny = {
          showDenyButton: false,
        }
      }
      else {
        deny = {
          showDenyButton: params.button.deny[0],
          denyButtonText: params.button.deny[1] ?? _dc.plugin.sweetAlert.button.deny[1],
        }
        classes.deny = params.button.deny[2] ?? _dc.plugin.sweetAlert.button.deny[2];
      }
      // custom class
      const custom_class = {
        customClass: {
          confirmButton: classes.confirm ?? '',
          cancelButton : classes.cancel ?? '',
          denyButton   : classes.deny ?? '',
        }
      }
      const styling = {
        buttonsStyling: false,
      }
      return Object.assign(confirm, cancel, deny, custom_class, styling);
    }

    const o_keys = () => {
      if (params.keys !== undefined) {
        return {
          allowEnterKey    : params.keys[0] ?? _dc.plugin.sweetAlert.keys.enter,
          allowEscapeKey   : params.keys[1] ?? _dc.plugin.sweetAlert.keys.esc,
          allowOutsideClick: params.keys[2] ?? _dc.plugin.sweetAlert.keys.out,
        }
      }
    }

    const o_confirm = () => {

    }


    // final merger.
    let final = {};
    final.text = o_text();
    final.basics = o_basics();
    final.button = o_button();
    final.keys = o_keys();
    final.confirm = o_confirm();

    return Object.assign(final.text, final.basics, final.button);
  }


  const handle_callback = async function (result, cb = {
    confirm: cb_confirm,
    cancel : cb_cancel,
    deny   : cb_denied,
  }) {

    console.log(cb);

    if (result.isConfirmed) {
      return await cb.confirm !== undefined ? cb.confirm() : cb_confirm();
    }
    else if (result.isDenied) {
      return await cb.deny !== undefined ? cb.deny() : cb_denied();
    }
    else if (result.isDismissed) {
      return await cb.cancel !== undefined ? cb.cancel() : cb_cancel();
    }
  }


  const _alert = (params) => {

    const options = swal_options(params);

    glob.env === kws.env.dev
      ? console.log(options)
      : false;
    templates.alert.fire(options);
  }

  const _minimal = (params) => {

    const options = swal_options(params);

    templates.minimal.fire(options);
  }

  const _autoclose = (params) => {

    const options = swal_options(params);

    templates.autoclose.fire(options);
  }

  const _toast = (params) => {

    const options = swal_options(params);

    templates.toast.fire(options);
  }

  const _confirm = (params) => {

    const options = swal_options(params);

    // When the user clicks a button, the Promise returned by Swal.fire() will be resolved with the SweetAlertResult object:
    return templates.confirm.fire(options).then(function (result) {
      return handle_callback(result, params.callbacks);
    });
  }

  // Public methods
  return {
    $_page: function () {
      _initialize();
    },
    // alert function
    $_alert    : function (text, button, basic) {
      const params = {
        text  : text,
        button: button,
        basic : basic,
      }
      _alert(params);
    },
    $_minimal  : function (text, button) {
      const params = {
        text  : text,
        button: button,
      }
      _minimal(params);
    },
    $_autoclose: function (text, button, timer) {
      const params = {
        text  : text,
        button: button,
        timer : timer,
      }
      _autoclose(params);
    },

    $_toast: function (text, timer) {
      const params = {
        text : text,
        timer: timer,
      }
      _toast(params);
    },

    $_confirm: function (text, button, basic, callbacks) {
      const params = {
        text     : text,
        button   : button,
        basic    : basic,
        callbacks: callbacks,
      }
      return _confirm(params);
    }

  };
};

const plg_sweetAlert = fun();
export default plg_sweetAlert;