// -------------------------------------------------------------


<script src="assets/plugins/custom/formrepeater/formrepeater.bundle.js"></script>
<script src="assets/js/common/formRepeater.js"></script>


// -------------------------------------------------------------
// -------------------------------------------------------------
function shift_timer_Select() {
  var slider = document.querySelector("#kt_slider_basic");
  var valueMin = document.querySelector("#kt_slider_basic_min");
  var valueMax = document.querySelector("#kt_slider_basic_max");

  var convertMinutesToHoursAndMinutes = function (minutes) {
    let hour = Math.floor(minutes / 60)
    let minute = Math.round(minutes - hour * 60)
    let new_hour;

    if (hour >= 24) {
      // next day
      new_hour = (hour - 24);
      if (minute === 60 || minute === 0) {
        return 'Next day ' + (new_hour + Math.round(minute / 60)) + ':' + '00';
      }
      else {
        return 'Next day ' + new_hour + ':' + minute;
      }
    }
    else {
      // current day
      if (minute === 60 || minute === 0) {
        return hour + Math.round(minute / 60) + ':' + '00';
      }
      else {
        return hour + ':' + minute;
      }
    }
  }

  noUiSlider.create(slider, {
    start: [360, 720],
    step: 15,
    tooltips: [true, true],
    format: {
      from: Number,
      to: function (value) {
        return convertMinutesToHoursAndMinutes(value);
      }
    },
    connect: true,
    range: {
      min: 0,
      max: 2160
    },
    pips: {
      mode: "range",
      values: [0, 2160], //
      density: 15
    }
  });

  slider.noUiSlider.on("update", function (values, handle) {
    if (handle) {
      valueMax.innerHTML = values[handle];
    }
    else {
      valueMin.innerHTML = values[handle];
    }
  });

}

shift_timer_Select();