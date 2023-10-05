// script.js

function createPerson(name) {
    // Create elements
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = name;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const openButton = document.createElement('button');
    openButton.textContent = 'Open';
    openButton.addEventListener('click', openFunction);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeFunction);

    // Append elements
    buttonsDiv.appendChild(openButton);
    buttonsDiv.appendChild(removeButton);

    personDiv.appendChild(nameDiv);
    personDiv.appendChild(buttonsDiv);

    return personDiv;
}

function openFunction() {
    alert('Open button clicked');
}

function removeFunction() {
    alert('Remove button clicked');
}

function licenseCodeFunction() {
    alert('License Code button clicked');
}

function mobileFunction() {
    alert('Mobile button clicked');
}

function continueFunction() {
    alert('Continue button clicked');
}

function registerLicenseFunction() {
    alert('Register License button clicked');
}

// Usage
const mainContainer = document.querySelector('.main-container');
const johnDoeDiv = createPerson('John Doe');
const janeDoeDiv = createPerson('Jane Doe');

mainContainer.appendChild(johnDoeDiv);
mainContainer.appendChild(janeDoeDiv);
