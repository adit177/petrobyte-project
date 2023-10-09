const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const passcodeInput = document.getElementById('passcode');
    const unlockForm = document.querySelector('form');
    const errorMessageBox = document.getElementById('error-message');

    unlockForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the entered passcode
        const enteredPasscode = passcodeInput.value;
        const correctPasscode = 'asdf'; // Replace with your actual correct passcode

        // Check if the entered passcode is correct
        if (enteredPasscode === correctPasscode) {
            // Send a message to the main process to open the main window
            console.log('Correct passcode. Opening main window...');
            ipcRenderer.send('open-main-window');
        } else {
            // Display an error message
            console.log('Wrong passcode. Please try again.');
            // errorMessageBox.textContent = 'Wrong passcode. Please try again.';
        }
    });
});
