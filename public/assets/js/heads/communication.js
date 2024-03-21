import pb                     from "../base/structure.js";
import * as PB__COMM_message  from "../pages/communication/message.js";
import * as PB__COMM_email    from "../pages/communication/email.js";
import * as PB__COMM_whatsapp from "../pages/communication/whatsapp.js";
import * as PB__COMM_diary    from "../pages/communication/diary.js";
import * as PB__COMM_chats    from "../pages/communication/chats.js";

function baseStateRouting() {
  console.log(thePathArr[1]);
  switch (thePathArr[1]) {

    case pb.com.message.n:
      console.log("in message")
      return PB__COMM_message.baseRouting();

    case pb.com.email.n:
      return PB__COMM_email.baseRouting();

    case pb.com.whatsapp.n:
      return PB__COMM_whatsapp.baseRouting();

    case pb.com.diary.n:
      console.log("in diary")
      return PB__COMM_diary.baseRouting();

    case pb.com.chats.n:
      return PB__COMM_chats.baseRouting();

  }

}

function buttonActionRouting(_event, _return, _data) {
  if (_return.indexOf(_event.type) !== -1) return true;
  console.log("in button action routing");
  switch (thePathArr[1]) {
    case pb.com.message.n:
      console.log("message")
      return PB__COMM_message.actionRouting(_event, _data);

    case pb.com.email.n:
      return PB__COMM_email.actionRouting(_event, _data);

    case pb.com.whatsapp.n:
      return PB__COMM_whatsapp.actionRouting(_event, _data);

    case pb.com.diary.n:
      console.log("in diary");
      return PB__COMM_diary.actionRouting(_event, _data);

    case pb.com.chats.n:
      console.log("chats");
      return PB__COMM_chats.actionRouting(_event, _data);

  }
}

// Public methods


export const pageStateRouting = function () {
  return baseStateRouting();
};
export const userActionRouting = function (_event, _return, _data) {
  console.log(_return);
  console.log("in action ro")
  return buttonActionRouting(_event, _return, _data);
};
