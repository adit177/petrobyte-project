const {BrowserWindow} = require("electron");

let configWindow;
let isdev=process.env.NODE_ENV!=='development';
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
if(isdev){configWindow.webContents.openDevTools();}
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