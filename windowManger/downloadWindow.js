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
  // downloadsWindow.webContents.openDevTools()

  // Listen for IPC messages from the renderer process
  ipcMain.on("open-download-directory", () => {
    // Replace "downloadFolderPath" with the actual path to your download folder
    const downloadFolderPath = "/path/to/your/download/folder";

    // Open the download folder using the default file manager
    shell.openPath(downloadFolderPath);
  });


  downloadsWindow.on("closed", () => {
    downloadsWindow = null;
  });
}

module.exports = {
  createDownloadsWindow,
  downloadsWindow
}
