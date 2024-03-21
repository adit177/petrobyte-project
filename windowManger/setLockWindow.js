const {
        BrowserWindow,
        ipcMain, ipcRenderer
} = require('electron');
const {createUnlockWindow} = require("./unLockWindow");
const {activeWindow}=require("../main");
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
  console.log(activeWindow)
  if(isdev){  setLockWindow.webContents.openDevTools();}

  setLockWindow.loadFile('pages/setLockWindow.html');


  setLockWindow.on('closed', () => {
    setLockWindow = null;
  });
}

module.exports = {
  createSetLockWindow,
  setLockWindow,
  pin
};
