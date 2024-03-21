let fun = function () {
  // NOTE: we are using lodash directly for this, no do no need to import it.
  /*
   _.forEach: Iterates over elements of a collection and invokes a function for each element.
   _.map: Creates an array of values by running each element in a collection through a function.
   _.filter: Creates a new array with all elements that pass the test implemented by the provided function.
   _.reduce: Reduces a collection to a single value by iteratively applying a function.
   _.find: Returns the first element in a collection that satisfies a provided function.
   _.some: Checks if at least one element in the collection satisfies a provided function.
   _.every: Checks if all elements in the collection satisfy a provided function.
   _.sortBy: Creates an array of elements, sorted in ascending order by the results of a provided function.
   _.groupBy: Groups elements of a collection based on a provided function or property.
   _.uniq: Creates a new array with unique elements from the original array.

   _.pick: Creates an object composed of the picked object properties.
   _.pick(person, ['name', 'age']);

   _.omit: Creates an object composed of the object properties not present in the omitted list.
   _.cloneDeep: Creates a deep copy of a value, recursively copying nested objects and arrays.
   _.isEqual: Performs a deep comparison to determine if two values are equivalent.
   _.isEmpty: Checks if a given value is an empty object, array, map, set, or string.
   _.debounce: Creates a debounced function that will delay the invocation of a function until after a certain wait time.
   _.throttle: Creates a throttled function that will limit the invocation rate to a specific time interval.

   _.merge: Recursively merges own and inherited enumerable properties of source objects into the destination object.
   _.merge({}, object1, object2, object3);
   */


  /*
   Set(): project use.
   - can be used where we check table id exists or not.
   */
  const _identicalCheck = (data_1, data_2) => {
    alert('not set yet.');

    // length check
    if (data_1.length === data_2.length) {

    }
    // detailed checkup.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const set_1 = new Set(data_1).size;
    const set_2 = new Set(data_2).size;

    return false;
  }

  const _length_match = (object_1, object_2) => {
    const objs_1 = _.size(_.keys(object_1));
    const objs_2 = _.size(_.keys(object_2));
    return objs_1 === objs_2;
  }

  function _array_match(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
      return false;
    }

    // Sort the arrays to ensure consistent order
    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort();

    // Compare each element of the sorted arrays
    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }

    // All elements are equal
    return true;
  }

  const _form_flat = function (formData) {

  }

  function _form_submit(preFormData, postFormData) {
    _.isEqual(preFormData, postFormData)
  }

  // Public methods
  return {
    // to check if length of two objects are same or not.
    $_length_match: function (dataset_1, dataset_2) {
      return _length_match(dataset_1, dataset_2);
    },
    // to check if two objects are identical or not.
    $_identical: function (dataset_1, dataset_2) {
      return _identicalCheck(dataset_1, dataset_2);
    },

    $_form_flat: function (form) {
      return _form_flat(form);
    },

    $_form_submit_check: function (preFormData, postFormData) {
      return _form_submit(preFormData, postFormData);
    },

    // to filter the simple array
    $_array_match: function (dataset_1, dataset_2) {
      return _array_match(dataset_1, dataset_2);
    }
  };
};

const PB_extend_filter = fun();
export default PB_extend_filter;
