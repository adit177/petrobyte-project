const {
        app,
        BrowserWindow,
        clipboard,
        shell,
        ipcMain
      } = require("electron");
const fs = require("fs");
const {mainWindow} = require("../main");
// const {createLockWindow} =require("./lockWindow");
// const {createRegistrationWindow} =require("./registrationWindow");
const {createConfigWindow} = require("./configWindow");
const {createShortCutWindow} = require("../GlobalKeyManager/ShortCutKeyWindow");
// const {createSetLockWindow} =require("./setLockWindow");
const {createUnlockWindow} = require("./unLockWindow");
const {
        setLockWindow,
        createSetLockWindow
      } = require("./setLockWindow");
const {createDownloadsWindow} = require("./downloadWindow");
const {createReviewWindow} = require("./ReviewWindow");
let isLocked = true;
let pin = null;

function unlockApplication() {
  isLocked = false;
  mainWindow.show();
}


function setLock(pinValue) {
  pin = pinValue;
  createUnlockWindow();
}

 function goBack() {
     if (activeWindow !== mainWindow) {
         activeWindow.close();
         mainWindow.focus();
     } else{

         if (activeWindow && activeWindow.webContents.canGoBack()) {
             activeWindow.webContents.goBack();
         }
     }
 }
 function goForward() {
     if (activeWindow !== mainWindow) {
         //if you want go forward define it.
         activeWindow.close();
         mainWindow.focus();
     }
     else{

         if (activeWindow && activeWindow.webContents.canGoForward()) {
             activeWindow.webContents.goForward();
         }
     }
 }

 function loadHomePage() {
     if (activeWindow) {
         // Replace with your home URL
         activeWindow.loadURL('');
     }
 }
 function clearCache() {
     if (activeWindow) {
         const ses = activeWindow.webContents.session;
         ses.clearCache().then(() => {
             console.log('Cache cleared.');
         });
     }
 }


 function newHomePageTab() {
     let newWindow = new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
         },
     });

     newWindow.loadFile("index.html");  // Replace this with the path to your home page
     windows.push(newWindow);

     newWindow.on("closed", () => {
         const index = windows.indexOf(newWindow);
         if (index > -1) {
             windows.splice(index, 1);
         }
     });
 }

 function duplicateCurrentTab(window) {
     let newWindow = new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
         },
     });

     window.webContents.executeJavaScript('document.location.href').then((url) => {
         newWindow.loadURL(url);  // Load the current URL in the new window
         windows.push(newWindow);

         newWindow.on("closed", () => {
             const index = windows.indexOf(newWindow);
             if (index > -1) {
                 windows.splice(index, 1);
             }
         });
     });
 }


 function clearHistory() {
     if (activeWindow) {
         activeWindow.webContents.clearHistory();
         console.log('History cleared.');
     }
 }

function menuTemplate(mainWindow) {
  return [
    {
      label  : "Application",
      submenu: [
        {
          label: "Toggle Full Screen",
          click() {
            if (mainWindow.isFullScreen()) {
              mainWindow.setFullScreen(false);
            }
            else {
              mainWindow.setFullScreen(true);
            }
          },
        },
        {
          label: "Open Bookmark Page",
        },
        {
          label: "Open Download Folder",
          click() {
            createDownloadsWindow()
          }
        },
        {
          label  : "Theme",
          submenu: [
            {
              label  : 'Light Mode',
              type   : 'radio',
              checked: true,
              click() {
                mainWindow.webContents.send('change-theme', 'light');
              }
            },
            {
              label: 'Dark Mode',
              type : 'radio',
              click() {
                mainWindow.webContents.send('change-theme', 'dark');
              }
            },
            {
              label: "System Default",
            },
          ],
        },
        {
          label: "Lock Application",
          click: () => {
            if (!setLockWindow) {
              createSetLockWindow()
            }

          }
        },

        {
          label: 'Update Application',
          click: () => {

          },
        },
        {
          label: 'Configuration Page',
          click: () => {
            createConfigWindow()

          },
        },
        {type: 'separator'},
        {
          label      : 'Quit (exit the application)',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click      : () => {
            app.quit();
          },
        },
      ],
    },
    {
      label  : "History",
      submenu: [
        {
          label: "Go Back",
          click: () => {
            goBack();
          },
          class: 'btn btn-sm'
        },
        {
          label: "Go Forward",
          click: () => {
            goForward();
          }
        },
        {
          label: "Home Page",
          click: () => {
            loadHomePage();
          }
        },
        {
          type: 'separator'
        },
        {
          label: "Clear Caches",
          click: () => {
            clearCache();
          }
        },
        {
          label: "Clear History",
          click: () => {
            clearHistory();
          }
        },
      ],
    },
    {
      label  : "Window",
      submenu: [
        {
          label      : "Close",
          accelerator: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.close();
            }
          }
        },
        {
          type: 'separator',
        },
        {
          label: "Add or Remove Licences",
        },
        {
          label: "Sign In to another Licence",
        },
        {
          label: "Sign Out to this Licence",
        },
        {
          type: 'separator',
        },
        {
          label  : "Screen Size Setup",
          submenu: [
            {
              label: "480p",
              click: () => {
                mainWindow.setSize(854, 480);
              }
            },
            {
              label: "720p",
              click: () => {
                mainWindow.setSize(1280, 720);
              }
            },
            {
              label: "1080p",
              click: () => {
                mainWindow.setSize(1920, 1080);
              }
            },
            {
              label: "zoom-in",
              click: () => {
                const factor = mainWindow.webContents.getZoomFactor();
                mainWindow.webContents.setZoomFactor(factor + 0.1);
              }
            },
            {
              label: "zoom-out",
              click: () => {
                const factor = mainWindow.webContents.getZoomFactor();
                mainWindow.webContents.setZoomFactor(factor - 0.1);
              }
            },
            {
              label: "actual size",
              click: () => {
                mainWindow.webContents.setZoomFactor(1);
              }
            },


          ],
        },
      ]
    },
    {
      label  : "View",
      submenu: [
        {
          label      : "Find Text",
          accelerator: "CmdOrCtrl+F",
          click      : () => {
            mainWindow.webContents.send('show-find-box');
          }
        },
        {
          label: "Go to Page",
          // This would require an external library and an appropriate handler. Placeholder here.
          click: () => {
            console.log("Awesome search clicked");
          }
        },
        {
          label      : "Reload",
          accelerator: 'CmdOrCtrl+R',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label      : "Hard Reload",
          accelerator: 'CmdOrCtrl+Shift+R',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) focusedWindow.webContents.reloadIgnoringCache();
          }
        },
        {
          label: "New Tab (Home Page)",
          click: () => {
            newHomePageTab();
          },
        },
        {
          label: "Duplicate Tab (Current Page)",
          click: (menuItem, currentWindow) => {
            duplicateCurrentTab(currentWindow);
          },
        },
        {
          label: "Copy URL (current page)",
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              const currentURL = focusedWindow.webContents.getURL();
              clipboard.writeText(currentURL);
            }
          }
        }
      ],
    },


    {
      label  : "Edit",
      submenu: [
        {
          label      : "Cut",
          accelerator: "CmdOrCtrl+X",
          role       : 'cut'
        },
        {
          label      : "Copy",
          accelerator: "CmdOrCtrl+C",
          role       : 'copy'
        },
        {
          label      : "Paste",
          accelerator: "CmdOrCtrl+V",
          role       : 'paste'
        },
        {
          label      : "Select All",
          accelerator: "CmdOrCtrl+A",
          role       : 'selectAll'
        },
        {
          label      : "Find Text",
          accelerator: "CmdOrCtrl+F",
          click      : () => {
            mainWindow.webContents.send('show-find-box');
          }
        },
      ]
    },

    {
      label  : "Help",
      submenu: [
        {
          label: "Contact to Support",
        },
        {
          label  : "Follow PetroByte",
          submenu: [
            {
              label: "Twitter",
              click: async () => {
                await shell.openExternal('https://twitter.com/?lang=en');
              }
            },
            {
              label: "Instagram",
              click: async () => {
                await shell.openExternal('https://instagram.com');
              }
            },
            {
              label: "YouTube",
              click: async () => {
                await shell.openExternal('https://youtube.com');
              }
            },
          ]
        },
        {
          label: "About Version"
        },
        {
          label: "Manage Subscription"
        },
        {
          label: "Training Videos",
          click: async () => {
            await shell.openExternal('https://youtube.com');
          }

        },
        {
          label: "Report Issue or Bug"
        },
        {
          label: "Public Reviews",
          click: () => {
            createReviewWindow();
          }
        },

        {
          label: "Documentation"
        },
        {
          label: "Add-On Features"
        },
        {
          label: "View License Detail"
        },
        {
          label: "View ShortCut Keys",
          click: () => {
            createShortCutWindow();
          },
          class: 'asdf',
        }
      ],
    },
  ];
}

module.exports = {
  menuTemplate,
}