import RenderTables from "../render/table.js";// table render class object
import RenderCommon from "../render/commons.js";
import RenderForms from "../render/forms.js";
import RenderMenu from "../render/menus.js";
import RenderPaging from "../render/paging.js";
import RenderModals from "../render/modals.js";


export const $R_table_obj = new RenderTables();

// common render class object
export const $R_common_obj = new RenderCommon();

// form render class object
export const $R_form_obj = new RenderForms();

// menu render class object
export const $R_menu_obj = new RenderMenu();

// page render class object
export const $R_paging_obj = new RenderPaging();

// modal
export const $R_modal_obj = new RenderModals();
