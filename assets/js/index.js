import Initialize from "./base/initialize.js";
import Listening from "./base/listening.js";
import Holding from "./base/holding.js";

KTUtil.onDOMContentLoaded(function () {


  /**
   * it holds the HTML elements of the main page.
   */
  Holding.Page();


  /**
   * It listens to the first page's predefined events
   * just added event listeners to the defined elements.
   */
  Listening.Page();


  /**
   * initialize the global State data
   * this data used into foreign match.
   */
  Initialize.Data();


  /**
   * get the data for the target location.
   * init things for the targeted location.
   */
  Initialize.Location();


  /**
   *
   */
  Initialize.Plugins();


  // listen to the history events.
  Listening.History();
});