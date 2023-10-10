const {
        BrowserWindow,
        ipcMain,
        ipcRenderer
      } = require('electron');
let unlockWindow;
let storedPin = null;
let isdev=process.env.NODE_ENV!=='development';
function createUnlockWindow() {
  unlockWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
  });
    if(isdev){unlockWindow.webContents.openDevTools();}
  // ipcMain.on('passcode-set', (event, data) => {
  //   // Access data like data.isSetpasscode and data.Pin here
  //   isLocked = data.isSetpasscode;
  //   pin = data.Pin;
  //   console.log('isSetpasscode:', data.isSetpasscode);
  //   console.log('Pin:', data.Pin);
  // });
  unlockWindow.loadFile('pages/unlockWindow.html');

  // ipcMain.on('get-stored-pin', (event) => {
  //   // Send the stored PIN to the unlock window
  //   event.sender.send('stored-pin', storedPin);
  // });

  unlockWindow.on('closed', () => {
    unlockWindow = null;
  });

  unlockWindow.on('closed', () => {
    // Handle window closed event as needed
  });
}

module.exports = {
  createUnlockWindow,
    unlockWindow,
};
