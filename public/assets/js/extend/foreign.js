import {exT} from "../base/const.js";
// Class definition
var fun = function () {

  /**
   * combine data from the cloud database.
   * primary and secondary are into one dataset.
   * how to insert params = [['dataset_key_1', 'dataset_key_2', index_of_key_1, index_of_key_2], ['dataset_key_1', 'dataset_key_3', index_of_key_1, index_of_key_3]]
   * @param dataset
   * @param params array of keys to call. [[a,b,c,d], [a,b,c,d], [...]]
   * @param _return
   * @returns {*}
   */
  const combined = (dataset, params, _return) => {
    // loop through the params and replace the value with the foreign key value.
    _.forEach(params, param => {
      console.log(param[0], param[1], param[2], param[3]);
      _.forEach(dataset[param[0]], (value, index) => {
        // if the value is not empty then replace the value with the foreign key value.
        if (value[param[2]] !== '') {
          // replace the value with the foreign key value.
          console.log(
            dataset.hasOwnProperty(param[1]),
            // head key exist
            value.hasOwnProperty(param[2]),
            dataset[param[1]].hasOwnProperty(value[param[2]]),
            dataset[param[1]][value[param[2]]])
          if (
            // does child object exist
            dataset.hasOwnProperty(param[1]) &&
            // head key exist
            value.hasOwnProperty(param[2]) &&
            // child key exist
            dataset[param[1]].hasOwnProperty(value[param[2]]) &&
            // child key exist on head value
            dataset[param[1]][value[param[2]]].hasOwnProperty(param[3])
          ) {
            dataset[param[0]][index][param[2]] = dataset[param[1]][value[param[2]]][param[3]];
          }
          else {
            // param[0], index, param[2], param[1], value[param[2]], param[3]
            printError('key does not matched');
          }
        }
      })
    });
    // return the dataset.
    return _return ? dataset : true;
  }

  /**
   * replace the value of the primary dataset with the foreign key value of the secondary dataset.
   * @param primary
   * @param secondary
   * @param params = [primary_key, secondary_key]
   * @param _return
   * @returns {*|boolean}
   */
  const individual = function (primary, secondary, params, _return) {
    params.forEach(param => {
      // loop through the primary dataset and replace the value with the foreign key value.
      _.forEach(primary, (index, value) => {
        primary[index][param[0]] = secondary[value[param[0]]][param[1]] ?? '-';
      });
    })
    // return the primary dataset.
    return _return ? primary : true;
  }

  /**
   * todo: not in use, need to check and rebuild.
   * add the all value of child array into the target position of the parent array.
   * the input format is ["Obj1", "Obj2", [position1, position2, d....]]
   * @param data
   * @param params
   */
  const acquire = function (data, params) {

    Object.keys(data.body[params[0]]).forEach((key, index) => {

      // store the value of obj1
      let valueArr = data.body[params[0]][key];

      // expend is used to increase the index of the valueArr when the value is replaced with the array. for example: [1,2,3, block@index,4] => [1,2,3,5,6,7,4] expend = 3 and target index is 2 (childArrayLength-1) where we replace the value with array.
      let expend = 0;
      params[2].forEach(param => {

        // store the value of obj2
        let objKey = data[params[1]][valueArr[param + expend]];

        // store the target object which we want to put as block@index in the valueArr . for example: [1,2,3, block@index,4] and our target object is [5,6,7]
        let targetObject = data.body[objKey];


        if (Array.isArray(targetObject)) {
          valueArr[param + expend] = targetObject[index];
        }
        else {
          valueArr.splice(param + expend, 1);
          targetObject[key].forEach((val, count) => {
            valueArr.splice(param + expend + count, 0, val);
          });
          expend += targetObject[key].length - 1;
        }
      });
    });
    return true;
  }

  const _remote = (type, data, params, _return) => {
    switch (type) {
      case exT.foreign.combine:
        return combined(data, params, _return);
      case exT.foreign.individual:
        return individual(data[0], data[1], params, _return);
      case exT.foreign.whole:
        return acquire(data, params);
    }
  }

  const _state = (data, localKey, params) => {
    // todo *may23
  }

  const _table = (data, params) => {

    params.forEach((param, idx) => {
      if (data[param[0]]) {

        console.log(data[param[0]]);

        Object.keys(data[param[0]]).forEach((key) => {
          let row = data[param[0]][key];

          console.log(row);

          if (row.length > 0) {
            row.forEach((val, index) => {
              if (val[param[2]]) {
                val[param[2]] = data[param[1]][val[param[2]]][param[3]];
              }
            });
          }
          else {
            if (row[param[2]]) {
              row[param[2]] = data[param[1]][row[param[2]]][param[3]];
            }
          }
        })
      }
    })
    return true;
  }

  const _branch = (data, params) => {
    let map = {};

    const combinedParams = {};

    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (!map[param[0]]) {
        combinedParams[param[0]] = [[param[1], param[2], param[3]]];
      }
      else {
        combinedParams[param[0]].push([param[1], param[2], param[3]]);
      }
      map[param[0]] = true;
    }

    map = {};
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (map[param[0]]) continue;
      const vec = data[param[0]];
      if (vec) {
        const indexes = Object.keys(vec);
        for (let j = 0; j < indexes.length; j++) {
          let row = vec[j];
          for (let k = 0; k < combinedParams[param[0]].length; k++) {
            const fp = combinedParams[param[0]][k];
            if (row[fp[1]]) {
              row[fp[1]] = data[fp[0]][row[fp[1]]][fp[2]];
            }
          }
        }
      }
      map[param[0]] = true;
    }
    return true;
  }
  // Public methods
  return {
    /**
     * all data from the cloud database.
     * @param type string [single, double]
     * @param data array dataset
     * @param params array of keys to call.
     * @param _return
     * @returns {*}
     */
    $_remote: function (type, data, params = [], _return = true) {
      return _remote(type, data, params, _return);
    },

    $_combine   : function (data, params, _return = false) {
      return combined(data, params, _return);
    },
    $_individual: function (dataSet_1, dataSet_2, params, _return = false) {
      return individual(dataSet_1, dataSet_2, params, _return);
    },
    $_acquire   : function (data, params, _return = false) {
      return acquire(data, params, _return);
    },
    /**
     * it uses local data to match the key value in given object
     * @param data new data fetched from server and passed for key matching.
     * @param localKey this is local object that has saved at the time of project loading.
     * @param params array of keys
     */
    $_state: function (data, localKey, params = []) {
      return _state(data, localKey, params);
    },

    $_table: function (data, params) {
      return _table(data, params)
    },

    /**
     *
     * @param data same as other functions.
     * @param params
     * @returns {boolean}
     */
    $_branch: function (data, params) {
      return _branch(data, params)
    }
  };
};

const PB_extend_foreign = fun();
export default PB_extend_foreign;
