class Profiles {

  constructor(name = 'Profile') {
    this.name = name;
  }

  values = {
    date    : {
      simple        : (date) => {return [date]},
      range         : (start_date, end_date) => {return [start_date, end_date]},
      month         : (date) => {return [date]},
      gap           : (date, refDate) => {return [date, refDate]},
      date_w_gap    : (date, refDate) => {return [date, refDate]},
      range_w_text  : (start, end) => {return [start, end]},
      date_w_invoice: (invoice, date) => {return [invoice, date]},
      date_w_range  : (date, start, end) => {return [date, start, end]},
    },
    amount  : {
      default                  : (amount) => { return [amount]},
      amount_breakup           : (left_amount, right_amount) => { return [left_amount, right_amount]},
      amount_w_button          : (amount, event_value) => { return [amount, event_value]},
      dual_amount_w_percent    : (main_amount, value_amount) => { return [main_amount, value_amount]},
      triple_amount_column_row : (main_amount, left_amount, right_amount) => { return [main_amount, left_amount, right_amount]},
      amount_w_checkbox        : (amount, event_value) => { return [amount, event_value]},
      amount_w_badge           : (amount, badge) => { return [amount, badge]},
      amount_w_percent         : (amount, mark_value) => { return [amount, mark_value]},
      amount_w_button_a_percent: (amount, percentage, event_value) => { return [amount, percentage, event_value]},
      amount_w_unit            : (amount, unit) => { return [amount, unit]},
    },
    account : {
      default                : (account) => { return [account] },
      image_text             : (image, account) => { return [image, account] },
      image_dual_text        : (image, account, description) => { return [image, account, description] },
      account_w_alias        : (account, description) => { return [account, description] },
      account_alias_w_popover: (account, description) => { return [account, description] },
    },
    text    : {
      default        : (text) => { return [text] },
      modify         : (text) => { return [text] },
      row            : (left, right) => { return [left, right] },
      column         : (main, desc) => { return [main, desc] },
      column_w_prefix: (top_left, bottom_right) => { return [top_left, bottom_right] },
      column_aligned : (top, bottom) => { return [top, bottom] },
      row_col        : (left_top, left_bottom, right) => { return [left_top, left_bottom, right] },
      row_col_icon   : (left_top, left_bottom, icon) => { return [left_top, left_bottom, icon] },
      stack_col      : (left_top, left_bottom, right) => { return [left_top, left_bottom, right] },
    },
    note    : {
      default   : (note) => { return [note]},
      word_limit: (note) => { return [note]},
      tooltip   : (note) => { return [note]},
      popover   : (title, note) => { return [title, note]},
      expandable: (note) => { return [note]},
    },
    checkbox: {
      default : (value) => { return [value]},
      eventble: (value) => { return [value]},
    },
    dropdown: {
      single  : (id) => { return [id]},
      multiple: (id) => { return [id]},
    },
    number  : {
      default    : (number) => { return [number] },
      percent    : (value, mark) => { return [value, mark] },
      dual_number: (value, quantity) => { return [value, quantity] },
      w_unit     : (value, unit) => { return [value, unit] },
      w_percent  : (value, mark, badge) => { return [value, mark, badge] },
      collection : (sno, reading, value) => { return [sno, reading, value] },
    },
    input   : {
      default : (value = undefined, id = undefined, min = undefined, max = undefined, length = undefined) => {
        return [value, id, min, max, length]
      },
      plugin  : (value = undefined, id = undefined, min = undefined, max = undefined, length = undefined) => {
        return [value, id, min, max, length]
      },
      event   : (value = undefined, id = undefined, min = undefined, max = undefined, length = undefined) => {
        return [value, id, min, max, length]
      },
      checkbox: (value = undefined) => {
        return [value]
      },
      switch  : (value = undefined) => {
        return [value]
      },
    },
    badge   : {
      default: (value) => {return [value]},
      inside : (value) => {return [value]},
      corner : (value) => {return [value]},
    },
    image   : {
      simple: (image, name) => { return [image, name]},
      image : (image) => { return [image]},
      label : (name) => { return [name]},
      group : (image, name) => { return [image, name]},
    },
    status  : {
      simple: (tag_id) => { return [tag_id] },
      badge : (tag_id) => { return [tag_id] },
    },
    icon    : {
      bootstrap: (icon) => {return [icon]},
      keen     : (icon) => {return [icon]},
      font     : (icon) => {return [icon]},
      line     : (icon) => {return [icon]}
    },
    button  : {
      action             : (value) => { return [value]},
      event              : (value) => { return [value]},
      post_event         : (value) => { return [value]},
      get_event          : (value) => { return [value]},
      two_inline         : (value) => { return [value]},
      three_row_column   : (value) => { return [value]},
      three_inline_w_icon: (value) => { return [value]},
    },
  }

  params = {
    date    : {
      simple        : (format = undefined) => {return {format: format}},
      range         : (from = undefined, to = undefined) => {
        return {
          from: from,
          to  : to
        }
      },
      month         : (format = undefined) => {return {format: format}},
      gap           : (method = undefined) => {return {method: method}},
      date_w_gap    : (format = undefined, method = undefined) => {
        return {
          format: format,
          method: method
        }
      },
      range_w_text  : (from = undefined, to = undefined, text = undefined) => {
        return {
          from: from,
          to  : to,
          text: text
        }
      },
      date_w_invoice: (format = undefined, text = undefined) => {
        return {
          format: format,
          text  : text
        }
      },
      date_w_range  : (from = undefined, to = undefined, format = undefined) => {
        return {
          from  : from,
          to    : to,
          format: format
        }
      },
    },
    amount  : {
      default                  : (round = undefined, sign = undefined, end = undefined) => {
        return {
          round: round,
          sign : sign,
          end  : end
        }
      },
      amount_breakup           : (round = undefined, sign = undefined, end = undefined) => {
        return {
          round: round,
          sign : sign,
          end  : end
        }
      },
      amount_w_button          : (round = undefined, sign = undefined, eName = undefined, eValue = undefined, text = undefined) => {
        return {
          round : round,
          sign  : sign,
          eName : eName,
          eValue: eValue,
          text  : text
        }
      },
      dual_amount_w_percent    : (round = undefined, sign = undefined, end = undefined, text = undefined) => {
        return {
          round: round,
          sign : sign,
          end  : end,
          text : text
        }
      },
      triple_amount_column_row : (round = undefined, sign = undefined, end = undefined, round_2 = undefined, sign_2 = undefined) => {
        return {
          round  : round,
          sign   : sign,
          end    : end,
          round_2: round_2,
          sign_2 : sign_2
        }
      },
      amount_w_checkbox        : (round = undefined, sign = undefined, name = undefined, value = undefined) => {
        return {
          round: round,
          sign : sign,
          name : name,
          value: value
        }
      },
      amount_w_badge           : (round = undefined, sign = undefined, end = undefined) => {
        return {
          round: round,
          sign : sign,
          end  : end
        }
      },
      amount_w_percent         : (round = undefined, sign = undefined, end = undefined, text = undefined) => {
        return {
          round: round,
          sign : sign,
          end  : end,
          text : text
        }
      },
      amount_w_button_a_percent: (round = undefined, sign = undefined, text = undefined, value = undefined, name = undefined) => {
        return {
          round: round,
          sign : sign,
          text : text,
          value: value,
          name : name
        }
      },
      amount_w_unit            : (round = undefined, sign = undefined, unit = undefined) => {
        return {
          round: round,
          sign : sign,
          unit : unit
        }
      },
    },
    account : {
      default                : () => { return {} },
      image_text             : (path = undefined) => { return {path: path} },
      image_dual_text        : (path = undefined) => { return {path: path} },
      account_w_alias        : () => { return {} },
      account_alias_w_popover: (title = undefined, placement = undefined) => {
        return {
          title    : title,
          placement: placement
        }
      },
    },
    text    : {
      default        : (info = undefined) => {return {info: info}},
      modify         : (info = undefined) => {return {info: info}},
      row            : () => {return {}},
      column         : () => {return {}},
      column_w_prefix: (left = undefined, right = undefined) => {
        return {
          left : left,
          right: right
        }
      },
      column_aligned : () => {return {}},
      row_col        : () => {return {}},
      stack_col      : () => {return {}},
      row_col_icon   : () => {return {}},
      /*
       w_percent      : () => {return {}},
       collection     : () => {return {}},
       */
    },
    note    : {
      default   : () => { return {}},
      word_limit: (limit = undefined) => { return {limit: limit}},
      tooltip   : (span = undefined) => { return {span: span}},
      popover   : (placement = undefined, text = undefined) => {
        return {
          placement: placement,
          text     : text
        }
      },
      expandable: () => { return {}},
    },
    checkbox: {
      default : (name = undefined, label = undefined) => {
        return {
          name : name,
          label: label
        }
      },
      eventble: () => { return {}},
    },
    dropdown: {
      single  : (name = undefined, trigger = undefined, button = {
        name : undefined,
        value: undefined,
        text : undefined
      }) => {
        return {
          name   : name,
          trigger: trigger,
          button : button
        }
      },
      multiple: (name = undefined, trigger = undefined, size = undefined, icon = undefined, buttons = {
        0: {
          icon : undefined,
          name : undefined,
          value: undefined,
          text : undefined,
        }
      }) => {
        return {
          name   : name,
          trigger: trigger,
          size   : size,
          icon   : icon,
          buttons: buttons
        }
      },
    },
    number  : {
      default    : (type = undefined, round = undefined) => {
        return {
          type : type,
          round: round
        }
      },
      percent    : (round = undefined) => { return {round: round}},
      dual_number: (type = undefined, round = undefined, joiner = undefined) => {
        return {
          type  : type,
          round : round,
          joiner: joiner
        }
      },
      w_unit     : (type = undefined, round = undefined) => {
        return {
          type : type,
          round: round
        }
      },
      w_percent  : (type = undefined, round = undefined, unit = undefined) => {
        return {
          type : type,
          round: round,
          unit : unit
        }
      },
      collection : (type = undefined, round = undefined, net = undefined) => {
        return {
          type : type,
          round: round,
          net  : net
        }
      },
    },
    input   : {
      default : (name = undefined, placeholder = undefined, title = undefined) => {
        return {
          name       : name,
          placeholder: placeholder,
          title      : title
        }
      },
      plugin  : (name = undefined, plugin = undefined, method = undefined, placeholder = undefined, title = undefined, required = undefined) => {
        return {
          name       : name,
          plugin     : plugin,
          method     : method,
          placeholder: placeholder,
          title      : title,
          required   : required
        }
      },
      event   : (name = undefined, plugin = undefined, method = undefined, placeholder = undefined, title = undefined, listen = undefined, eventType = undefined, eventValue = undefined, find = undefined, inputType = undefined) => {
        return {
          name       : name,
          plugin     : plugin,
          method     : method,
          placeholder: placeholder,
          title      : title,
          listen     : listen,
          type       : eventType,
          value      : eventValue,
          find       : find,
          input      : inputType
        }
      },
      checkbox: (listen = undefined, type = undefined, value = undefined, name = undefined, text = undefined) => {
        return {
          listen: listen,
          type  : type,
          value : value,
          name  : name,
          text  : text,
        }
      },
      switch  : (listen = undefined, type = undefined, value = undefined, name = undefined, text = undefined) => {
        return {
          listen: listen,
          type  : type,
          value : value,
          name  : name,
          text  : text,
        }
      },
    },
    badge   : {
      default: (badge = undefined, tag = undefined) => {
        return {
          badge: badge,
          tag  : tag
        }
      },
      inside : (badge = undefined, tag = undefined) => {
        return {
          badge: badge,
          tag  : tag
        }
      },
      corner : (badge = undefined, tag = undefined) => {
        return {
          badge: badge,
          tag  : tag
        }
      },
    },
    image   : {
      simple: (path = undefined) => { return {path: path}},
      image : (path = undefined) => { return {path: path}},
      label : () => { return {}},
      group : (length = undefined, type = undefined) => {
        return {
          length: length,
          type  : type
        }
      },
    },
    status  : {
      simple: (tag = undefined, color = undefined) => {
        return {
          tag  : tag,
          color: color
        }
      },
      badge : (tag = undefined, badge = undefined, color = undefined) => {
        return {
          tag  : tag,
          badge: badge,
          color: color
        }
      },
    },
    icon    : {
      bootstrap: (type = undefined) => { return {type: type}},
      keen     : (type = undefined) => { return {type: type}},
      font     : (type = undefined) => { return {type: type}},
      line     : (type = undefined) => { return {type: type}},
    },
    button  : {
      action             : (nature = undefined, type = undefined, value = undefined, text = undefined, recall = undefined, icon = undefined, pluck = undefined) => {
        return {
          nature: nature,
          type  : type,
          value : value,
          text  : text,
          recall: recall,
          icon  : icon,
          pluck : pluck
        }
      },
      event              : (nature = undefined, type = undefined, value = undefined, text = undefined) => {
        return {
          nature: nature,
          type  : type,
          value : value,
          text  : text
        }
      },
      post_event         : (type = undefined, value = undefined, text = undefined) => {
        return {
          type : type,
          value: value,
          text : text
        }
      },
      get_event          : (type = undefined, value = undefined, text = undefined) => {
        return {
          type : type,
          value: value,
          text : text
        }
      },
      two_inline         : () => { return {}},
      three_row_column   : (type = {
        left : undefined,
        right: undefined,
        down : undefined
      }, value                   = {
        left : undefined,
        right: undefined,
        down : undefined
      }, icon                    = {
        left : undefined,
        right: undefined,
        down : undefined
      }, text                    = {
        left : undefined,
        right: undefined,
        down : undefined
      }) => {
        return {
          type : type,
          value: value,
          icon : icon,
          text : text
        }
      },
      three_inline_w_icon: (type = {
        left  : undefined,
        center: undefined,
        right : undefined,
      }, value                   = {
        left  : undefined,
        center: undefined,
        right : undefined,
      }, icon                    = {
        left  : undefined,
        center: undefined,
        right : undefined,
      }, text                    = {
        left  : undefined,
        center: undefined,
        right : undefined,
      }) => {
        return {
          type : type,
          value: value,
          icon : icon,
          text : text
        }
      },
    },
  }

  styles = {
    date    : {
      simple        : (cls_in = undefined, cls_out = undefined) => {
        return {
          in: cls_in,
        }
      },
      range         : (from = undefined, to = undefined, isSame = true) => {
        return {
          from: from,
          to  : isSame ? from : to
        }
      },
      month         : (cls = undefined) => {return {in: cls}},
      gap           : (cls = undefined) => {return {in: cls}},
      date_w_gap    : (date = undefined, gap = undefined) => {
        return {
          date: date,
          gap : gap
        }
      },
      range_w_text  : (date = undefined, text = undefined) => {
        return {
          date: date,
          text: text
        }
      },
      date_w_invoice: (invoice = undefined, date = undefined, text = undefined) => {
        return {
          invoice: invoice,
          date   : date,
          text   : text
        }
      },
      date_w_range  : (date = undefined, from = undefined, to = undefined, isSame = true) => {
        return {
          date: date,
          from: from,
          to  : isSame ? from : to
        }
      },
    },
    amount  : {
      default                  : (cls = undefined) => { return {in: cls}},
      amount_breakup           : (left = undefined, right = undefined) => {
        return {
          left : left,
          right: right
        }
      },
      amount_w_button          : (amount = undefined, button = undefined, icon = undefined) => {
        return {
          amount: amount,
          button: button,
          icon  : icon
        }
      },
      dual_amount_w_percent    : (amount = undefined, value = undefined, percent = undefined) => {
        return {
          amount : amount,
          value  : value,
          percent: percent
        }
      },
      triple_amount_column_row : (main = undefined, other = undefined) => {
        return {
          main : main,
          other: other
        }
      },
      amount_w_checkbox        : (amount = undefined, button = undefined, icon = undefined) => {
        return {
          amount: amount,
          button: button,
          icon  : icon
        }
      },
      amount_w_badge           : (amount = undefined, badge = undefined) => {
        return {
          amount: amount,
          badge : badge
        }
      },
      amount_w_percent         : (amount = undefined, text = undefined, percent = undefined) => {
        return {
          amount : amount,
          text   : text,
          percent: percent
        }
      },
      amount_w_button_a_percent: (amount = undefined, text = undefined, percent = undefined, button = undefined, icon = undefined) => {
        return {
          amount : amount,
          text   : text,
          percent: percent,
          button : button,
          icon   : icon
        }
      },
      amount_w_unit            : (amount = undefined, unit = undefined) => {
        return {
          amount: amount,
          unit  : unit
        }
      },
    },
    account : {
      default                : (cls = undefined) => { return {in: cls} },
      image_text             : (size = undefined, symbol = undefined, image = undefined, text = undefined) => {
        return {
          size  : size,
          symbol: symbol,
          image : image,
          text  : text
        }
      },
      image_dual_text        : (size = undefined, symbol = undefined, image = undefined, text = undefined, desc = undefined) => {
        return {
          size  : size,
          symbol: symbol,
          image : image,
          text  : text,
          desc  : desc
        }
      },
      account_w_alias        : (text = undefined, desc = undefined) => {
        return {
          text: text,
          desc: desc
        }
      },
      account_alias_w_popover: (text = undefined, desc = undefined) => {
        return {
          text: text,
          desc: desc
        }
      },
    },
    text    : {
      default        : (cls = undefined) => { return {in: cls}},
      modify         : (cls = undefined) => { return {in: cls}},
      row            : (main = undefined, subtext = undefined) => {
        return {
          main   : main,
          subtext: subtext
        }
      },
      column         : (main = undefined, subtext = undefined) => {
        return {
          main   : main,
          subtext: subtext
        }
      },
      column_w_prefix: (suffix = undefined, left = undefined, right = undefined) => {
        return {
          suffix: suffix,
          left  : left,
          right : right
        }
      },
      column_aligned : (top = undefined, bottom = undefined) => {
        return {
          top   : top,
          bottom: bottom
        }
      },
      row_col        : (title = undefined, description = undefined, center = undefined) => {
        return {
          title      : title,
          description: description,
          center     : center
        }
      },
      stack_col      : (title = undefined, description = undefined, center = undefined) => {
        return {
          title      : title,
          description: description,
          center     : center
        }
      },
      row_col_icon   : (title = undefined, description = undefined, icon = undefined) => {
        return {
          title      : title,
          description: description,
          icon       : icon
        }
      },
      /*
       w_percent      : () => {},
       collection     : () => {},
       */
    },
    note    : {
      default   : (cls) => { return {in: cls}},
      word_limit: (cls) => { return {in: cls}},
      tooltip   : (text, tip) => {
        return {
          text,
          tip
        }
      },
      popover   : (text) => { return {text: text}},
      expandable: (cls) => { return {in: cls}},
    },
    checkbox: {
      default : (check = undefined, label = undefined) => {
        return {
          check: check,
          label: label
        }
      },
      eventble: () => { return {}},
    },
    dropdown: {
      single  : (button = undefined, menu = undefined, item = undefined) => {
        return {
          button: button,
          menu  : menu,
          item  : item
        }
      },
      multiple: (button, menu, item, icon) => {
        return {
          button: button,
          menu  : menu,
          item  : item,
          icon  : icon
        }
      },
    },
    number  : {
      default    : (style) => { return {in: style}},
      percent    : (style) => { return {in: style}},
      dual_number: (right = undefined, left = undefined, joiner = undefined) => {
        return {
          right : right,
          left  : left,
          joiner: joiner
        }
      },
      w_unit     : (number = undefined, unit = undefined) => {
        return {
          number: number,
          unit  : unit
        }
      },
      w_percent  : (number = undefined, badge = undefined, percent = undefined) => {
        return {
          number : number,
          badge  : badge,
          percent: percent
        }
      },
      collection : (reading = undefined, bottom = undefined, net = undefined) => {
        return {
          reading: reading,
          bottom : bottom,
          net    : net
        }
      },
    },
    input   : {
      default : (width = undefined, input = undefined) => {
        return {
          width: width,
          input: input
        }
      },
      plugin  : (width = undefined, input = undefined) => {
        return {
          width: width,
          input: input
        }
      },
      event   : (width = undefined, input = undefined) => {
        return {
          width: width,
          input: input
        }
      },
      checkbox: (checkbox = undefined, input = undefined, label = undefined) => {
        return {
          checkbox: checkbox,
          input   : input,
          label   : label,
        }
      },
      switch  : (switch_ = undefined, input = undefined, label = undefined) => {
        return {
          switch: switch_,
          input : input,
          label : label,
        }
      }
    },
    badge   : {
      default: (text = undefined) => {return {text: text}},
      inside : (text = undefined) => {return {text: text}},
      corner : (text = undefined) => {return {text: text}},
    },
    image   : {
      simple: (size = undefined) => {
        return {
          size: size
        }
      },
      image : (size = undefined, symbol = undefined) => {
        return {
          size  : size,
          symbol: symbol
        }
      },
      label : (size = undefined, font = undefined, color = undefined, symbol = undefined) => {
        return {
          size  : size,
          font  : font,
          color : color,
          symbol: symbol
        }
      },
      group : (size = undefined) => {
        return {
          size: size
        }
      },
    },
    status  : {
      simple: (text = undefined) => { return {text: text}},
      badge : (text = undefined) => { return {text: text}},
    },
    icon    : {
      bootstrap: (align = undefined, color = undefined, size = undefined) => {
        return {
          align: align,
          color: color,
          size : size,
        }
      },
      keen     : (align = undefined, color = undefined, size = undefined) => {
        return {
          align: align,
          color: color,
          size : size,
        }
      },
      font     : (align = undefined, color = undefined, size = undefined) => {
        return {
          align: align,
          color: color,
          size : size,
        }
      },
      line     : (align = undefined, color = undefined, size = undefined) => {
        return {
          align: align,
          color: color,
          size : size,
        }
      }
    },
    button  : {
      action             : () => { return {}},
      event              : () => { return {}},
      post_event         : () => { return {}},
      get_event          : () => { return {}},
      two_inline         : () => { return {}},
      three_row_column   : () => { return {}},
      three_inline_w_icon: () => { return {}},
    },
  }

  outline = {
    date    : {
      simple        : () => {return {}},
      range         : () => {return {}},
      month         : () => {return {}},
      gap           : () => {return {}},
      date_w_gap    : () => {return {}},
      range_w_text  : () => {return {}},
      date_w_invoice: () => {return {}},
      date_w_range  : () => {return {}},
    },
    amount  : {
      default                  : (cls = undefined, wrap = undefined, align = undefined) => {
        return {
          cls  : cls,
          wrap : wrap,
          align: align
        }
      },
      amount_breakup           : () => {return {}},
      amount_w_button          : () => {return {}},
      dual_amount_w_percent    : () => {return {}},
      triple_amount_column_row : () => {return {}},
      amount_w_checkbox        : () => {return {}},
      amount_w_badge           : () => {return {}},
      amount_w_percent         : () => {return {}},
      amount_w_button_a_percent: () => {return {}},
      amount_w_unit            : () => {return {}},
    },
    account : {
      default                : () => {return {}},
      image_text             : () => {return {}},
      image_dual_text        : () => {return {}},
      account_w_alias        : () => {return {}},
      account_alias_w_popover: () => {return {}},
    },
    text    : {
      default        : (cls) => {return {cls: cls}},
      modify         : () => {return {}},
      row            : () => {return {}},
      column         : () => {return {}},
      column_w_prefix: () => {return {}},
      column_aligned : () => {return {}},
      row_col        : () => {return {}},
      row_col_icon   : () => {return {}},
      stack_col      : () => {return {}},
    },
    note    : {
      default   : () => {return {}},
      word_limit: () => {return {}},
      tooltip   : () => {return {}},
      popover   : () => {return {}},
      expandable: () => {return {}},
    },
    checkbox: {
      default : () => {return {}},
      eventble: () => {return {}},
    },
    dropdown: {
      single  : () => {return {}},
      multiple: () => {return {}},
    },
    number  : {
      default    : () => {return {}},
      percent    : () => {return {}},
      dual_number: () => {return {}},
      w_unit     : () => {return {}},
      w_percent  : () => {return {}},
      collection : () => {return {}},
    },
    input   : {
      default : () => {return {}},
      plugin  : () => {return {}},
      event   : () => {return {}},
      checkbox: () => {return {}},
      switch  : () => {return {}},
    },
    image   : {
      simple: () => {return {}},
      image : () => {return {}},
      label : () => {return {}},
      group : () => {return {}},
    },
    icon    : {
      bootstrap: () => {return {}},
      keen     : () => {return {}},
      font     : () => {return {}},
      line     : () => {return {}}
    },
    status  : {
      simple: () => {return {}},
      badge : () => {return {}},
    },
    button  : {
      action             : () => {return {}},
      event              : () => {return {}},
      post_event         : () => {return {}},
      get_event          : () => {return {}},
      two_inline         : () => {return {}},
      three_row_column   : () => {return {}},
      three_inline_w_icon: (cls = undefined, warp = undefined, align = undefined) => {
        return {
          cls  : cls,
          warp : warp,
          align: align
        }
      }
    },
    badge   : {
      default: () => {return {}},
      inside : () => {return {}},
      corner : () => {return {}},
    },
  }

}


export default Profiles;