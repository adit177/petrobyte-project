import {atr} from "../base/attributes.js";

class RenderModals {
  constructor() {
  }

  customModal;
  #modalDiv;

  getModal() {
    return this.#modalDiv;
  }

  #buildModal(element) {
    const modalHeader = element.querySelector('modal-header');
    const modalBody = element.querySelector('modal-body');
    const modalFooter = element.querySelector('modal-footer');

    const full = element.hasAttribute(atr.modal.full);
    const scroll = element.hasAttribute(atr.modal.scroll);
    const backdrop = element.hasAttribute(atr.modal.backdrop);
    const keyboard = element.hasAttribute(atr.modal.keyboard);
    const centered = element.hasAttribute(atr.modal.centered);

    // Create modal elements
    this.#modalDiv = document.createElement('div');
    this.#modalDiv.classList.add('modal', 'fade');
    full && this.#modalDiv.classList.add('bg-white');
    this.#modalDiv.tabIndex = -1;
    this.#modalDiv.role = 'dialog';
    backdrop && this.#modalDiv.setAttribute('data-bs-backdrop', 'static');
    keyboard && this.#modalDiv.setAttribute('data-bs-keyboard', 'false');

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.role = 'document';
    full && modalDialog.classList.add('modal-fullscreen');
    scroll && modalDialog.classList.add('modal-dialog-scrollable');
    centered && modalDialog.classList.add('modal-dialog-centered');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    full && modalContent.classList.add('shadow-none');

    const headerTitle = modalHeader ? modalHeader.getAttribute(atr.modal.title) : 'default_title';
    const headerClose = modalHeader && modalHeader.hasAttribute(atr.modal.close);

    const modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.classList.add('modal-header');
    modalHeaderDiv.innerHTML = '<div class="modal-title"><h3>' + headerTitle + '</h3><span></span></div>';

    if (headerClose) {
      modalHeaderDiv.innerHTML += '<button type="button" data-e-nature="ignore" class="btn btn-icon btn-light-secondary" data-bs-dismiss="modal" aria-label="Close">' +
        '<i class="bi bi-x-lg fs-2 text-dark"></i></button>';
    }

    const modalBodyDiv = document.createElement('div');
    modalBodyDiv.classList.add('modal-body');
    modalBodyDiv.innerHTML = modalBody ? modalBody.innerHTML : 'no body found';

    const modalFooterDiv = document.createElement('div');
    modalFooterDiv.classList.add('modal-footer');
    modalFooterDiv.innerHTML = modalFooter && modalFooter.getAttribute(atr.modal.dismiss) ? modalFooter.innerHTML : '<button type="button" data-e-nature="ignore" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';

    // Assemble modal structure
    modalContent.appendChild(modalHeaderDiv);
    modalContent.appendChild(modalBodyDiv);
    modalContent.appendChild(modalFooterDiv);

    modalDialog.appendChild(modalContent);
    this.#modalDiv.appendChild(modalDialog);

  }

  generateBootstrapModal(element) {
    // Get custom modal elements
    this.customModal = element.querySelectorAll('modal');

    this.customModal.forEach((modal) => {
        // check the load status
        if (modal.hasAttribute(atr.load.modal) && modal.getAttribute(atr.load.modal) === '1') {
          return false;
        }
        // build the modal
        this.#buildModal(modal);
        // update the status
        modal.setAttribute(atr.load.modal, '1');
        // append the modal to the body
        modal.replaceWith(this.#modalDiv);
      }
    );
    return true;
  }
}

export default RenderModals;