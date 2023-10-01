const {BrowserWindow} = require("electron");

let configWindow;

function createConfigWindow() {
  if (configWindow) {
    configWindow.focus();
    return;
  }

  configWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false
    }
  });

  configWindow.loadFile('pages/config.html');
  // configWindow.webContents.openDevTools();
  // setActiveWindow(configWindow);

  configWindow.on('closed', () => {
    configWindow = null;
  });
}

module.exports = {
  createConfigWindow,
  configWindow
}