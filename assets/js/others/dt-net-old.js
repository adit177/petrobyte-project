import plg_datePicker from "../plugins/datePicker";
import {kws} from "../base/const";

switch (value.name) {
  case 'search':
    const regex = value.getAttribute('data-dt-regex') === '1';
    value.addEventListener('keyup', function (evt) {
      tableObject[btnValue].search(evt.target.value, regex).draw();
    })
    break;

  case 'select':
    value.addEventListener('change', function (evt) {
      var val = evt.target.value;
      if (val === 'all') val = '';
      tableObject[btnValue].column(evt.target.getAttribute('data-dt-column')).search(val).draw();
    })
    break;

  case 'clear':
    value.addEventListener('click', function (evt) {
      const iid = evt.target.getAttribute('data-pb-instance');
      console.log(iid);
      const fp = plg_datePicker.$_get(kws.labels.instance, iid)
      fp.clear();
      $.fn.dataTable.ext.search.push(function () { return true});
      tableObject[btnValue].draw();
    })
    break;

  case 'date':
    value.addEventListener('change', function (evt) {
      let dates;
      var val = evt.target.value;
      if (!val.includes(' to ')) {
        return;
      }
      else {
        //dates = val.split(' to ');
      }
      dates = plg_datePicker.$_get(kws.labels.value)[0];
      let min = moment(dates[0]).format('YYYY-MM-DD');
      let max = moment(dates[1]).format('YYYY-MM-DD');
      $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
          let date = moment(data[evt.target.getAttribute('data-dt-column')]).format('YYYY-MM-DD');
          //console.log(date);
          //console.log(min, max);
          return (min === null && max === null) ||
            (min === null && date <= max) ||
            (min <= date && max === null) ||
            (min <= date && date <= max);
        }
      );
      tableObject[btnValue].draw();
    })
    break;
}