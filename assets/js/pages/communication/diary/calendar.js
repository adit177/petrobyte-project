import {get_callEl} from "../../../base/global.js";
import pb           from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4620',
};
// Shared variables
let StateData, redData;
let tableEle;
let calendar;
let viewModal;
let addModal;

// Private functions

/**
 * preloaded data that will be same for this page
 */

const viewEventHandler = (data) => {
  console.log(data);
  console.log(_calendarLE.modal);
  const modal = _calendarLE.modal.querySelector(".view_event_modal");


  const viewEventName = modal.querySelector('[data-kt-calendar="event_name"]');
  const viewAllDay = modal.querySelector('[data-kt-calendar="all_day"]');
  const viewEventDescription = modal.querySelector('[data-kt-calendar="event_description"]');

  console.log(viewEventDescription);

  const viewEventLocation = modal.querySelector('[data-kt-calendar="event_location"]');
  const viewStartDate = modal.querySelector('[data-kt-calendar="event_start_date"]');
  const viewEndDate = modal.querySelector('[data-kt-calendar="event_end_date"]');
  const viewEditButton = modal.querySelector('#kt_modal_view_event_edit');
  const viewDeleteButton = modal.querySelector('#kt_modal_view_event_delete');

  let name_mod;
  let start_date_mod;
  let end_date_mod;

  if (data.allDay) {
    name_mod = 'All Day';
    start_date_mod = moment(data.startDate).format('Do MMM, YYYY');
    end_date_mod = moment(data.endDate).format('Do MMM, YYYY');
  }
  else {
    name_mod = '';
    start_date_mod = moment(data.startDate).format('Do MMM, YYYY - h:mm a');
    end_date_mod = moment(data.endDate).format('Do MMM, YYYY - h:mm a');
  }

  viewEventName.innerText = data.title;
  viewAllDay.innerText = name_mod;
  viewEventDescription.innerText = data.description ? data.description : '--';
  viewEventLocation.innerText = data.location ? data.location : '--';
  viewStartDate.innerText = start_date_mod;
  viewEndDate.innerText = end_date_mod;


  viewModal = new bootstrap.Modal(modal);

  modal.querySelector("#kt_modal_view_event_delete").setAttribute(atr.event.data, data.id);
  modal.querySelector("#kt_modal_view_event_edit").setAttribute(atr.event.data, data.id);

  viewModal.show();
}


const pageOpen = (data) => {

  console.log("opening page");
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    console.log(data);
    let _return = true;

    _return &&= _process_a(data);
    _return &&= renderCalendar(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const renderCalendar = (data) => {
    console.log(_calendarLE.panel)
    const calendarEle = _calendarLE.panel.querySelector(".calendar");
    let todayDate = moment().startOf('day');
    let TODAY = todayDate.format('YYYY-MM-DD');

    calendar = new FullCalendar.Calendar(calendarEle, {
      headerToolbar: {
        left  : 'prev,next today',
        center: 'title',
        right : 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      initialDate : TODAY,
      navLinks    : true, // can click day/week names to navigate views
      selectable  : true,
      selectMirror: true,

      select: function (arg) {
        console.log(arg, "select");
      },

      eventClick: function (arg) {
        const data = {
          id         : arg.event.id,
          title      : arg.event.title,
          description: arg.event._def.extendedProps.description,
          location   : arg.event._def.extendedProps.location,
          startDate  : arg.event.start,
          endDate    : arg.event.end,
          allDay     : arg.event.allDay
        }
        console.log(arg.event.title);
        viewEventHandler(data);
      },

      editable    : true,
      dayMaxEvents: true,

      events          : [...StateData.events],
      displayEventTime: false,

      datesSet: function () {
        console.log("in dataset");
        // do some stuff
      }
    })

    calendar.render();
    return true;
  }

  return _process(data.data);
}

const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a = (data) => {


    const _process_a_inner_fun_a = function (element, data, event) {

      //
      return true;

    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {

      return true;
    }

    // switching
    switch (event.value) {

      case pb.com.diary.calendar.a:
        return _process_a_inner_fun_a(element, event);

      case pb.com.diary.calendar.b:
        return _process_a_inner_fun_b(element, event);

      default :
        eventNotFound(event);
        return false;
    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}


const actionsTarget = function (element, _event) {

  const deleteEvent = (element, event) => {

    const swal_cb_on_confirm = () => {

      console.log("in confirm");
      const _process = (data) => {

        console.log(event.data);
        calendar.getEventById(event.data).remove();

        const newEvents = StateData.events.filter((item) => {
          return item.id != event.data;
        })

        StateData.events = [...newEvents];

        console.log(StateData.events);

        toastr.success('event has been deleted', 'Success');
        viewModal.hide();

      }


      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type
      }, 'local', 0);
      ajax.callREQUEST({id: event.data}, urlID, true, _process);

      return ajax;
      return true;
    }

    const swal_cb_on_cancel = () => {
      console.log("cancelled");
      return true;
    }

    plg_sweetAlert.$_confirm(['Are You Sure'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : swal_cb_on_cancel,
      }
    )

    return true;
  }


  const editEvent = (element, event) => {

    let formData;

    const form = element.querySelector("form");
    console.log(form);

    //todo: validate the form


    formData = extend.collect.$_form(form);


    const swal_cb_on_confirm = () => {

      console.log(event);

      console.log("in confirm");
      const _process = (data) => {


        // todo: format start time and end time

        const editData = {};
        formData.forEach((item) => {
          for (const key in item) {
            editData[key] = item[key];
          }
        })


        // todo: correctly set start and end

        if (editData.start_time !== "") {
          editData.start = editData.start + "T" + editData.start_time;
        }
        if (editData.end_time !== "") {
          editData.end = editData.end + "T" + editData.end_time;
        }

        console.log(editData);


        if (event.data) {
          const calendarEvent = calendar.getEventById(event.data);
          calendarEvent.setProp("title", editData.title);
          calendarEvent.setExtendedProp("description", editData.description);
          calendarEvent.setExtendedProp("location", editData.location);
          calendarEvent.setDates(editData.start, editData.end);


          const newData = [];
          for (let i = 0; i < StateData.events.length; i++) {
            if (StateData.events[i].id === event.data) {
              const {
                      start_time,
                      end_time,
                      ...data
                    } = editData;
              newData.push({
                ...data,
                id: event.data
              });
            }
            else {
              newData.push({...StateData.events[i]});
            }
          }
          console.log(newData);
          StateData.events = [...newData];
        }
        else {

          console.log(data);

          form.reset();

          editData.id = data.id;
          console.log(editData);
          calendar.addEvent(editData);

          _calendarLE.panel.querySelector(".add_event_button").removeAttribute("disabled");

        }


        addModal.hide();

        form.querySelector(".submit_button").removeAttribute("disabled");
        form.querySelector(".submit_button").removeAttribute(atr.event.value);


        toastr.success('event has been edited', 'Success');

        return true;
      }


      if (event.data) {
        const ajax = new AjaxPB();
        const urlID = ajax.buildingURL([], {
          act : event.value,
          type: event.type
        }, 'local', 0);
        ajax.callREQUEST({
          formData,
          id: event.data
        }, urlID, true, _process);
      }
      else {
        console.log(event.type);
        const ajax = new AjaxPB();
        const urlID = ajax.buildingURL([], {
          act : "add",
          type: event.type
        }, 'local', 0);
        ajax.callREQUEST({
          formData
        }, urlID, true, _process);
      }

      return true;
    }


    const swal_cb_on_cancel = () => {
      console.log("cancelled");
      return true;
    }

    plg_sweetAlert.$_confirm(['Are You Sure you want to edit this event?'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : swal_cb_on_cancel,
      }
    )

    return true;

  }


  /*
   ------------
   internal functions
   ------------
   */

  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {AjaxPB}
   */


  // request switching.
  // switching
  switch (_event.value) {
    case "delete":
      return deleteEvent(element, _event);

    case "edit":
      return editEvent(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


const modalsTarget = function (element, event) {

  const editEvent = (element, event) => {

    const modal = element.querySelector(".add_event")

    addModal = new bootstrap.Modal(modal);
    viewModal.hide();
    addModal.show();

    const form = modal.querySelector("form");

    const eventData = StateData.events.find((item) => {
      return item.id == event.data;
    });

    console.log(eventData);

    extend.placement.$_form(eventData, form);

    const end_time_input = form.querySelector(".end_time_input");
    const start_time_input = form.querySelector(".start_time_input");

    form.querySelector(".form-check-input").addEventListener("click", (e) => {
      if (e.target.checked) {
        end_time_input.classList.remove("d-none");
        start_time_input.classList.remove("d-none");
      }
      else {
        end_time_input.classList.add("d-none");
        start_time_input.classList.add("d-none");
      }
    })

    console.log(form.querySelector(".submit_button"), eventData.id);

    form.querySelector(".submit_button").setAttribute(atr.event.value, eventData.id);
    console.log(form.querySelector(".submit_button"));

    plg_datePicker.$_manual(form);

    console.log(eventData);


    console.log("in edit event");
    return true;
  }

  const addEvent = (element, event) => {
    if (addModal) {
      addModal.show();
      return true;
    }

    const modal = element.querySelector(".add_event")
    addModal = new bootstrap.Modal(modal);
    const form = modal.querySelector("form");
    plg_datePicker.$_manual(form);
    addModal.show();
    return true;
  }

  switch (event.value) {
    case "edit":
      return editEvent(element, event);

    case "add":
      return addEvent(element, event);
  }
}

// Public methods


// works on card event type hit
export const CDC_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const CDC_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const CDC_modals = function (_event) {
  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const CDC_pageOpen = function () {
  return pageOpen();
};

