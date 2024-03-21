import {$R_common_obj} from "../base/render.js";
import {rdR, CLS} from "../base/const.js";
import {atr} from "../base/attributes.js";
import {_dc} from "../base/defaults.js";

class RenderMenu {

  constructor() {
    //
  }

  #_left(data, type, param, role, tag) {

    /**
     * it takes value and append into target element.
     * @param data
     * @param param
     * @param tag
     * @param role
     */
    const _left_value = (data, param, role = rdR.menu.role.new, tag = rdR.menu.tags.menu) => {

      // target HTML element
      console.log("left value funtion idhar hai")
      let placesHead = PBapp.querySelector('#' + tag);
      if (placesHead === null) {
        return false;
      }

      // value insert
      const value_insert = (place) => {
        key = place.getAttribute(atr.core.key);
        valueEle = place.querySelector(querySA(atr.core.reserve, false));

        // update things.
        valueEle.innerText = $R_common_obj.$_return(data[key].value ?? 0, params.method, params.param);

        // adding the color.
        dataType = data[key].type;
        role === rdR.menu.role.new
          ? valueEle.classList.add('badge-light-' + CLS.colors.array[dataType])
          : justPass();
      }

      // loop for each place inside targeted element.
      const __new = (elements) => {
        elements.forEach(value_insert);
        placesHead.setAttribute(atr.load.state, '1');
        return true;
      }

      const __update = (elements) => {
        elements.forEach(value_insert);
        placesHead.setAttribute(atr.load.state, '1');
        return true;
      }

      let key, valueEle, dataType;
      const params = _.isEmpty(param)
        ? _dc.render.menu.param.left_value
        : param;
      let places = placesHead.querySelectorAll(querySA(atr.core.key, false));

      switch (role) {
        case rdR.menu.role.new:
          return __new(places);
        case rdR.menu.role.update:
          return __update(places);
      }
    }

    /**
     * it takes a element and repeat as per data parameter.
     * @param data
     * @param param
     * @param tag
     * @param role
     * @returns {boolean}
     */
    const _left_stack = (data, param, role = rdR.menu.role.new, tag = rdR.menu.tags.menu) => {

      const whiteKeys = ['head', 'body', 'foot'];
      const _default_param_fetching = (key) => {
        switch (key) {
          case whiteKeys[0]:
            return param.head === undefined
              ? _dc.render.menu.param.left_stack.head
              : param.head;
          case whiteKeys[1]:
            return param.body === undefined
              ? _dc.render.menu.param.left_stack.body
              : param.body;
          case whiteKeys[2]:
            return param.foot === undefined
              ? _dc.render.menu.param.left_stack.foot
              : param.foot;
          default:
            return false;
        }
      }

      // holding target HTML element
      const menu_place = PBapp.querySelector('#' + tag);

      // getting template for repeater.         ('[data-pb-template="menuList"]')
      const menu_template = menu_place.querySelector(querySA(atr.core.template, tag));

      const __new = () => {
        for (const dataKey in data) {
          // check if data-key is valid or not.
          if (whiteKeys.indexOf(dataKey) === -1) {
            alert('you are using wrong key for menu stack. please use ' + whiteKeys.join(', ') + ' keys only.');
          }

          // loop as per keys in data param
          let rows;
          // loop as per keys in data param
          _.forEach(data[dataKey], (datum) => {
            const params = _default_param_fetching(dataKey);
            // clone template
            rows = menu_template.cloneNode(true);
            // remove class of the template.
            rows.classList.remove(CLS.display.none);
            rows.removeAttribute(atr.core.template);

            // set data
            rows.setAttribute(atr.core.key, datum.id);
            rows.children[0].innerText = datum.name;
            rows.children[1].setAttribute(atr.core.reserve, datum.value);
            rows.children[1].innerText = $R_common_obj.$_return(
              datum.value,
              params.method,
              params.param,
            );

            // type
            const type = whiteKeys.indexOf(dataKey);
            // add class as per type
            rows.children[1].classList.add('badge-light-' + CLS.colors.array[type]);
            rows.children[0].classList.add('text-hover-' + CLS.colors.array[type]);
            // append
            menu_place.querySelectorAll(querySA(atr.core.key, datum.id)).length === 0
              ? menu_place.appendChild(rows)
              : justPass();
          })
        }
      }

      const __update = () => {
        const get_core_key = (a) => {
          switch (a) {
            case '0':
              return 'head';
            case '-1':
              return 'foot';
            default:
              return 'body';
          }
        }
        // get default params

        // get the core element of the menu.
        menu_place.querySelectorAll(querySA(atr.core.key, false)).forEach((place) => {
          const key = place.getAttribute(atr.core.key);
          const dataKey = get_core_key(key);
          const theValue = _.find(data[dataKey], {"id": key}).value;
          const params = _default_param_fetching(dataKey);
          place.querySelector(querySA(atr.core.reserve, false)).innerText = $R_common_obj.$_return(
            theValue,
            params.method,
            params.param,
          );
        });
        // fetch all with the data-key.
      }


      // role base action
      switch (role) {
        case rdR.menu.role.new:
          __new();
          break;
        case rdR.menu.role.update:
          __update();
          break;
      }

      return true;
    }

    const _left_bar = (data, element = PBapp, param) => {
      console.log('i am here to used for loading bar menu in details pages.');
      // bar in left side of customers, employees and users details pages.

      // get value and keys from 'leftBar' > ol
      // get template for repeat => 'leftBar' > div
      // create span div as per index inside array of that keys object.
      // append and innerHTMl.

    }

    const _left_button = (data, param, role, tag) => {

      // holding target HTML element
      const menu_place = PBapp.querySelector('#' + tag);

      // getting template for repeater.
      const menu_template = menu_place.querySelector(querySA(atr.core.template, tag));

      // create list buttons
      // loop as per keys in data param
      let listItem;
      // loop as per keys in data param
      for (const dataKey in data) {
        listItem = menu_template.cloneNode(true);
        // remove class of the template.
        listItem.classList.remove(CLS.display.none);

        // set data in input if not done into the event.
        // listItem.querySelector('input').value = data[dataKey][0];

        // update event value
        const eventEle = listItem.querySelector(querySA(atr.direct.event, false));
        eventEle.setAttribute(atr.event.type, eTypes.load);
        eventEle.setAttribute(atr.event.value, pb.com.message.single.p.panel);
        eventEle.setAttribute(atr.event.origin, _chatsLE.zones.list.replace('#', ''));
        eventEle.setAttribute(atr.event.data, data[dataKey]['id']);

        /*
         // status
         const stsEle = listItem.querySelector(querySA(atr.core.target, 'status'));
         data[dataKey][6]
         ? stsEle.classList.add('bg-success')
         : stsEle.classList.add('bg-danger');

         // avatar
         const avatarEle = listItem.querySelector(querySA(atr.core.target, 'avatar'));
         const img = avatarEle.querySelector('img');
         if (data[dataKey][3]) {
         const src = img.getAttribute(atr.custom.path) + '/' + data[dataKey][4];
         img.setAttribute('src', src);
         }
         else {
         img.classList.add(CLS.display.none);
         const sdf = document.createElement('div');
         sdf.classList.add(...CLS.cluster.symbol.circle.split(' '));
         sdf.innerText = data[dataKey][1].substring(0, 2).toUpperCase();

         avatarEle.append(sdf);
         }

         // texts
         listItem.querySelector(querySA(atr.core.target, 'text')).innerText = data[dataKey][1];
         listItem.querySelector(querySA(atr.core.target, 'subtext')).innerText = data[dataKey][2];
         const sent_ago = $R_common_obj.$_return(
         data[dataKey][5],
         rdR.common.methods.gap,
         {method: rdR.common.params.gap.days}
         );
         listItem.querySelector(querySA(atr.core.target, 'end')).innerText = sent_ago[0];
         */

        // append the data.
        listItem.querySelectorAll(querySA(atr.core.target)).forEach((ele) => {
          ele.innerText = data[dataKey][ele.getAttribute(atr.core.target)];
        });

        menu_place.appendChild(listItem);

      }
      $R_common_obj.$_call(menu_place);
    }

    switch (type) {
      case rdR.menu.type.value:
        return _left_value(data, param, role, tag);

      case rdR.menu.type.stack:
        return _left_stack(data, param, role, tag);

      case rdR.menu.type.bar:
        return _left_bar(data, param, role, tag);

      case rdR.menu.type.button:
        return _left_button(data, param, role, tag);
    }
  }


  $_left(data, type, param = {}, role = rdR.menu.role.new, tag = rdR.menu.tags.menu) {
    return this.#_left(data, type, param, role, tag);
  }


  // generate the html Element.
  generateMenuValueElement(element) {
    // get the target menu-value element.
    console.log(element.querySelectorAll('menu-list'));
    const menuLists = element.querySelectorAll('menu-list');

    menuLists.forEach((menuList) => {

        const key = menuList.getAttribute(atr.menu.key);
        const event = menuList.getAttribute(atr.menu.event);
        const recall = menuList.hasAttribute(atr.menu.recall);

        const menuDiv = document.createElement('div');
        menuDiv.setAttribute('data-pb-key', key);
        menuDiv.classList.add('d-flex', 'flex-stack');

        const a = document.createElement('a');
        a.setAttribute('type', 'button');
        a.setAttribute('data-e-type', 'modal');
        a.setAttribute('data-e-value', event);
        a.setAttribute('data-e-nature', 'option');
        recall && a.setAttribute('data-e-recall', '');
        a.classList.add('fs-4', 'py-0', 'fw-semibold', 'text-gray-800', 'text-hover-primary');
        a.textContent = menuList.getAttribute(atr.menu.text);

        const icon = menuList.hasAttribute(atr.menu.tooltip);
        let i;
        if (icon) {
          i = document.createElement('i');
          i.classList.add('bi', 'bi-exclamation-circle', 'ms-2', 'fs-7', 'text-gray-600');
          i.setAttribute('data-bs-toggle', 'tooltip');
          i.setAttribute('data-bs-html', 'true');
          i.setAttribute('title', '<span class=\'fs-4\'>' + menuList.getAttribute(atr.menu.tooltip) + '</span>');
        }

        const divBadge = document.createElement('div');
        divBadge.setAttribute('data-pb-reserve', '');
        divBadge.classList.add('fs-4', 'badge', 'fw-normal');
        divBadge.textContent = '0';

        // a.appendChild(document.createTextNode(menuList.getAttribute(atr.menu.text)));
        icon && a.appendChild(i);
        menuDiv.appendChild(a);
        menuDiv.appendChild(divBadge);

        menuList.replaceWith(menuDiv);
      }
    );
  }
}

export default RenderMenu;
