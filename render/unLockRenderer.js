
const { ipcRenderer } = require('electron');
const {unlockWindow} = require("../windowManger/unLockWindow");
const axios = require('axios'); // Import axios
const {createOTPDialog}=require("../windowManger/otp-dailogboxWindow")
document.addEventListener('DOMContentLoaded', () => {
    const passcodeInput = document.getElementById('passcode');
    const unlockForm = document.querySelector('form');
    const errorMessageBox = document.getElementById('error-message');
    const resetButton = document.getElementById('reset');
    const quitButton = document.getElementById('quit-button');
    quitButton.addEventListener('click', () => {
        // Send a message to the main process to quit the application
        ipcRenderer.send('quit-app');
    });
    console.log("outer")
    unlockForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // console.log("asdaff");
        // Fetch the correct passcode from the API
        try {
            const response = await axios.get('http://localhost:4002/');
            const correctPasscode = response.data.passcode;

            // Get the entered passcode
            const enteredPasscode = passcodeInput.value;
            console.log(enteredPasscode)
            console.log(correctPasscode)
            // Check if the entered passcode is correct
            if (enteredPasscode === correctPasscode) {
                // Send a message to the main process to open the main window
                ipcRenderer.send('close-current-window');
                console.log('Correct passcode. Opening main window...')
                ipcRenderer.send('create-main-window');


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
//     console.log(resetButton)
//     resetButton.addEventListener('click', function () {
//         console.log(resetButton)
//         createOTPDialog();
//         // Rest of your code
//     });
});
