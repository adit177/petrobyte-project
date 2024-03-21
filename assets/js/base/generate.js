class Generate {

  constructor() {
    // none.
  }

  #create_card_buttons(title, icon, buttons) {

    // collect the
    const cardButtonDiv = document.createElement('div');
    cardButtonDiv.classList.add('card', 'card-flush', 'mb-6', 'hover-elevate-up');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body', 'p-0');

    const cardPxDiv = document.createElement('div');
    cardPxDiv.classList.add('card-px', 'text-center', 'py-10', 'my-0');

    const iconElement = document.createElement('i');
    iconElement.classList.add(...icon.split(' '));
    iconElement.classList.add('fs-1', 'fs-4x', 'text-primary');

    const headingElement = document.createElement('h2');
    headingElement.classList.add('fs-1', 'fw-bold', 'text-primary', 'mb-10', 'mt-5');
    headingElement.textContent = title;

    cardPxDiv.appendChild(iconElement);
    cardPxDiv.appendChild(headingElement);

    for (var i = 0; i < buttons.length; i++) {
      var buttonData = buttons[i];
      var buttonElement = document.createElement('button');
      buttonElement.setAttribute('type', 'button');
      buttonElement.value = buttonData.value;
      buttonElement.name = buttonData.name;
      // icon
      if (buttonData.icon !== '') {
        const btnIconElement = document.createElement('i');
        btnIconElement.classList.add(...buttonData.icon.split(' '));
        btnIconElement.classList.add('fs-2');
        buttonElement.appendChild(btnIconElement);
      }
      // recall
      buttonData.recall && buttonElement.setAttribute('data-e-recall', 'true');
      buttonElement.classList.add('btn', 'btn-light-primary', 'mx-2');
      const buttonTextContent = document.createElement('span');
      buttonTextContent.textContent = buttonData.text;
      buttonElement.appendChild(buttonTextContent);
      cardPxDiv.appendChild(buttonElement);
    }

    cardBodyDiv.appendChild(cardPxDiv);
    cardButtonDiv.appendChild(cardBodyDiv);

    return cardButtonDiv;
  }

  card_buttons__L_buttons(element) {

    const __generate_card_button = (template) => {
      // Step 2: Extract attributes and content from the template
      const title = template.getAttribute('data-card-title');
      const icon = template.getAttribute('data-card-icon');

      let buttonsData = [];
      let buttons = template.querySelectorAll('btn');
      buttons.forEach(function (button) {
        const value = button.getAttribute('data-btn-value');
        const name = button.getAttribute('data-btn-name');
        const buttonIcon = button.getAttribute('data-btn-icon');
        const recall = button.hasAttribute('data-btn-recall');
        const text = button.textContent.trim();
        buttonsData.push({
          value : value,
          name  : name,
          icon  : buttonIcon,
          recall: recall,
          text  : text
        });
      });

      // Step 3: Create the target HTML element
      const cardButtonDiv = this.#create_card_buttons(title, icon, buttonsData);

      // Replace the template with the generated element
      template.replaceWith(cardButtonDiv);
    }
    // Step 1: Select the template
    const buttons = element.querySelectorAll('card-button');
    if (buttons.length !== 0) {
      buttons.forEach(__generate_card_button);
    }
  }

}


export default Generate;