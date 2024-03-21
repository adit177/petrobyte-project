import {exT} from "../base/const.js";

let fun = function () {

  // to know more: https://preview.keenthemes.com/html/keen/docs/general/stepper

  let stepperObj = [];
  const _all_configs = (stepperEl) => {
    // init
    var stepperEl = document.querySelector("#kt_stepper_example");
    var options = {startIndex: 1};
    var stepper = new KTStepper(stepperEl, options);

    const index = 1;

    stepper.goTo(index);
    stepper.goNext();
    stepper.goPrevious();
    stepper.goFirst();
    stepper.goLast();

    // index getting
    stepper.getClickedStepIndex();
    stepper.getCurrentStepIndex();
    stepper.getNextStepIndex();
    stepper.getPreviousStepIndex();
    var element = stepper.getElement();
    blockUI.destroy();

  }

  const _stepper = (element) => {
    // Initialize Stepper
    let stepper = new KTStepper(element);
    // update this into class global object.
    stepperObj[element.id] = stepper;
    return stepper;
  }


  const _smooth = (stepperEl) => {
    // Initialize Stepper
    let options = {startIndex: 1};
    let stepper = new KTStepper(stepperEl, options);

    // Handle next step
    stepper.on("kt.stepper.next", function (stepper) {
      stepper.goNext(); // go next step
    });

    // Handle previous step
    stepper.on("kt.stepper.previous", function (stepper) {
      stepper.goPrevious(); // go previous step
    });

    return stepper;
  }

  const _getIndex = (objectID, step) => {
    console.log(objectID, step, stepperObj[objectID]);
    switch (step) {
      case exT.stepper.index.previous:
        return stepperObj[objectID].getPreviousStepIndex();

      case exT.stepper.index.current:
        return stepperObj[objectID].getCurrentStepIndex();

      case exT.stepper.index.next:
        return stepperObj[objectID].getNextStepIndex();

      case exT.stepper.index.click:
        return stepperObj[objectID].getClickedStepIndex();

      default:
        return stepperObj[objectID].getCurrentStepIndex();
    }
  }

  const _getStepperObject = (objectID) => {
    return stepperObj[objectID];
  }

  // accessible functions by other target page files.
  return {
    // single render as data object
    $_stepper: function (element) {
      return _stepper(element);
    },
    // direct flow
    $_smooth: function (element) {
      return _smooth(element);
    },

    // get index of stepper as per user activity.
    $_getIndex: function (objectID, step) {
      console.log(objectID, step)
      return _getIndex(objectID, step);
    },

    // get a complete object.
    $_getObject: function (objectID) {
      return _getStepperObject(objectID);
    }
  };
};

const PB_extend_stepper = fun();
export default PB_extend_stepper;