const {
        app,
        BrowserWindow,
        ipcMain,
        shell
      } = require("electron");
// const { shell } = require("electron");
const fs = require("fs");

let bookmarkWindow;

function createBookmarkWindow() {
    if(bookmarkWindow) {
        bookmarkWindow.reload();
        bookmarkWindow.focus();
        return;
    }
  bookmarkWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
    title         : "Download Items",
  });

  bookmarkWindow.loadFile("pages/bookmarkWindow.html");

  // Open the DevTools for debugging (you can remove this in production)
  bookmarkWindow.webContents.openDevTools()
  bookmarkWindow.on("closed", () => {
    bookmarkWindow = null;
  });
}

module.exports = {
  createBookmarkWindow,
  bookmarkWindow
}
