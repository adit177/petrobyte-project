// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');
//
// let otpDialog;
//
// function createOTPDialog() {
//     otpDialog = new BrowserWindow({
//         width: 400,
//         height: 200,
//         title: 'OTP Verification',
//         webPreferences: {
//             nodeIntegration: true,
//         },
//     });
//
//     otpDialog.loadFile('pages/otp-dialogbox.html');
//
//     otpDialog.on('closed', () => {
//         otpDialog = null;
//     });
// }
//
// // Handle the 'verify-otp' event from the OTP dialog
// // ipcMain.on('verify-otp', (event, otp) => {
// //     // Perform OTP verification logic here
// //     // For example, check if the OTP is valid
// //
// //     if (otp === '123456') {
// //         // Close the OTP dialog if the OTP is valid
// //         otpDialog.close();
// //
// //         // You can trigger further actions or open another window here
// //     } else {
// //         // Display an error message in the OTP dialog
// //         otpDialog.webContents.send('display-error', 'Invalid OTP. Please try again.');
// //     }
// // });
//
// app.on('ready', createOTPDialog);
//
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
// module.exports = {
//
//     createOTPDialog
// }