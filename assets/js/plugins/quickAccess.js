var setpper = function () {
  // Stepper lement
  var element = document.querySelector("#kt_stepper_example_basic");

  // Initialize Stepper
  var stepper = new KTStepper(element);

  // Handle next step
  stepper.on("kt.stepper.next", function (stepper) {
    stepper.goNext(); // go next step
  });

  // Handle previous step
  stepper.on("kt.stepper.previous", function (stepper) {
    stepper.goPrevious(); // go previous step
  });
}


var QuickSearch = function () {
  var processs = function (search) {
    var timeout = setTimeout(function () {
      var number = KTUtil.getRandomInt(1, 6);

      // Hide recently viewed
      suggestionsElement.classList.add("d-none");

      if (number === 3) {
        // Hide results
        resultsElement.classList.add("d-none");
        // Show empty message
        emptyElement.classList.remove("d-none");
      }
      else {
        // Show results
        resultsElement.classList.remove("d-none");
        // Hide empty message
        emptyElement.classList.add("d-none");
      }

      // Complete search
      search.complete();
    }, 1500);
  }

  var clear = function (search) {
    // Show recently viewed
    suggestionsElement.classList.remove("d-none");
    // Hide results
    resultsElement.classList.add("d-none");
    // Hide empty message
    emptyElement.classList.add("d-none");
  }

  // Input handler
  const handleInput = () => {
    // Select input field
    const inputField = element.querySelector('[data-kt-search-element="input"]');

    // Handle keyboard press event
    inputField.addEventListener("keydown", e => {
      // Only apply action to Enter key press
      if (e.key === "Enter") {
        e.preventDefault(); // Stop form from submitting
      }
    });
  }

  // Elements
  element = document.querySelector('#kt_docs_search_handler_basic');

  if (!element) {
    return;
  }

  wrapperElement = element.querySelector('[data-kt-search-element="wrapper"]');
  suggestionsElement = element.querySelector('[data-kt-search-element="suggestions"]');
  resultsElement = element.querySelector('[data-kt-search-element="results"]');
  emptyElement = element.querySelector('[data-kt-search-element="empty"]');

  // Initialize search handler
  searchObject = new KTSearch(element);

  // Search handler
  searchObject.on("kt.search.process", processs);

  // Clear handler
  searchObject.on("kt.search.clear", clear);

  // Handle select
  KTUtil.on(element, '[data-kt-search-element="customer"]', "click", function () {
    //modal.hide();
  });

  // Handle input enter keypress
  handleInput();
}


const quick_access_toastr = () => {
  toastr.options = {
    "closeButton"      : true,
    "debug"            : true,
    "newestOnTop"      : true,
    "progressBar"      : true,
    "positionClass"    : "toastr-bottom-left",
    "preventDuplicates": true,
    "showDuration"     : "300",
    "hideDuration"     : "1000",
    "timeOut"          : "5000",
    "extendedTimeOut"  : "1000",
    "showEasing"       : "swing",
    "hideEasing"       : "linear",
    "showMethod"       : "fadeIn",
    "hideMethod"       : "fadeOut"
  };
}


// ----------------------------------------------------------------

/*
 Swal.fire({
 text: "Form has been successfully submitted!",
 icon: "success",
 buttonsStyling: false,
 confirmButtonText: "Ok, got it!",
 customClass: {
 confirmButton: "btn btn-primary"
 }
 });
 setTimeout(function () {
 form.submit(); // Submit form
 }, 1000);

 let submitButton;
 submitButton.setAttribute(atr.inbuild.indicator, 'on');
 submitButton.disabled = true;
 submitButton.removeAttribute('data-kt-indicator');
 submitButton.disabled = false;
 */