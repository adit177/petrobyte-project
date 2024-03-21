const HTML = {
  design  : {
    separate: '<div class="border-gray-500 border-top-dashed opacity-25 border-4 mt-5 mb-10"></div>',
  },
  menu    : {
    head: `<div data-kt-menu-trigger="click"
                class="menu-item menu-accordion">
            <span class="menu-link">
             <span class="menu-icon">
              <i class="fonticon-content-marketing fs-2"></i>
             </span>
             <span class="menu-title">Operations</span>
            </span>
            <div class="menu-sub menu-sub-accordion">
            {{group}}
            </div>
          </div>`,

    group: `<div data-kt-menu-trigger="click"
                class="menu-item menu-accordion">
              <span class="menu-link">
               <span class="menu-bullet">
                <span class="bullet me-5"></span>
               </span>
               <span class="menu-title">Charts</span>
               <span class="menu-arrow"></span>
              </span>
              <div class="menu-sub menu-sub-accordion">
                {{page}}
              </div>
             </div>`,

    page: `<div class="menu-item">
              <a data-e-path="dashboards/charts/stock"
                 class="menu-link">
               <span class="menu-bullet">
                <span class="bullet bullet-dot"></span>
               </span>
               <span class="menu-title">Stock Inventory</span>
              </a>
             </div>`,
  },
  table   : {
    header: {
      simple: (name) => `<th nowrap="" class="min-w-200px">${name}</th>`
    },
  },
  image   : {
    symbol_body : (insert, size = '50') => `<div class="symbol symbol-circle symbol-${size}px">${insert}</div>`,
    image_inside: (image, path = 'avatar') => `<img class="rc_image" data-cs-path="${path}" data-cs-value="${image}" alt="image"/>`,
    label_inside: (text, color = 'success', font = '2') => `<div class="symbol-label fs-${font} fw-semibold bg-${color} text-inverse-${color} rc_symbol">${text}</div>`,
    // full
    image: () => ``,
    label: () => ``,
  },
  template: {
    report_head: `<div class="d-block flex-center">
    <div class="flex-column text-center">
     <h3 class="mt-3">$$@title@$$</h3>
     <p class="mb-1">$$@sub_title@$$</p>
    </div>
    <div class="d-flex flex-stack">
     <div class="d-flex flex-column">
      <span class="mb-0">$$@left_key@$$</span>
      <span class="ms-1 fw-semibold text-end">$$@left_value@$$
      </span>
     </div>
     <div class="d-flex flex-column">
      <span class="mb-0">$$@right_key@$$</span>
      <span class="ms-1 fw-semibold">$$@right_value@$$</span>
     </div>
    </div>
   </div>`
  }
}

const dynamicHTML = (templateTag, data) => {
  let html = HTML.template[templateTag];
  Object.keys(data).forEach(key => {
    html = html.replace(`$$@${key}@$$`, data[key]);
  });
  return html;
}
// create a function that workks as react props for an HTML component
export const HTMLProps = (templateTag, data) => {
  return dynamicHTML(templateTag, data);
}

export default HTML;