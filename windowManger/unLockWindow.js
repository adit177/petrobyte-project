const {
        BrowserWindow,
        ipcMain,
        ipcRenderer
      } = require('electron');
let unlockWindow;
let storedPin = null;

function createUnlockWindow() {
  unlockWindow = new BrowserWindow({
    width         : 400,
    height        : 200,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
  });

  unlockWindow.loadFile('unlockWindow.html');

  ipcMain.on('get-stored-pin', (event) => {
    // Send the stored PIN to the unlock window
    event.sender.send('stored-pin', storedPin);
  });

  unlockWindow.on('closed', () => {
    unlockWindow = null;
  });

  unlockWindow.on('closed', () => {
    // Handle window closed event as needed
  });
}

module.exports = {
  createUnlockWindow,
};
