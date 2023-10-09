const {
        BrowserWindow,
        ipcMain
      } = require('electron');
const {createUnlockWindow} = require("./unLockWindow");

let setLockWindow = null;
let storedPin;
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
  if (isLocked) {
    // If locked, ask for the PIN
    createUnlockWindow();
  }
  else {
    // If unlocked, lock the app
    isLocked = true;
    mainWindow.hide();
  }
  setLockWindow.loadFile('pages/setLockWindow.html');

  ipcMain.on('set-pin', (event, pin) => {
    // Store the PIN securely (e.g., encrypt it)
    storedPin = pin;
    setLockWindow.close();
  });

  // ...

  setLockWindow.on('closed', () => {
    setLockWindow = null;
  });
}

module.exports = {
  createSetLockWindow,
  setLockWindow,
};
