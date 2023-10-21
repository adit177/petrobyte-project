// const { ipcRenderer } = require('electron');
//
// document.addEventListener('DOMContentLoaded', function () {
//     const otpInput = document.getElementById('otp-input');
//     const verifyButton = document.getElementById('verify-button');
//
//     verifyButton.addEventListener('click', function () {
//         const otp = otpInput.value;
//
//         // Send the OTP to the main process for verification
//         ipcRenderer.send('verify-otp', otp);
//     });
// });
