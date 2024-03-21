const {
        app,
        BrowserWindow,
        Menu,
        shell,
        ipcMain,
        dialog,
        clipboard,
        globalShortcut
      } = require("electron");
const path = require("path");
const fs = require('fs');
let windows = []
let mainWindow;
let configWindow;
let storedPin
let isLocked = true;
let downloadHistory = [];
const isdev=process.env.NODE_ENV!=='development';
// const {createLockWindow} =require("./windowManger/lockWindow");
const {menuTemplate} = require("./windowManger/menuBuilder");
const {createSetLockWindow} = require("./windowManger/setLockWindow");
const {
        unlockWindow,
        createUnlockWindow
      } = require("./windowManger/unLockWindow");
const {setLockWindow} = require("./windowManger/setLockWindow");
const {downloadsWindow} = require("./windowManger/downloadWindow");
const{bookmarksWindow} = require("./windowManger/bookmarkWindow");
let activeWindow = mainWindow;
const createTray = require('./render/tray');


const { initialize } = require('@electron/remote/main');

initialize();

function setActiveWindow(awindow) {
    activeWindow = awindow;
    // console.log(activeWindow);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
        preload: path.join(__dirname, 'preload.js')
    },
  });



    if(isdev){
        mainWindow.webContents.openDevTools();
    }
  mainWindow.loadFile("index.html");
  setActiveWindow(mainWindow);
  console.log(activeWindow.title);

  //mainWindow.webContents.openDevTools();


  const menuTemplates = menuTemplate(mainWindow);
  const menu = Menu.buildFromTemplate(menuTemplates);
  Menu.setApplicationMenu(menu);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

}

ipcMain.on('set-download-folder', (event, path) => {
  // Show dialog to select download folder and then set it.
  dialog.showOpenDialog({properties: ['openDirectory']}).then(result => {
    if (!result.canceled) {
      // Save the selected directory path for downloads.
    }
  });
});
ipcMain.on('open-directory-dialog', (event) => {
  dialog.showOpenDialog({properties: ['openDirectory']}).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      // Send back the selected directory path to renderer process.
      event.sender.send('directory-selected', result.filePaths[0]);
    }
  });
});

ipcMain.on('set-theme', (event, theme) => {
  // Apply the selected theme to application windows.
});

// Listen for IPC messages from the "Downloads" window
ipcMain.on("clear-all-downloads", () => {
  // Clear the download history
  downloadHistory = [];
  // Send a message to the "Downloads" window to clear all download items
  downloadsWindow.webContents.send("clear-all-downloads");
});

// Implement logic to handle downloads (e.g., track download progress and update the "Downloads" window)
// ...

// Example: When a download completes, add it to the download history and update the "Downloads" window
const completedDownload = {
  filename: "ExampleFile.txt",
  status  : "Completed",
};
// Check if downloadsWindow exists before using its webContents
if (downloadsWindow && downloadsWindow.webContents) {
  downloadHistory.push(completedDownload);
  downloadsWindow.webContents.send("add-download-item", completedDownload.filename, completedDownload.status);
}
// Listen for IPC messages from the "Downloads" window
ipcMain.on("open-download-directory", () => {
  // Replace "downloadFolderPath" with the actual path to your download folder
  const downloadFolderPath = "/path/to/your/download/folder";

  // Open the download folder using the default file manager
  shell.openPath(downloadFolderPath);
});
app.on('ready', () => {
  createWindow();
    const tray = createTray();

});

ipcMain.on('close-current-window', () => {
    // Close the current window
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
        currentWindow.close();
    }
});
ipcMain.on('close-setlock-window', () => {
    // Close the "Set Passcode" window
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
        currentWindow.close();
    }
});
ipcMain.on('open-main-window', () => {
    // Open the main window when the correct passcode is entered
    mainWindow.show();
});
ipcMain.on('create-main-window', () => {
    // console.log("asdasd")
    createWindow();
});
ipcMain.on('quit-app', () => {
    // Close all windows (including the main window)
    BrowserWindow.getAllWindows().forEach((window) => {
        window.close();
    });

    // Quit the application
    app.quit();
});
// Function to save a bookmark to a local JSON file
//
ipcMain.on('get-user-data-path', (event) => {
    event.returnValue = app.getPath('userData');
});

// IPC Listeners




app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        // Do not quit the application.
        // If you want to allow macOS windows to behave like other platforms, remove this check.
    }
});





app.on("activate", function () {
  if (mainWindow === null) createWindow();
})

module.exports = {
  mainWindow,
    activeWindow

}
