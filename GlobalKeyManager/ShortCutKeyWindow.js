const {BrowserWindow} = require("electron");
let ShortCutKeyWindow;

const {mainWindow} = require("../main");

function createShortCutWindow() {
  ShortCutKeyWindow = new BrowserWindow({
    width         : 500,
    height        : 600,
    modal         : true,
    parent        : mainWindow,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
    // closable: false ,
  });
  ShortCutKeyWindow.loadFile('pages/shortCutKey.html');
  // setActiveWindow(lockWindow);
}

module.exports = {
  createShortCutWindow,
}