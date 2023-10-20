"use strict";

// Class definition
var KTAppChat = function () {
  // Private functions
  var handeSend = function (element) {
    if (!element) {
      return;
    }
    var messages = element.querySelector('[data-kt-element="messages"]');
    var messageStoreTemplate = messages.querySelector('[data-kt-element="template-stored"]');

    var msg = messageStoreTemplate.cloneNode(true);
    msg.classList.remove('d-none');


    // old session load values
    var chat_key = localStorage.getItem('pb_flash_chat_key');
    var all_values = ['<span class="text-primary fw-bold mb-2">List of all your past saved flash data</span>'];
    var isFlash;
    for (var i = 1; i <= chat_key; i++) {
      var val_key = "flash_val_" + i;
      if (localStorage.getItem(val_key) !== null) {
        all_values.push('<li>' + localStorage.getItem(val_key) + '</li>');
        isFlash = true;
      }
    }
    if (isFlash) {
      msg.querySelector('[data-kt-element="message-text"]').innerHTML = '<ol class="m-0">' + all_values.join('') + '</ol>';
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;

    // Handle send
    KTUtil.on(element, '[data-kt-element="input"]', 'keydown', function (e) {
      if (e.keyCode === 13) {
        handeMessaging(element);
        e.preventDefault();
        return false;
      }
    });

    KTUtil.on(element, '[data-kt-element="send"]', 'click', function (e) {
      handeMessaging(element);
    });
  }

  var handeMessaging = function (element) {
    var messages = element.querySelector('[data-kt-element="messages"]');
    var input = element.querySelector('[data-kt-element="input"]');

    if (input.value.length === 0) {
      return;
    }
    var sn_key = localStorage.getItem("pb_flash_chat_key");

    var next_key = parseInt(sn_key ?? 0) + 1;
    localStorage.setItem('pb_flash_chat_key', next_key);
    const val_key = "flash_val_" + next_key;
    localStorage.setItem(val_key, input.value);

    var messageOutTemplate = messages.querySelector('[data-kt-element="template-out"]');
    var messageInTemplate = messages.querySelector('[data-kt-element="template-in"]');
    var message;

    // Show example outgoing message
    message = messageOutTemplate.cloneNode(true);
    message.classList.remove('d-none');
    message.querySelector('[data-kt-element="message-text"]').innerText = input.value;
    input.value = '';
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;


    setTimeout(function () {
      // Show example incoming message
      message = messageInTemplate.cloneNode(true);
      message.classList.remove('d-none');
      message.querySelector('[data-kt-element="message-text"]').innerText = 'We saved your data into local system with the key id: ' + val_key;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
  }

  // Public methods
  return {
    init: function (element) {
      handeSend(element);
    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  // Init inline chat messenger
  KTAppChat.init(document.querySelector('#kt_chat_messenger'));

  // Init drawer chat messenger
  KTAppChat.init(document.querySelector('#kt_drawer_chat_messenger'));
});