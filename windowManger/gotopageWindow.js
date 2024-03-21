const {
        app,
        BrowserWindow,
        ipcMain,
        shell
      } = require("electron");
// const { shell } = require("electron");
const fs = require("fs");

let gotopageWindow;

function creategotopageWindow() {
    if(gotopageWindow) {
        gotopageWindow.reload();
        gotopageWindow.focus();
        return;
    }
  gotopageWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
    title         : "Download Items",
  });

  gotopageWindow.loadFile("pages/go-topage.html");

  // Open the DevTools for debugging (you can remove this in production)
  gotopageWindow.webContents.openDevTools()
  gotopageWindow.on("closed", () => {
    gotopageWindow = null;
  });
}

module.exports = {
  creategotopageWindow,
  gotopageWindow
}
