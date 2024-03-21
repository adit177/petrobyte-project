const {
        app,
        BrowserWindow,
        ipcMain,
        shell
      } = require("electron");
// const { shell } = require("electron");
const fs = require("fs");

let downloadsWindow;

function createDownloadsWindow() {
  downloadsWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
    title         : "Download Items",
  });

  downloadsWindow.loadFile("pages/downloadWindow.html");

  // Open the DevTools for debugging (you can remove this in production)
  downloadsWindow.webContents.openDevTools()




  downloadsWindow.on("closed", () => {
    downloadsWindow = null;
  });
}

module.exports = {
  createDownloadsWindow,
  downloadsWindow
}
