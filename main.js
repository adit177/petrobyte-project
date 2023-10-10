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
let activeWindow = null;
const createTray = require('./render/tray');





// Rest of your main.js file


function setActiveWindow(window) {
  activeWindow = window;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width         : 800,
    height        : 600,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
  });
    // app.on('ready', () => {
    //     // Create your main window here (e.g., mainWindow = new BrowserWindow(...))
    //
    //     // Handle IPC message from renderer process
    //     ipcMain.on('open-main-window', () => {
    //         // Open the main window when the correct passcode is entered
    //         // You can use mainWindow.loadFile to load your main window HTML
    //         // Example:
    //         // mainWindow.loadFile(path.join(__dirname, 'main.html'));
    //         console.log("open main window");
    //         mainWindow.loadFile("index.html");
    //         createWindow();
    //     });
    // });
    if(isdev){
        mainWindow.webContents.openDevTools();
    }
  mainWindow.loadFile("index.html");
  setActiveWindow(mainWindow);

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
});
app.on('ready', () => {
    // Create the tray
    const tray = createTray();

    // Additional main application logic here
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


app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
})

module.exports = {
  mainWindow,

}
