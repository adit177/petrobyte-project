import Tables from "./tables.js";
import pb from "../base/structure.js";

class tablesCommunications extends Tables {
  #shape;
  tableOptions;
  tableMethods;
  tableParams;
  #tableTypes = {};
  #path;

  constructor(path) {
    super();
    this.#path = path;
  }

  set setPath(value) {
    this.#path = value;
  }

  get tableTypes() {
    return this.#tableTypes;
  }

  get getShape() {
    return this.#shape;
  }

  #email_mail = (tag) => {

    const myTables = pb.com.email.mail.t;

    switch (tag) {
      case myTables.list:
        console.log("in shape");
        this.#shape = {
          '0': this.row(
            this.cell.checkbox,
            this.mode.checkbox.default,
            [0], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '3': this.row(
            this.cell.rich,
            this.mode.account.image_text,
            [3, 4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            [5, 6], false, false
          ),
          '5': this.row(
            this.cell.date,
            this.mode.date.gap,
            [7], false, false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0], this.param_manuals.button.view_email, this.style_manuals.button.my_1
          )

        }
    }
  }


  profileGenerate = (path, tag) => {
    const propName = path[1] + '_' + path[2];

    switch (propName) {
      case 'email_mail':
        this.#email_mail(tag);
        break;
    }

  }

}

export default tablesCommunications;