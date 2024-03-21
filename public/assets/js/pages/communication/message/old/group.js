"use strict";

var KTAppChat = function () {

  var initChatApp = function () {

    const groupData = {
      'rows': [
        {'id': "1", 'avtar': "../../assets/media/avatars/300-23.jpg", 'name': "Group1", 'total_participant': "5"},
        {'id': "2", 'avtar': "../../assets/media/avatars/300-9.jpg", 'name': "Group2", 'total_participant': "4"},
        {'id': "3", 'avtar': "../../assets/media/avatars/300-4.jpg", 'name': "Group3", 'total_participant': "8"},
        {'id': "4", 'avtar': "../../assets/media/avatars/300-3.jpg", 'name': "Group4", 'total_participant': "9"},
        {'id': "5", 'avtar': "../../assets/media/avatars/300-6.jpg", 'name': "Group5", 'total_participant': "3"},
      ],
      'status': true,
    };

    if (groupData.status) {
      // render the received data from server.
      var renderedData = KTAppChat.renderData(groupData.rows);
    }
    else {
      renderedData = noDataFound('No Record has Found');
    }

    return renderedData;
  }

  var renderGroupData = function (data) {
    var templates = document.querySelector('[data-kt-element="kt_details_wrapper"]');
    var group = templates.querySelector('[data-kt-element="kt_details"]');
    data.forEach((row) => {
      if (group.querySelector('[data-kt-element="group-name"]').innerText === "") {
        group.querySelector('[data-kt-element="group-imag"]').src = row.avtar;
        group.querySelector('[data-kt-element="group-name"]').innerText = row.name;
        group.querySelector('[data-kt-element="no-of-participant"]').innerText = 'participant:' + row.total_participant;
        group.querySelector('[data-kt-element="groupId"]').value = row.id;
      }
      else {
        var group_details = group.cloneNode(true);
        group_details.querySelector('[data-kt-element="group-imag"]').src = row.avtar;
        group_details.querySelector('[data-kt-element="group-name"]').innerText = row.name;
        group_details.querySelector('[data-kt-element="no-of-participant"]').innerText = 'participant:' + row.total_participant;
        group_details.querySelector('[data-kt-element="groupId"]').value = row.id;
        templates.appendChild(group_details);
      }

    });
    return templates;

  }

  /*var onClickCustomer=function (){
   var templates = document.querySelector('[data-kt-element="kt_details_wrapper"]');
   var customers = templates .querySelectorAll('[data-kt-element="kt_details"]');
   var chatHeader = document.querySelector('#kt_chat_messenger_header');
   var chatBody = document.querySelector('#kt_chat_messenger_body');
   customers.forEach((customer)=>{
   customer.addEventListener('click', e => {
   customersId= customer.querySelector('[data-kt-element="customerId"]').value;
   chatHeader.querySelector('#kt_active_userName').innerText=customer.querySelector('[data-kt-element="customer-name"]').innerText;
   chatBody.querySelector('#user_profile').src=customer.querySelector('[data-kt-element="customer-imag"]').src;
   chatBody.querySelector('#user_name').innerText =customer.querySelector('[data-kt-element="customer-name"]').innerText;
   //matchMessageId(customersId);
   });
   });
   }

   const noDataFound = (text) => {
   var outerDiv;
   outerDiv=document.querySelector('#kt_details_wrapper');
   var div = document.createElement('div');
   div.classList.add('d-flex','py-4','flex-stack','align-item-center');
   div.innerHTML = '<span  class="text-center">' + text + '</span>';
   return outerDiv.appendChild(div);
   }

   */


  return {
    init: function () {
      initChatApp();
      //onClickCustomer();
    },

    renderData: function (data) {
      return renderGroupData(data);
    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTAppChat.init();
});


function PB_chat_filter() {
  // todo: add this into the above function and call on event.
  let filter, a, txtValue;
  filter = document.getElementById('user_search').value.toUpperCase();
  document.getElementById('kt_details_wrapper').querySelectorAll('.level-1').forEach((div) => {
    a = div.getElementsByClassName('getName')[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div.classList.remove('d-none');
      div.classList.add('d-flex');
    }
    else {
      div.classList.add('d-none');
    }
  })
}

