console.log('setLockRenderer.js');
let isSetpasscode = false;
let Pin;

document.addEventListener('DOMContentLoaded', function () {
    const passcodeInput = document.getElementById('passcode');
    const confirmPasscodeInput = document.getElementById('confirmPasscode');
    const setPasscodeButton = document.querySelector('form button[type="submit"]');
    const cancelSetupButton = document.getElementById('cancelSetup');

    setPasscodeButton.addEventListener('click', function (event) {
        event.preventDefault();

        const passcode = passcodeInput.value;
        const confirmPasscode = confirmPasscodeInput.value;
        if (passcode === confirmPasscode) {
            isSetpasscode = true;
            Pin = passcode;
            console.log('passcode is set');
        } else {
            isSetpasscode = false;
            Pin = passcode;
            console.log('passcode is not set');
        }

        // Send data back to the main process (main.js) using IPC
        require('electron').ipcRenderer.send('passcode-set', { isSetpasscode, Pin });

        // Do something with the passcode and confirmPasscode values
        console.log('Passcode:', passcode);
        console.log('Confirm Passcode:', confirmPasscode);
    });

    cancelSetupButton.addEventListener('click', function () {
        // Handle cancel setup button click
        console.log('Cancel button clicked');
    });
});
