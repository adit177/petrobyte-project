const {
        BrowserWindow,
        ipcMain
      } = require('electron');
const {createUnlockWindow} = require("./unLockWindow");
// const {isSetpasscode,
//   Pin}=require("../render/setLockRenderer");
const isdev=process.env.NODE_ENV!=='development';
let setLockWindow = null;
let pin;
let isLocked = true;
const {mainWindow} = require("../main");

function createSetLockWindow() {
  setLockWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
  });
  if(isdev){  setLockWindow.webContents.openDevTools();}
  // if (1) {
  //   // If locked, ask for the PIN
  //   console.log("set")
  //   createUnlockWindow();
  // }
  // else {
  //   // If unlocked, lock the app
  //   console.log(unset);
  //   isLocked = true;
  //   mainWindow.hide();
  // }
  setLockWindow.loadFile('pages/setLockWindow.html');

  // ipcMain.on('passcode-set', (event, data) => {
  //   // Access data like data.isSetpasscode and data.Pin here
  //   console.log('isSetpasscode:', data.isSetpasscode);
  //   console.log('Pin:', data.Pin);
  // });

  // ...

  setLockWindow.on('closed', () => {
    setLockWindow = null;
  });
}

module.exports = {
  createSetLockWindow,
  setLockWindow,
  pin
};
