// const { ipcRenderer } = require('electron');
// // import {ipcRenderer} from "electron";
//
// console.log('setLockRenderer.js');
// let isSetpasscode = false;
// let Pin;
//
// document.addEventListener('DOMContentLoaded', function () {
//     const passcodeInput = document.getElementById('passcode');
//     const confirmPasscodeInput = document.getElementById('confirmPasscode');
//     const setPasscodeButton = document.querySelector('form button[type="submit"]');
//     const cancelSetupButton = document.getElementById('cancelSetup');
//
//     setPasscodeButton.addEventListener('click', function (event) {
//         event.preventDefault();
//
//         const passcode = passcodeInput.value;
//         const confirmPasscode = confirmPasscodeInput.value;
//         if (passcode === confirmPasscode) {
//             isSetpasscode = true;
//             Pin = passcode;
//             console.log('passcode is set');
//             ipcRenderer.send('close-setlock-window');
//         } else {
//             isSetpasscode = false;
//             Pin = passcode;
//             console.log('passcode is not set');
//         }
//
//         // Send data back to the main process (main.js) using IPC
//         require('electron').ipcRenderer.send('passcode-set', { isSetpasscode, Pin });
//
//         // Do something with the passcode and confirmPasscode values
//         console.log('Passcode:', passcode);
//         console.log('Confirm Passcode:', confirmPasscode);
//     });
//
//     cancelSetupButton.addEventListener('click', function () {
//         // Handle cancel setup button click
//         console.log('Cancel button clicked');
//     });
// });


// const { ipcRenderer } = require('electron');
// const axios = require('axios');
//
// console.log('setLockRenderer.js');
// let isSetpasscode = false;
// let Pin;
//
// document.addEventListener('DOMContentLoaded', function () {
//     const passcodeInput = document.getElementById('passcode');
//     const confirmPasscodeInput = document.getElementById('confirmPasscode');
//     const setPasscodeButton = document.querySelector('form button[type="submit"]');
//     const cancelSetupButton = document.getElementById('cancelSetup');
//
//     setPasscodeButton.addEventListener('click', async function (event) {
//         event.preventDefault();
//
//         const passcode = passcodeInput.value;
//         const confirmPasscode = confirmPasscodeInput.value;
//
//         if (passcode === confirmPasscode) {
//             isSetpasscode = true;
//             Pin = passcode;
//             console.log('passcode is set');
//             ipcRenderer.send('close-setlock-window');
//         } else {
//             isSetpasscode = false;
//             Pin = passcode;
//             console.log('passcode is not set');
//         }
//
//         // Send data back to the main process (main.js) using IPC
//         ipcRenderer.send('passcode-set', { isSetpasscode, Pin });
//
//         // Post the passcode to the server using axios
//         try {
//             const response = await axios.post('http://localhost:4002/', {
//                 passcode: Pin,
//             });
//
//             console.log('Passcode posted to the server:', response.data);
//         } catch (error) {
//             console.error('Error posting passcode:', error);
//         }
//
//         // Do something with the passcode and confirmPasscode values
//         console.log('Passcode:', passcode);
//         console.log('Confirm Passcode:', confirmPasscode);
//     });
//
//     cancelSetupButton.addEventListener('click', function () {
//         // Handle cancel setup button click
//         console.log('Cancel button clicked');
//     });
// });


const { ipcRenderer } = require('electron');
const axios = require('axios');

console.log('setLockRenderer.js');
let isSetpasscode = false;
let Pin;

document.addEventListener('DOMContentLoaded', function () {
    const passcodeInput = document.getElementById('passcode');
    const confirmPasscodeInput = document.getElementById('confirmPasscode');
    const setPasscodeButton = document.querySelector('form button[type="submit"]');
    const cancelSetupButton = document.getElementById('cancelSetup');

    setPasscodeButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const passcode = passcodeInput.value;
        const confirmPasscode = confirmPasscodeInput.value;

        if (passcode === confirmPasscode) {
            isSetpasscode = true;
            Pin = passcode;
            console.log('passcode is set');


            // Send the new passcode to the server
            try {
                const response = await axios.post('http://localhost:4002/', {
                    passcode: Pin,
                });

                // Handle the server's response if needed
                console.log('Passcode updated on the server:', response.data);
            } catch (error) {
                console.error('Error updating passcode:', error);
            }
            ipcRenderer.send('close-setlock-window');
        } else {
            isSetpasscode = false;
            Pin = passcode;
            console.log('passcode is not set');
        }

        // Send data back to the main process (main.js) using IPC
        ipcRenderer.send('passcode-set', { isSetpasscode, Pin });

        // Do something with the passcode and confirmPasscode values
        console.log('Passcode:', passcode);
        console.log('Confirm Passcode:', confirmPasscode);
    });

    cancelSetupButton.addEventListener('click', function () {
        // Handle cancel setup button click
        console.log('Cancel button clicked');
    });
});
