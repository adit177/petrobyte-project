
const { ipcRenderer } = require('electron');
const {unlockWindow} = require("../windowManger/unLockWindow");
const axios = require('axios'); // Import axios

document.addEventListener('DOMContentLoaded', () => {
    const passcodeInput = document.getElementById('passcode');
    const unlockForm = document.querySelector('form');
    const errorMessageBox = document.getElementById('error-message');

    unlockForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Fetch the correct passcode from the API
        try {
            const response = await axios.get('http://localhost:4002/');
            const correctPasscode = response.data.passcode;

            // Get the entered passcode
            const enteredPasscode = passcodeInput.value;

            // Check if the entered passcode is correct
            if (enteredPasscode === correctPasscode) {
                // Send a message to the main process to open the main window
                ipcRenderer.send('close-current-window');
                console.log('Correct passcode. Opening main window...')
                ipcRenderer.send('open-main-window');


            } else {
                // Display an error message
                console.log('Wrong passcode. Please try again.');
                errorMessageBox.textContent = 'Wrong passcode. Please try again.';
            }
        } catch (error) {
            // Handle any errors that occur during the API request
            console.error('Error fetching passcode:', error);
        }
    });
});
